import { Switch, Route } from "wouter";
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
            <Route path="/services/:slug" component={ServiceRoute} />
            <Route path="/case-studies" component={CaseStudies} />
            <Route path="/case-studies/:id" component={CaseStudyDetail} />
            <Route path="/industries" component={Industries} />
            <Route path="/industries/:slug" component={Industry} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/contact" component={Contact} />
            <Route path="/careers" component={Careers} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route path="/how-we-work" component={HowWeWork} />
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
