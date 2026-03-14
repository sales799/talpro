import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

/**
 * Floating WhatsApp CTA button — appears in bottom-right corner.
 * Replaces the old PWA install prompt since TalPro doesn't have a native app.
 * Links to WhatsApp with a pre-filled message for staffing enquiries.
 */

const WHATSAPP_NUMBER = "919845055666"; // Talpro India WhatsApp
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi TalPro, I'm interested in your IT staffing services. Could you share more details?"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function InstallPrompt() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <>
      {/* Floating WhatsApp button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:bg-[#1fb855] transition-all hover:scale-105 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">
          Chat with us
        </span>
      </a>
    </>
  );
}
