import { Switch, Route } from "wouter";
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
import { serviceMap } from "@/config/services";

// Eager load critical pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Industries from "@/pages/Industries";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

// Lazy load secondary pages
const CaseStudies = lazy(() => import("@/pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("@/pages/CaseStudyDetail"));
const Industry = lazy(() => import("@/pages/Industry"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Careers = lazy(() => import("@/pages/Careers"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const HowWeWork = lazy(() => import("@/pages/HowWeWork"));
const SalaryGuide = lazy(() => import("@/pages/SalaryGuide"));
const Compliance = lazy(() => import("@/pages/Compliance"));
const Grievance = lazy(() => import("@/pages/Grievance"));
const Dpo = lazy(() => import("@/pages/Dpo"));
const Security = lazy(() => import("@/pages/Security"));
const RefundPolicy = lazy(() => import("@/pages/RefundPolicy"));
const ShippingPolicy = lazy(() => import("@/pages/ShippingPolicy"));
const ForCandidates = lazy(() => import("@/pages/ForCandidates"));
const Employers = lazy(() => import("@/pages/Employers"));
const SalaryCalculator = lazy(() => import("@/pages/SalaryCalculator"));
const StaffingQuiz = lazy(() => import("@/pages/StaffingQuiz"));
const BlogAdmin = lazy(() => import("@/pages/BlogAdmin"));
const CityPage = lazy(() => import("@/pages/CityPage"));
const GccHub = lazy(() => import("@/pages/GccHub"));
const HireRole = lazy(() => import("@/pages/HireRole"));
const HireRoleCity = lazy(() => import("@/pages/HireRoleCity"));
const ServiceCity = lazy(() => import("@/pages/ServiceCity"));
const IndustryCity = lazy(() => import("@/pages/IndustryCity"));
const SalaryRoleGuide = lazy(() => import("@/pages/SalaryRoleGuide"));
const ComparisonPage = lazy(() => import("@/pages/ComparisonPage"));
const ResourceLibrary = lazy(() => import("@/pages/ResourceLibrary"));
const RoleIndustry = lazy(() => import("@/pages/RoleIndustry"));

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
  const service = serviceMap[params.slug];
  if (!service) {
    return <NotFound />;
  }
  return <ServicePage service={service} />;
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
            <Route path="/services/:service/:city" component={ServiceCity} />
            <Route path="/services/:slug" component={ServiceRoute} />
            <Route path="/hire/:role/in/:industry" component={RoleIndustry} />
            <Route path="/hire/:role/:city" component={HireRoleCity} />
            <Route path="/hire/:role" component={HireRole} />
            <Route path="/case-studies" component={CaseStudies} />
            <Route path="/case-studies/:id" component={CaseStudyDetail} />
            <Route path="/industries" component={Industries} />
            <Route path="/industries/:industry/:city" component={IndustryCity} />
            <Route path="/industries/:slug" component={Industry} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/contact" component={Contact} />
            <Route path="/careers" component={Careers} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/privacy" component={PrivacyPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route path="/terms" component={TermsOfService} />
            <Route path="/legal/compliance" component={Compliance} />
            <Route path="/grievance" component={Grievance} />
            <Route path="/dpo" component={Dpo} />
            <Route path="/security" component={Security} />
            <Route path="/refund" component={RefundPolicy} />
            <Route path="/shipping" component={ShippingPolicy} />
            <Route path="/how-we-work" component={HowWeWork} />
            <Route path="/salary-guide/:role" component={SalaryRoleGuide} />
            <Route path="/salary-guide" component={SalaryGuide} />
            <Route path="/compare/:slug" component={ComparisonPage} />
            <Route path="/resources" component={ResourceLibrary} />
            <Route path="/for-candidates" component={ForCandidates} />
            <Route path="/employers" component={Employers} />
            <Route path="/salary-calculator" component={SalaryCalculator} />
            <Route path="/staffing-quiz" component={StaffingQuiz} />
            <Route path="/admin/blog" component={BlogAdmin} />
            <Route path="/locations/:slug" component={CityPage} />
            <Route path="/gcc-hub" component={GccHub} />
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
