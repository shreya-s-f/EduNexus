import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Award,
  TrendingUp,
  Compass,
  Play,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../common/Button';

interface Slide {
  id: number;
  tag: string;
  title: string;
  highlight: string;
  subtitle: string;
  image: string;
  stat1: { value: string; label: string };
  stat2: { value: string; label: string };
  actionText: string;
  actionLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    tag: 'Empowering 12,000+ Tomorrow Leaders',
    title: 'Your Campus,',
    highlight: 'Connected.',
    subtitle:
      'One intelligent platform for academics, campus services, events, placements, and student life. Experience the future of collaborative university education.',
    image:
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920',
    stat1: { value: '98.4%', label: 'Placement Rate' },
    stat2: { value: '₹48 LPA', label: 'Highest Package' },
    actionText: 'Explore Campus',
    actionLink: '/about',
  },
  {
    id: 2,
    tag: 'NAAC A++ Accredited • NIRF Top Ranked',
    title: 'Pioneering Research,',
    highlight: 'Limitless Innovation.',
    subtitle:
      'State-of-the-art AI labs, supercomputing clusters, and multidisciplinary research funded by premier global technology leaders.',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1920',
    stat1: { value: '50+', label: 'Research Centers' },
    stat2: { value: '₹12 Cr+', label: 'Active Grants' },
    actionText: 'Discover Departments',
    actionLink: '/departments',
  },
  {
    id: 3,
    tag: 'Global Career Pathways • Top 500 Recruiters',
    title: 'Launch Your Career at',
    highlight: 'World-Class Tech Firms.',
    subtitle:
      'Direct on-campus placement drives with Google, Microsoft, Amazon, Cisco, and Oracle. Integrated internship tracking and career mentorship.',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1920',
    stat1: { value: '150+', label: 'Hiring Partners' },
    stat2: { value: '₹9.4 LPA', label: 'Average CTC' },
    actionText: 'Placement Highlights',
    actionLink: '/placements',
  },
  {
    id: 4,
    tag: 'Vibrant Campus Life • 40+ Student Clubs',
    title: 'Celebrate Culture,',
    highlight: 'Hackathons & Sports.',
    subtitle:
      'From 36-hour national hackathons to legendary cultural fests and Olympic sports facilities. Find your community at EduNexus.',
    image:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1920',
    stat1: { value: '40+', label: 'Active Clubs' },
    stat2: { value: '200+', label: 'Annual Events' },
    actionText: 'Explore Campus Life',
    actionLink: '/events',
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section
      className="relative px-4 sm:px-6 lg:px-8 pt-4 pb-12 max-w-7xl mx-auto"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Carousel Container */}
      <div className="relative h-[620px] sm:h-[650px] lg:h-[680px] w-full rounded-3xl overflow-hidden shadow-float border border-slate-200/60 dark:border-slate-800/80">
        {/* Background Images with smooth fade */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
            />
            {/* Multi-layered gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>
        ))}

        {/* Foreground Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-10 lg:p-16 text-white max-w-4xl">
          {/* Top Pill & Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-semibold tracking-wide text-white uppercase">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>{active.tag}</span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 backdrop-blur-md border border-brand-400/30 text-xs font-medium text-brand-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>EduNexus Certified Platform</span>
            </div>
          </div>

          {/* Main Title & Description */}
          <div className="space-y-4 my-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              {active.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-400 to-indigo-300">
                {active.highlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200/90 max-w-2xl font-normal leading-relaxed">
              {active.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to={active.actionLink}>
                <Button size="lg" className="shadow-lg shadow-brand-500/30 group">
                  <span>{active.actionText}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-md"
                >
                  Student Portal Login
                </Button>
              </Link>
              <Link to="/campus-map">
                <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Compass className="w-4 h-4 text-brand-300" />
                  </div>
                  <span>Virtual Map</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Floating Metric Cards at bottom */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/15">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 transition-transform hover:scale-[1.02]">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-300">{active.stat1.label}</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold mt-1 text-white tracking-tight">
                {active.stat1.value}
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 transition-transform hover:scale-[1.02]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-300">{active.stat2.label}</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold mt-1 text-white tracking-tight">
                {active.stat2.value}
              </p>
            </div>

            <div className="hidden sm:block p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 transition-transform hover:scale-[1.02]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span className="text-xs text-slate-300">Live Campus AI</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold mt-1 text-white tracking-tight">
                24/7 Available
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="p-3 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="p-3 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators / Thumbnails */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-8 bg-brand-400'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Quick Service Pills Bar beneath Hero */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <Link
          to="/departments"
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-card flex items-center gap-3 transition-all hover:-translate-y-0.5"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center font-bold text-sm">
            01
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">6 Departments</h4>
            <p className="text-[11px] text-slate-500">ISE, CSE, ECE & more</p>
          </div>
        </Link>

        <Link
          to="/placements"
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-card flex items-center gap-3 transition-all hover:-translate-y-0.5"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold text-sm">
            02
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Placement Hub</h4>
            <p className="text-[11px] text-slate-500">Tier-1 recruitments</p>
          </div>
        </Link>

        <Link
          to="/campus-map"
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-card flex items-center gap-3 transition-all hover:-translate-y-0.5"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold text-sm">
            03
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Campus Map</h4>
            <p className="text-[11px] text-slate-500">Rooms & live directions</p>
          </div>
        </Link>

        <Link
          to="/ai-assistant"
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-card flex items-center gap-3 transition-all hover:-translate-y-0.5"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center font-bold text-sm">
            04
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">EduNexus AI</h4>
            <p className="text-[11px] text-slate-500">Instant answers 24/7</p>
          </div>
        </Link>
      </div>
    </section>
  );
};
