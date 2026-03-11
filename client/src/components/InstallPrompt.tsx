import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response: ${outcome}`);
    analytics.trackPWAInstall(outcome === 'accepted' ? 'accepted' : 'dismissed');
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    analytics.trackPWAInstall('dismissed');
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  if (!showPrompt || localStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-4 border-2 border-[#D4AF37]">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        data-testid="button-dismiss-pwa"
      >
        <X className="w-5 h-5" />
      </button>
      
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Download className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">Install TalPro App</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Install our app for quick access and offline support
          </p>
          <button
            onClick={handleInstall}
            className="bg-[#D4AF37] text-white px-4 py-2 rounded-md hover:bg-[#c09a2b] transition-colors font-medium"
            data-testid="button-install-pwa"
          >
            Install Now
          </button>
        </div>
      </div>
    </div>
  );
}
