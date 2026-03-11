import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans smooth-scroll">
      <Navigation />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
