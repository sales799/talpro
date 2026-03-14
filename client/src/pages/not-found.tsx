import { Link } from 'wouter';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="text-8xl font-extrabold text-[hsl(222,47%,11%)] mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-3">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold text-sm hover:brightness-105 transition-all cursor-pointer shadow-lg shadow-amber-500/20">
              <Home className="h-4 w-4" />
              Back to Home
            </span>
          </Link>
          <Link href="/services">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-all cursor-pointer">
              <Search className="h-4 w-4" />
              Browse Services
            </span>
          </Link>
          <Link href="/contact">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-all cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
              Contact Us
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
