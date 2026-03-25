import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Send, Bot, User } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * AI-powered lead qualification chatbot.
 *
 * Floating widget (bottom-right, above WhatsApp button).
 * Uses Claude API on the backend to qualify hiring leads conversationally.
 * No Indian staffing competitor has this — blue ocean differentiator.
 */

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi! I'm TalPro's AI hiring assistant. Tell me about your hiring need — role, tech stack, or team size — and I'll guide you to the right solution in 30 seconds.",
};

export default function AIChatbot() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [location] = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isContactPage = location === '/contact';

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isContactPage || !visible) return null;

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages([...updated, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages([...updated, {
          role: 'assistant',
          content: "I'm having trouble connecting right now. You can reach our team directly at hello@talproindia.com or call 080-4094-8407.",
        }]);
      }
    } catch {
      setMessages([...updated, {
        role: 'assistant',
        content: "Connection issue — please try again or reach us at hello@talproindia.com.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed z-50 bottom-20 right-4 md:bottom-24 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mb-3 w-[340px] md:w-[380px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[hsl(222,47%,11%)] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-[hsl(38,92%,50%)]" />
                <div>
                  <div className="text-sm font-semibold">TalPro AI Assistant</div>
                  <div className="text-[10px] text-white/60">Typically replies instantly</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[300px] overflow-y-auto px-4 py-3 space-y-3 bg-muted/20">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <Bot className="h-5 w-5 shrink-0 mt-1 text-primary/60" />
                  )}
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border text-foreground'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <User className="h-5 w-5 shrink-0 mt-1 text-muted-foreground/60" />
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 justify-start">
                  <Bot className="h-5 w-5 shrink-0 mt-1 text-primary/60" />
                  <div className="bg-background border border-border rounded-xl px-3 py-2">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="px-3 py-2 border-t border-border flex gap-2 bg-background"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your hiring need..."
                className="flex-1 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setOpen(!open)}
        className="h-12 w-12 rounded-full bg-[hsl(222,47%,11%)] text-white shadow-lg hover:bg-[hsl(222,47%,16%)] transition-colors flex items-center justify-center"
        aria-label={open ? 'Close chat' : 'Open AI assistant'}
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </motion.button>
    </div>
  );
}
