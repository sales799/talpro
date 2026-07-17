import { useState, useEffect } from 'react';
import SEO from '@/components/SEO';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'wouter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Send,
  Calendar,
} from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { services } from '@/config/services';
import { motion } from 'framer-motion';
import { PRIVACY_NOTICE_VERSION } from '@shared/privacy';

/**
 * Contact — split layout with form (left) and contact details (right).
 * Staffing-focused: "Share your hiring brief" not "Start your project."
 */

const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters'),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  landingPage: z.string().optional(),
  referrer: z.string().optional(),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'Consent is required to submit your hiring brief' }),
  }),
  privacyNoticeVersion: z.string(),
  /** Honeypot field — invisible to users, bots fill it automatically */
  website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      service: '',
      message: '',
      source: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmTerm: '',
      utmContent: '',
      landingPage: '',
      referrer: '',
      consentGiven: undefined,
      privacyNoticeVersion: PRIVACY_NOTICE_VERSION,
      website: '',
    },
  });

  /* Pre-populate service + UTM params from URL query params */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      form.setValue('service', serviceParam);
      analytics.trackServiceInterest(serviceParam, 'view');
    }
    const emailParam = params.get('email');
    if (emailParam) {
      form.setValue('email', emailParam);
    }
    // Auto-capture UTM parameters
    const utm_source = params.get('utm_source');
    const utm_medium = params.get('utm_medium');
    const utm_campaign = params.get('utm_campaign');
    const utm_term = params.get('utm_term');
    const utm_content = params.get('utm_content');
    if (utm_source) form.setValue('utmSource', utm_source);
    if (utm_medium) form.setValue('utmMedium', utm_medium);
    if (utm_campaign) form.setValue('utmCampaign', utm_campaign);
    if (utm_term) form.setValue('utmTerm', utm_term);
    if (utm_content) form.setValue('utmContent', utm_content);
    form.setValue('landingPage', window.location.pathname);
    form.setValue('referrer', document.referrer);
  }, [form]);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: (data, variables) => {
      setIsSubmitted(true);
      toast({
        title: 'Message Sent!',
        description:
          data.message ||
          "Thank you for your inquiry. We'll review the brief and confirm the next step.",
      });

      analytics.trackContactFormSubmit({
        service: variables.service,
        source: variables.source || 'website',
      });

      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description:
          error.message ||
          'An error occurred while sending your message. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    // Honeypot check — bots fill hidden fields, humans don't
    if (data.website) {
      // Silently pretend success to avoid tipping off the bot
      setIsSubmitted(true);
      return;
    }
    contactMutation.mutate(data);
  };

  return (
    <>
      <SEO
        title="Contact TalPro — Start Your Hiring Brief"
        description="Share a technology talent, contract staffing, permanent hiring, executive search, RPO, or GCC workforce brief with Talpro."
        path="/contact"
      />

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[hsl(222,47%,11%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,hsl(187,92%,41%,0.12),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-3"
          >
            Get in Touch
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl mx-auto"
          >
            Share Your{' '}
            <span className="text-[hsl(38,92%,50%)]">Hiring Brief</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-white/70 max-w-xl mx-auto"
          >
            Tell us what capability you need. We will review the mandate and
            confirm the appropriate offer, evidence plan, owner, and next step.
          </motion.p>
        </div>
      </section>

      {/* ── Form + Contact Info ────────────────────────── */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* ── Left: Form (3 cols) ──── */}
            <div className="lg:col-span-3">
              {isSubmitted ? (
                <div className="text-center py-16 bg-muted/30 rounded-2xl border border-border">
                  <CheckCircle2 className="h-12 w-12 text-[hsl(160,84%,39%)] mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-2">Brief received!</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Our team will review your requirements and confirm the
                    appropriate next step.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-sm text-[hsl(187,92%,41%)] hover:underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="jane@company.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Inc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service of interest</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map((s) => (
                                <SelectItem key={s.slug} value={s.slug}>
                                  {s.name}
                                </SelectItem>
                              ))}
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tell us about your hiring needs *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="E.g. We need 3 senior React engineers for a 6-month contract starting next month..."
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="source"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How did you hear about us?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select one (optional)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="linkedin">LinkedIn</SelectItem>
                              <SelectItem value="google">Google Search</SelectItem>
                              <SelectItem value="referral">Referral / Word of mouth</SelectItem>
                              <SelectItem value="twitter">X (Twitter)</SelectItem>
                              <SelectItem value="instagram">Instagram</SelectItem>
                              <SelectItem value="event">Conference / Event</SelectItem>
                              <SelectItem value="blog">Blog / Article</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consentGiven"
                      render={({ field }) => (
                        <FormItem className="rounded-xl border border-border bg-muted/20 p-4">
                          <div className="flex items-start gap-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value === true}
                                onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)}
                                aria-label="Consent to use inquiry information"
                              />
                            </FormControl>
                            <div className="space-y-1">
                              <FormLabel className="text-sm leading-relaxed font-normal">
                                I agree that Talpro may use this information to respond to my
                                hiring enquiry as described in the{' '}
                                <Link href="/privacy-policy" className="font-medium underline underline-offset-2">
                                  Privacy Policy
                                </Link>.
                              </FormLabel>
                              <p className="text-xs text-muted-foreground">
                                This consent covers this enquiry only. It does not subscribe you to marketing.
                              </p>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Honeypot — hidden from humans, bots auto-fill it */}
                    <div aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden" style={{ position: 'absolute', left: '-9999px' }}>
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        tabIndex={-1}
                        autoComplete="off"
                        {...form.register('website')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold text-sm hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20"
                    >
                      {contactMutation.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Brief <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                </Form>
              )}
            </div>

            {/* ── Right: Contact Details (2 cols) ──── */}
            <div className="lg:col-span-2 space-y-8">
              {/* Response time badge */}
              <div className="bg-[hsl(222,47%,11%)] text-white rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-5 w-5 text-[hsl(187,92%,41%)]" />
                  <span className="text-sm font-semibold">
                    Mandate review
                  </span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">
                  We review every brief personally and respond with a tailored
                  plan — not an auto-reply.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-5">
                <h2 className="font-bold text-lg">Contact details</h2>

                <a
                  href="mailto:hello@talproindia.com"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-[hsl(187,92%,41%)]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium group-hover:text-[hsl(187,92%,41%)] transition-colors">
                      hello@talproindia.com
                    </div>
                    <div className="text-xs text-muted-foreground">
                      General inquiries
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+918040948407"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-[hsl(187,92%,41%)]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium group-hover:text-[hsl(187,92%,41%)] transition-colors">
                      080 4094 8407
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Mon–Fri, 9 AM – 6 PM IST
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-[hsl(187,92%,41%)]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Bengaluru, India</div>
                    <div className="text-xs text-muted-foreground">
                      Headquarters
                    </div>
                  </div>
                </div>
              </div>

              {/* What to expect */}
              <div className="border border-border rounded-2xl p-6">
                <h2 className="font-bold text-sm mb-4">
                  What happens after you submit?
                </h2>
                <ol className="space-y-3">
                  {[
                    'We review your brief and ask clarifying questions',
                    'We confirm the offer, owner, evidence and delivery boundaries',
                    'You receive the agreed plan and mandate-specific service level',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-[hsl(222,47%,11%)] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Schedule a Call */}
              <div className="bg-muted/30 border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-5 w-5 text-[hsl(187,92%,41%)]" />
                  <h2 className="font-bold text-sm">Prefer a conversation?</h2>
                </div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  Schedule a 30-minute call with our staffing consultants at a time that works for you.
                </p>
                <a
                  href="https://calendly.com/talproindia/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center text-sm font-semibold py-2.5 rounded-xl bg-[hsl(222,47%,11%)] text-white hover:bg-[hsl(222,47%,15%)] transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Office Location ──────────────────────────────── */}
      <section className="bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Bengaluru hiring desk</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                TalPro serves GCC and enterprise technology mandates across India from
                our registered office in Bengaluru.
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Flat%20No.%20A-103%2C%20Prospect%20Princeton%2C%20Manipal%20County%20Road%2C%20Singasandra%2C%20Bommanahalli%2C%20Bengaluru%20Urban%2C%20Karnataka%20560068%2C%20India"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted transition-colors"
            >
              <MapPin className="h-4 w-4 text-[hsl(187,92%,41%)]" />
              Open map
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
