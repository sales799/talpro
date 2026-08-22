# Talpro Website Analytics and KPI Dictionary

Authority: Constitution v2.1 sections 10, 14, 18 and 19.  
Status: event contract implemented locally; live provider and data-quality proof pending.

## Privacy boundary

- Analytics is off until a visitor accepts optional analytics consent.
- Names, email addresses, company names, messages, phone numbers, addresses, referrers, full URLs, query strings and transaction identifiers are prohibited analytics parameters.
- Contact data belongs in the consented lead record, not the analytics stream.
- The client sanitizer removes forbidden keys, email-like values, non-scalar values and unbounded strings before an event can reach the provider.
- No monetary conversion value is assigned without an approved finance and revenue-operations model.

## Governed events

| Event | Purpose | Allowed dimensions | Accountable owner | Release proof |
|---|---|---|---|---|
| `page_view` | Governed route reach | path without query/fragment, page title | Marketing Operations | consent-on/off browser proof and provider receipt |
| `contact_form_submit` | Successful website inquiry | governed service, source | Revenue Operations | one approved sandbox record matched to CRM delivery |
| `service_page_view` | Offer interest | service slug | Offer owner | provider event and route match |
| `service_interest` | Offer CTA/view intent | service, action | Offer owner | event taxonomy check |
| `buyer_journey_view` | Audience-journey reach | audience slug | Marketing Operations | each approved journey emits only its slug |
| `cta_click` | Governed next-action use | surface, destination, approved service/audience slug | Marketing Operations | browser event inspection |
| `trust_control_view` | Trust/procurement evidence interest | control ID, public status | Security / Legal / Procurement | no sensitive document identifier or visitor data |
| `job_search` | Vacancy discovery quality | filter count, result count | Candidate Operations | approved sandbox vacancies only |
| `job_view` | Verified vacancy reach | internal job ID | Candidate Operations | current approved vacancy only |
| `job_application_click` | Handoff to verified application route | internal job ID | Candidate Operations | HTTPS approved application route |
| `consent_update` | Consent-control health | analytics allowed boolean | Privacy owner | accept, decline and withdrawal proof |
| `web_vitals` | Experience monitoring | metric, numeric value, rating | Engineering | LCP, INP and CLS field data after release |

## KPI definitions

| KPI | Definition | Denominator / exclusions | Decision use |
|---|---|---|---|
| Valid inquiry completion | Non-bot, schema-valid, consented, non-duplicate inquiry acknowledged by the application | Excludes honeypot, invalid, rate-limited and duplicate requests | Form and journey quality |
| CRM delivery rate | Inquiries with `crm_delivery_status=delivered` divided by eligible configured-webhook inquiries | Excludes intentionally unconfigured environments | Integration reliability |
| CRM recovery rate | Initially failed inquiries eventually delivered before terminal escalation divided by initially failed inquiries | Requires attempt and next-attempt evidence | Retry health |
| Terminal escalation rate | Inquiries reaching terminal escalation divided by eligible inquiries | Investigate by non-sensitive error category | Incident and owner capacity |
| Qualified opportunity rate | Inquiries receiving a governed `qualified` or later CRM stage divided by delivered inquiries | Stage policy requires Revenue Operations approval | Offer and source quality |
| Buyer-journey contact progression | Valid inquiries whose captured landing/source maps to a buyer journey divided by consented visits to that journey | Analytics and CRM are joined only through approved non-PII attribution rules | Journey usefulness |
| Verified-job application progression | Application clicks divided by views of current verified vacancies | Does not claim completed applications without ATS feedback | Candidate journey health |
| Trust-to-contact progression | Valid inquiries following governed Trust Centre engagement divided by consented trust viewers | No sensitive-document tracking | Procurement journey usefulness |
| Core Web Vitals pass rate | Percentage of eligible field visits meeting LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 | 75th-percentile production evidence required; local lab data is not a substitute | Experience and release decisions |

No KPI target is published until the accountable owner approves the data source, operational capacity, review period and decision threshold.
