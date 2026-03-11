import { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import { Image as ImageIcon, Play } from 'lucide-react';

interface MediaAsset {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

interface CaseStudyMediaGalleryProps {
  mediaAssets: MediaAsset[];
}

export default function CaseStudyMediaGallery({ mediaAssets }: CaseStudyMediaGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    // Initialize current position
    setCurrent(api.selectedScrollSnap());

    // Update current whenever slide changes
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    // Cleanup
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  if (!mediaAssets || mediaAssets.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background relative overflow-hidden" data-testid="case-study-media-gallery">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)`,
      }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-6">
            <ImageIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">PROJECT GALLERY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Visual</span><br />
            <span className="text-foreground">Showcase</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the design, features, and implementation details through our project gallery.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Carousel 
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {mediaAssets.map((asset, index) => (
                <CarouselItem key={index}>
                  <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-6 border border-white/20 dark:border-slate-700/20 shadow-xl" data-testid={`gallery-item-${index}`}>
                    {asset.type === 'image' ? (
                      <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <img
                          src={asset.url}
                          alt={asset.caption || `Project image ${index + 1}`}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="rounded-2xl overflow-hidden shadow-2xl" data-testid={`gallery-video-${index}`}>
                        <div className="relative" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            src={asset.url}
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={asset.caption || `Project video ${index + 1}`}
                          ></iframe>
                        </div>
                      </div>
                    )}
                    
                    {asset.caption && (
                      <div className="mt-6 text-center">
                        <p className="text-muted-foreground font-medium flex items-center justify-center gap-2">
                          {asset.type === 'video' ? (
                            <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          )}
                          {asset.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-16" />
            <CarouselNext className="hidden md:flex -right-16" />
          </Carousel>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {mediaAssets.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 w-8' 
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                data-testid={`gallery-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
