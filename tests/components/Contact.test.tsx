import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Contact from '@/pages/Contact';
import { apiRequest } from '@/lib/queryClient';
import { analytics } from '@/lib/analytics';
import { PRIVACY_NOTICE_VERSION } from '@shared/privacy';

const { toast } = vi.hoisted(() => ({ toast: vi.fn() }));
const scrollIntoViewDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollIntoView');

vi.mock('@/components/SEO', () => ({ default: () => null }));
vi.mock('@/hooks/use-toast', () => ({ useToast: () => ({ toast }) }));
vi.mock('@/lib/queryClient', () => ({ apiRequest: vi.fn() }));
vi.mock('@/lib/analytics', () => ({
  analytics: { trackServiceInterest: vi.fn(), trackContactFormSubmit: vi.fn() },
}));

function renderContact(search = '') {
  window.history.replaceState(null, '', `/contact${search}`);
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return render(<QueryClientProvider client={queryClient}><Contact /></QueryClientProvider>);
}

function fillBrief(consent = true) {
  fireEvent.change(screen.getByLabelText('First name *'), { target: { value: 'Asha' } });
  fireEvent.change(screen.getByLabelText('Last name *'), { target: { value: 'Rao' } });
  fireEvent.change(screen.getByLabelText('Work email *'), { target: { value: 'asha@example.invalid' } });
  fireEvent.change(screen.getByLabelText('Company'), { target: { value: 'Example GCC' } });
  fireEvent.change(screen.getByLabelText('Tell us about your hiring needs *'), {
    target: { value: 'We need help hiring two senior platform engineers in Bengaluru.' },
  });
  if (consent) fireEvent.click(screen.getByRole('checkbox', { name: 'Consent to use inquiry information' }));
}

function submitBrief() {
  fireEvent.click(screen.getByRole('button', { name: 'Send Brief' }));
}

async function selectService(name: string) {
  fireEvent.keyDown(screen.getByRole('combobox', { name: 'Service of interest' }), { key: 'ArrowDown' });
  fireEvent.click(await screen.findByRole('option', { name }));
}

describe('Contact enquiry journey', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(apiRequest).mockResolvedValue({
      json: async () => ({ success: true, message: 'Your inquiry has been received.' }),
    } as Response);
    // Keep real Radix controls; supply only browser layout APIs absent in jsdom.
    vi.stubGlobal('ResizeObserver', class {
      observe() {}
      unobserve() {}
      disconnect() {}
    });
    Object.defineProperty(Element.prototype, 'scrollIntoView', { configurable: true, value: vi.fn() });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    if (scrollIntoViewDescriptor) Object.defineProperty(Element.prototype, 'scrollIntoView', scrollIntoViewDescriptor);
    else Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
  });

  // The first real Radix form mount can exceed 5s under parallel full-suite load.
  // Bound the overall interaction case without extending assertion wait deadlines.
  it.each([
    ['Sales%20Staffing', 'Permanent Hiring', 'permanent-hiring'],
    ['Technology%20Talent%20Solutions', 'Technology Talent Solutions', 'it-staffing'],
    ['contract-staffing', 'Contract Staffing & Staff Augmentation', 'contract-staffing'],
    ['Hire%20Talent', 'Other', 'other'],
  ])('shows and submits a supported selection from %s', async (input, label, slug) => {
    renderContact(`?service=${input}&utm_source=linkedin&utm_medium=social&utm_campaign=india-launch`);
    await waitFor(() => expect(screen.getByRole('combobox', { name: 'Service of interest' })).toHaveTextContent(label));
    fillBrief();
    submitBrief();

    await waitFor(() => expect(apiRequest).toHaveBeenCalledWith('POST', '/api/contact', expect.objectContaining({
      service: slug,
      email: 'asha@example.invalid',
      consentGiven: true,
      privacyNoticeVersion: PRIVACY_NOTICE_VERSION,
      utmSource: 'linkedin',
      utmMedium: 'social',
      utmCampaign: 'india-launch',
      landingPage: '/contact',
    })));
    expect(await screen.findByRole('heading', { name: 'Brief received!' })).toBeInTheDocument();
    expect(analytics.trackContactFormSubmit).toHaveBeenCalledWith({ service: slug, source: 'website' });
  }, 10_000);

  it('keeps unknown services out of the selection, submission and service analytics', async () => {
    renderContact('?service=Engineering%20Pods');
    expect(screen.getByRole('combobox', { name: 'Service of interest' })).toHaveTextContent('Select a service');
    fillBrief();
    submitBrief();
    await waitFor(() => expect(apiRequest).toHaveBeenCalledWith('POST', '/api/contact', expect.objectContaining({ service: '' })));
    expect(analytics.trackServiceInterest).not.toHaveBeenCalled();
  });

  it('follows query-only navigation for untouched fields and retains campaign attribution', async () => {
    renderContact('?service=it-staffing&utm_source=linkedin');
    act(() => window.history.pushState(null, '', '/contact?service=Executive%20Search&email=updated%40example.invalid'));
    await waitFor(() => expect(screen.getByRole('combobox', { name: 'Service of interest' })).toHaveTextContent('Executive Search'));
    expect(screen.getByLabelText('Work email *')).toHaveValue('updated@example.invalid');
    fillBrief();
    submitBrief();
    await waitFor(() => expect(apiRequest).toHaveBeenCalledWith('POST', '/api/contact', expect.objectContaining({
      service: 'executive-search', utmSource: 'linkedin',
    })));
  });

  it('clears an untouched service when navigation no longer names a supported offer', async () => {
    renderContact('?service=it-staffing');
    act(() => window.history.pushState(null, '', '/contact?service=Unknown'));
    await waitFor(() => expect(screen.getByRole('combobox', { name: 'Service of interest' })).toHaveTextContent('Select a service'));
  });

  it('preserves manually edited service, email and brief on query-only navigation', async () => {
    renderContact('?service=it-staffing&email=original%40example.invalid');
    fillBrief();
    await selectService('Permanent Hiring');
    act(() => window.history.pushState(null, '', '/contact?service=executive-search&email=replaced%40example.invalid'));
    await waitFor(() => expect(screen.getByRole('combobox', { name: 'Service of interest' })).toHaveTextContent('Permanent Hiring'));
    expect(screen.getByLabelText('Work email *')).toHaveValue('asha@example.invalid');
    expect(screen.getByLabelText('Tell us about your hiring needs *')).toHaveValue('We need help hiring two senior platform engineers in Bengaluru.');
    submitBrief();
    await waitFor(() => expect(apiRequest).toHaveBeenCalledWith('POST', '/api/contact', expect.objectContaining({
      service: 'permanent-hiring', email: 'asha@example.invalid',
    })));
  });

  it('preserves a deliberately cleared prefilled email on query-only navigation', async () => {
    renderContact('?service=it-staffing&email=wrong%40example.invalid');
    expect(screen.getByLabelText('Work email *')).toHaveValue('wrong@example.invalid');
    fireEvent.change(screen.getByLabelText('Work email *'), { target: { value: '' } });
    act(() => window.history.pushState(null, '', '/contact?service=executive-search&email=wrong%40example.invalid'));
    await waitFor(() => expect(screen.getByRole('combobox', { name: 'Service of interest' })).toHaveTextContent('Executive Search'));
    expect(screen.getByLabelText('Work email *')).toHaveValue('');
    submitBrief();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(apiRequest).not.toHaveBeenCalled();
  });

  it.each([
    ['utm_source=google&utm_medium=cpc', 'google', 'cpc'],
    ['utm_source=', '', ''],
  ])('replaces the complete campaign bundle when navigating with %s', async (campaign, source, medium) => {
    renderContact('?service=it-staffing&utm_source=linkedin&utm_medium=social&utm_campaign=india-launch&utm_term=GCC&utm_content=hero');
    act(() => window.history.pushState(null, '', `/contact?service=executive-search&${campaign}`));
    fillBrief();
    submitBrief();
    await waitFor(() => expect(apiRequest).toHaveBeenCalledWith('POST', '/api/contact', expect.objectContaining({
      service: 'executive-search',
      utmSource: source,
      utmMedium: medium,
      utmCampaign: '',
      utmTerm: '',
      utmContent: '',
    })));
  });

  it('requires explicit consent before any submission', async () => {
    renderContact('?service=it-staffing');
    fillBrief(false);
    submitBrief();
    expect(await screen.findByText('Consent is required to submit your hiring brief')).toBeInTheDocument();
    expect(apiRequest).not.toHaveBeenCalled();
  });

  it('keeps the brief and selection available after a failed request', async () => {
    vi.mocked(apiRequest).mockRejectedValueOnce(new Error('The enquiry could not be received. Please retry.'));
    renderContact('?service=Sales%20Staffing');
    fillBrief();
    submitBrief();
    await waitFor(() => expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      variant: 'destructive', description: 'The enquiry could not be received. Please retry.',
    })));
    expect(screen.queryByRole('heading', { name: 'Brief received!' })).not.toBeInTheDocument();
    expect(screen.getByLabelText('First name *')).toHaveValue('Asha');
    expect(screen.getByRole('combobox', { name: 'Service of interest' })).toHaveTextContent('Permanent Hiring');
    expect(analytics.trackContactFormSubmit).not.toHaveBeenCalled();
    submitBrief();
    expect(await screen.findByRole('heading', { name: 'Brief received!' })).toBeInTheDocument();
    expect(apiRequest).toHaveBeenCalledTimes(2);
  });

  it('starts a fresh enquiry after success with service and attribution retained and consent cleared', async () => {
    renderContact('?service=it-staffing&utm_source=linkedin&utm_campaign=india-launch');
    act(() => window.history.pushState(null, '', '/contact?service=executive-search'));
    fillBrief();
    submitBrief();
    fireEvent.click(await screen.findByRole('button', { name: 'Send another inquiry' }));
    expect(screen.getByLabelText('First name *')).toHaveValue('');
    expect(screen.getByRole('combobox', { name: 'Service of interest' })).toHaveTextContent('Executive Search');
    expect(screen.getByRole('checkbox', { name: 'Consent to use inquiry information' })).not.toBeChecked();
    fillBrief();
    submitBrief();
    await waitFor(() => expect(apiRequest).toHaveBeenCalledTimes(2));
    expect(apiRequest).toHaveBeenLastCalledWith('POST', '/api/contact', expect.objectContaining({
      service: 'executive-search', utmSource: 'linkedin', utmCampaign: 'india-launch', consentGiven: true,
    }));
  });

  it('allows fresh URL prefills after a successful enquiry clears prior edit protection', async () => {
    renderContact('?service=it-staffing&email=original%40example.invalid');
    fillBrief();
    await selectService('Permanent Hiring');
    submitBrief();
    fireEvent.click(await screen.findByRole('button', { name: 'Send another inquiry' }));
    act(() => window.history.pushState(null, '', '/contact?service=executive-search&email=fresh%40example.invalid'));
    await waitFor(() => expect(screen.getByRole('combobox', { name: 'Service of interest' })).toHaveTextContent('Executive Search'));
    expect(screen.getByLabelText('Work email *')).toHaveValue('fresh@example.invalid');
    expect(screen.getByRole('checkbox', { name: 'Consent to use inquiry information' })).not.toBeChecked();
  });
});
