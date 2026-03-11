import { Link } from 'wouter';
import talproLogo from '@assets/TalproLG1_1758602854563.jpeg';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src={talproLogo} 
                alt="TalPro Solutions - Professional Software Development" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-background/80 mb-6">
              Engineering innovative software solutions that transform businesses and accelerate growth since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/3007934/" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors cursor-pointer" data-testid="link-linkedin">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="https://x.com/talproindia" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors cursor-pointer" data-testid="link-twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="https://www.instagram.com/indiatalpro/" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors cursor-pointer" data-testid="link-instagram">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://www.facebook.com/TalproIndia" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors cursor-pointer" data-testid="link-facebook">
                <i className="fab fa-facebook text-xl"></i>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/services/custom-software" className="hover:text-background transition-colors" data-testid="footer-link-custom-software">
                  Custom Software Development
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-app" className="hover:text-background transition-colors" data-testid="footer-link-mobile-app">
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link href="/services/ai-ml" className="hover:text-background transition-colors" data-testid="footer-link-ai-ml">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/services/gcc-accelerator" className="hover:text-background transition-colors" data-testid="footer-link-gcc-accelerator">
                  GCC Accelerator
                </Link>
              </li>
              <li>
                <Link href="/services/talent-intelligence" className="hover:text-background transition-colors" data-testid="footer-link-talent-intelligence">
                  Talent Intelligence
                </Link>
              </li>
              <li>
                <Link href="/services/workspace-solutions" className="hover:text-background transition-colors" data-testid="footer-link-workspace-solutions">
                  Workspace Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/business-operations" className="hover:text-background transition-colors" data-testid="footer-link-business-operations">
                  Business Operations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/about" className="hover:text-background transition-colors" data-testid="footer-link-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-background transition-colors" data-testid="footer-link-careers">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-background transition-colors" data-testid="footer-link-case-studies">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-background transition-colors" data-testid="footer-link-blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-background transition-colors" data-testid="footer-link-press">
                  Press & Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/contact" className="hover:text-background transition-colors" data-testid="footer-link-contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-background transition-colors" data-testid="footer-link-help">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-background transition-colors" data-testid="footer-link-privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-background transition-colors" data-testid="footer-link-terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-background transition-colors" data-testid="footer-link-faq">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2024 Talpro. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0 text-sm text-background/60">
            <span>📍 Bengaluru, India</span>
            <span>📞 08040948407</span>
            <span>✉️ hello@talproindia.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
