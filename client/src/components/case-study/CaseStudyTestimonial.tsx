import { Star, Play } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  avatarUrl?: string;
  videoUrl?: string;
}

interface CaseStudyTestimonialProps {
  testimonial: Testimonial;
  index?: number;
}

export default function CaseStudyTestimonial({ testimonial, index = 0 }: CaseStudyTestimonialProps) {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 relative overflow-hidden" data-testid={`testimonial-${index}`}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
      }}></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
            <Star className="w-4 h-4 text-blue-600 dark:text-blue-400 fill-current" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CLIENT TESTIMONIAL</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">What Our</span><br />
            <span className="text-foreground">Clients Say</span>
          </h2>
        </div>

        <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 dark:border-slate-700/20 shadow-xl">
          {/* Video Testimonial */}
          {testimonial.videoUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl" data-testid={`testimonial-video-${index}`}>
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={testimonial.videoUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`Video testimonial from ${testimonial.author}`}
                ></iframe>
              </div>
            </div>
          )}

          {/* Quote Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
          </div>

          {/* Quote Text */}
          <blockquote className="text-xl md:text-2xl text-center text-muted-foreground leading-relaxed mb-8 italic" data-testid={`testimonial-quote-${index}`}>
            "{testimonial.quote}"
          </blockquote>

          {/* Star Rating */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>

          {/* Author Info */}
          <div className="flex items-center justify-center gap-4">
            <Avatar className="w-16 h-16 border-4 border-white dark:border-slate-700 shadow-lg" data-testid={`testimonial-avatar-${index}`}>
              {testimonial.avatarUrl ? (
                <AvatarImage src={testimonial.avatarUrl} alt={testimonial.author} />
              ) : null}
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg font-semibold">
                {getInitials(testimonial.author)}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <div className="font-bold text-lg text-foreground" data-testid={`testimonial-author-${index}`}>{testimonial.author}</div>
              <div className="text-muted-foreground" data-testid={`testimonial-position-${index}`}>{testimonial.position}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
