import Navigation from './Navigation';
import Footer from './Footer';
import PageTransition from './PageTransition';
import WhatsAppButton from './WhatsAppButton';
import AIChatbot from './AIChatbot';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans smooth-scroll">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-black focus:underline">Skip to main content</a>
      <Navigation />
      <main id="main-content" aria-label="Page content">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <AIChatbot />
      <WhatsAppButton />
    </div>
  );
}
