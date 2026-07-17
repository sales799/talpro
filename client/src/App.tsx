import { Switch, Route, Redirect } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Canonical from "@/components/Canonical";
import Layout from "@/components/Layout";
import Analytics from "@/components/Analytics";
import SearchModal from "@/components/SearchModal";
import CookieConsent from "@/components/CookieConsent";
import { ServicePage } from "@/components/service/ServicePage";
import { legacyServiceRedirects, serviceMap } from "@/config/services";

// Eager load critical pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

// Lazy load secondary pages
const Careers = lazy(() => import("@/pages/Careers"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const HowWeWork = lazy(() => import("@/pages/HowWeWork"));
const Compliance = lazy(() => import("@/pages/Compliance"));
const Grievance = lazy(() => import("@/pages/Grievance"));
const Dpo = lazy(() => import("@/pages/Dpo"));
const Security = lazy(() => import("@/pages/Security"));
const ForCandidates = lazy(() => import("@/pages/ForCandidates"));
const Employers = lazy(() => import("@/pages/Employers"));
const ResourceLibrary = lazy(() => import("@/pages/ResourceLibrary"));
const Jobs = lazy(() => import("@/pages/Jobs"));
const JobDetail = lazy(() => import("@/pages/JobDetail"));
const TrustCentre = lazy(() => import("@/pages/TrustCentre"));
const CandidateSafety = lazy(() => import("@/pages/CandidateSafety"));
const Accessibility = lazy(() => import("@/pages/Accessibility"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}

// Service route handler
function ServiceRoute({ params }: { params: { slug: string } }) {
  const canonicalSlug = legacyServiceRedirects[params.slug];
  if (canonicalSlug) {
    return <Redirect to={`/services/${canonicalSlug}`} replace />;
  }
  const service = serviceMap[params.slug];
  if (!service) {
    return <NotFound />;
  }
  return <ServicePage service={service} />;
}

function ServiceCityRoute({ params }: { params: { service: string; city: string } }) {
  const canonicalSlug = legacyServiceRedirects[params.service] ?? params.service;
  return <Redirect to={`/services/${canonicalSlug}`} replace />;
}

function HiddenClaimRoute() {
  return <Redirect to="/services" replace />;
}

function PendingSalaryEvidenceRoute() {
  return <Redirect to="/resources" replace />;
}

function LegacyGccHubRoute() {
  return <Redirect to="/services/gcc-accelerator" replace />;
}

function LegacyCommercePolicyRoute() {
  return <Redirect to="/terms-of-service" replace />;
}

function Router() {
  return (
    <>
      <Canonical />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/services/:service/:city" component={ServiceCityRoute} />
            <Route path="/services/:slug" component={ServiceRoute} />
            <Route path="/hire/:role/in/:industry" component={HiddenClaimRoute} />
            <Route path="/hire/:role/:city" component={HiddenClaimRoute} />
            <Route path="/hire/:role" component={HiddenClaimRoute} />
            <Route path="/case-studies" component={HiddenClaimRoute} />
            <Route path="/case-studies/:id" component={HiddenClaimRoute} />
            <Route path="/industries" component={HiddenClaimRoute} />
            <Route path="/industries/:industry/:city" component={HiddenClaimRoute} />
            <Route path="/industries/:slug" component={HiddenClaimRoute} />
            <Route path="/blog" component={PendingSalaryEvidenceRoute} />
            <Route path="/blog/:slug" component={PendingSalaryEvidenceRoute} />
            <Route path="/contact" component={Contact} />
            <Route path="/careers" component={Careers} />
            <Route path="/jobs/:slug" component={JobDetail} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/trust" component={TrustCentre} />
            <Route path="/candidate-safety" component={CandidateSafety} />
            <Route path="/accessibility" component={Accessibility} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/privacy" component={PrivacyPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route path="/terms" component={TermsOfService} />
            <Route path="/legal/compliance" component={Compliance} />
            <Route path="/grievance" component={Grievance} />
            <Route path="/dpo" component={Dpo} />
            <Route path="/security" component={Security} />
            <Route path="/refund" component={LegacyCommercePolicyRoute} />
            <Route path="/shipping" component={LegacyCommercePolicyRoute} />
            <Route path="/how-we-work" component={HowWeWork} />
            <Route path="/salary-guide/:role" component={PendingSalaryEvidenceRoute} />
            <Route path="/salary-guide" component={PendingSalaryEvidenceRoute} />
            <Route path="/compare/:slug" component={HiddenClaimRoute} />
            <Route path="/resources" component={ResourceLibrary} />
            <Route path="/for-candidates" component={ForCandidates} />
            <Route path="/employers" component={Employers} />
            <Route path="/salary-calculator" component={PendingSalaryEvidenceRoute} />
            <Route path="/staffing-quiz" component={HiddenClaimRoute} />
            <Route path="/admin/blog" component={HiddenClaimRoute} />
            <Route path="/locations/:slug" component={HiddenClaimRoute} />
            <Route path="/gcc-hub" component={LegacyGccHubRoute} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Analytics />
        <SearchModal />
        <CookieConsent />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
