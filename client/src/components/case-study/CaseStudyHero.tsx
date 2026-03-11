import { Link } from 'wouter';
import { Clock, Users, Code, Trophy, Building2, Play } from 'lucide-react';

interface CaseStudy {
  id: number;
  title: string;
  client: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  duration: string;
  teamSize: number;
}

interface CaseStudyHeroProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-700 to-teal-600 text-white relative overflow-hidden" data-testid="case-study-hero">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: '60px 60px, 30px 30px'
      }}></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-float-rotate opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse-glow opacity-40"></div>
        <div className="absolute bottom-32 left-20 w-8 h-8 bg-gradient-to-r from-teal-400 to-green-400 rounded-full animate-float-rotate opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse-glow opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20" data-testid="hero-category">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-glow"></div>
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">{caseStudy.category.toUpperCase()}</span>
              Success Story
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">{caseStudy.title}</span>
            </h1>
            
            <p className="text-2xl text-white/90 mb-4 font-semibold flex items-center justify-center lg:justify-start gap-2" data-testid="hero-client">
              <Building2 className="w-6 h-6" />
              {caseStudy.client}
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0" data-testid="hero-description">{caseStudy.description}</p>
            
            {/* Enhanced Project Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-duration">
                <Clock className="w-6 h-6 text-green-400 mb-2 group-hover:scale-110 transition-transform animate-float-rotate" />
                <div className="text-lg font-bold text-green-400">{caseStudy.duration}</div>
                <div className="text-xs text-white/70">Duration</div>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-team">
                <Users className="w-6 h-6 text-green-400 mb-2 group-hover:scale-110 transition-transform animate-float-rotate" />
                <div className="text-lg font-bold text-green-400">{caseStudy.teamSize}</div>
                <div className="text-xs text-white/70">Team Size</div>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-technologies">
                <Code className="w-6 h-6 text-green-400 mb-2 group-hover:scale-110 transition-transform animate-float-rotate" />
                <div className="text-lg font-bold text-green-400">{caseStudy.technologies.length}+</div>
                <div className="text-xs text-white/70">Technologies</div>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-results">
                <Trophy className="w-6 h-6 text-green-400 mb-2 group-hover:scale-110 transition-transform animate-float-rotate" />
                <div className="text-lg font-bold text-green-400">{caseStudy.metrics.length}</div>
                <div className="text-xs text-white/70">Key Results</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#challenge" className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-view-details">
                <span className="relative z-10 flex items-center gap-2">
                  View Project Details
                  <Play className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <Link href="/contact" className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-start-similar">
                Start Similar Project
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
            <div className="relative stat-card-glass bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl">
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="rounded-2xl w-full h-auto shadow-2xl hover:scale-105 transition-transform duration-500"
                data-testid="case-study-hero-image"
              />
              <div className="absolute top-8 right-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Success Story</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
