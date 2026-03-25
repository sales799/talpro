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
      <Navigation />
      <main>
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
