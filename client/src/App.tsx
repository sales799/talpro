import { Switch, Route, useLocation } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Canonical from "@/components/Canonical";
import Layout from "@/components/Layout";
import InstallPrompt from "@/components/InstallPrompt";
import Analytics from "@/components/Analytics";
import { ServicePage } from "@/components/service/ServicePage";
import { serviceMap } from "@/config/services";

// Eager load critical pages (home, about, services, contact)
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

// Lazy load large/heavy pages for better initial load performance
const CustomSoftware = lazy(() => import("@/pages/services/CustomSoftware"));
const MobileApp = lazy(() => import("@/pages/services/MobileApp"));
const AiMl = lazy(() => import("@/pages/services/AiMl"));
const GccAccelerator = lazy(() => import("@/pages/services/GccAccelerator"));
const WorkspaceSolutions = lazy(() => import("@/pages/services/WorkspaceSolutions"));
const TalentIntelligence = lazy(() => import("@/pages/services/TalentIntelligence"));
const BusinessOperations = lazy(() => import("@/pages/services/BusinessOperations"));
const CaseStudies = lazy(() => import("@/pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("@/pages/CaseStudyDetail"));
const Industry = lazy(() => import("@/pages/Industry"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Careers = lazy(() => import("@/pages/Careers"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const HowWeDiffer = lazy(() => import("@/pages/HowWeDiffer"));
const AIRecruiterAssessment = lazy(() => import("@/pages/AIRecruiterAssessment"));
const AssessmentEmbed = lazy(() => import("@/pages/AssessmentEmbed"));
const OnlineAssessmentPlatform = lazy(() => import("@/pages/OnlineAssessmentPlatform"));
const Hireiq = lazy(() => import("@/pages/Hireiq"));
const Cvpro = lazy(() => import("@/pages/Cvpro"));

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
  const [location] = useLocation();
  const isEmbedRoute = location === '/careers/apply/276665';
  
  if (isEmbedRoute) {
    // Render embed route without layout
    return (
      <>
        <Canonical />
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/careers/apply/276665" component={AssessmentEmbed} />
          </Switch>
        </Suspense>
      </>
    );
  }
  
  return (
    <>
      <Canonical />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/services/custom-software" component={CustomSoftware} />
            <Route path="/services/mobile-app" component={MobileApp} />
            <Route path="/services/ai-ml" component={AiMl} />
            <Route path="/services/gcc-accelerator" component={GccAccelerator} />
            <Route path="/services/workspace-solutions" component={WorkspaceSolutions} />
            <Route path="/services/talent-intelligence" component={TalentIntelligence} />
            <Route path="/services/business-operations" component={BusinessOperations} />
            <Route path="/services/:slug" component={ServiceRoute} />
            <Route path="/case-studies" component={CaseStudies} />
            <Route path="/case-studies/:id" component={CaseStudyDetail} />
            <Route path="/industries/:slug" component={Industry} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/contact" component={Contact} />
            <Route path="/careers" component={Careers} />
            <Route path="/faq" component={FAQ} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route path="/how-we-differ" component={HowWeDiffer} />
            <Route path="/ai-recruiter-assessment" component={AIRecruiterAssessment} />
            <Route path="/eva" component={AIRecruiterAssessment} />
            <Route path="/assessments" component={OnlineAssessmentPlatform} />
            <Route path="/hireiq" component={Hireiq} />
            <Route path="/cvpro" component={Cvpro} />
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
        <InstallPrompt />
        <Analytics />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
