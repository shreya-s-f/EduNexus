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
  ShieldCheck,
  Building,
  GraduationCap,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Card3D } from '../3d/Card3D';

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
    tag: 'ESTD 1963 • B.V.V. Sangha’s Basaveshwar Engineering College (Autonomous)',
    title: 'Your Campus,',
    highlight: 'Connected.',
    subtitle:
      'A premier Government-Aided Autonomous institution permanently affiliated to VTU Belagavi, accredited with NAAC "A" Grade across a sprawling 93-acre lush green campus in Bagalkote, Karnataka.',
    image: '/college-campus.jpg',
    stat1: { value: '98.4%', label: 'Placement Rate' },
    stat2: { value: '₹48 LPA', label: 'Highest Package' },
    actionText: 'Explore BEC Campus',
    actionLink: '/about',
  },
  {
    id: 2,
    tag: 'World Bank Funded (TEQIP-I, II & III) • NAAC "A" Grade (2024–2029)',
    title: 'Pioneering Research,',
    highlight: 'Limitless Innovation.',
    subtitle:
      'Empowered by World Bank TEQIP support, modern AI & Robotics centers, BEC-STEP Incubation Park, and recognized Ph.D. research centers in all engineering disciplines.',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1920',
    stat1: { value: '60+ Years', label: 'Academic Legacy' },
    stat2: { value: '93 Acres', label: 'Campus Area' },
    actionText: 'Discover Departments',
    actionLink: '/departments',
  },
  {
    id: 3,
    tag: 'CET: E031 / E049 • COMEDK: E024 • Top 150 Recruiters',
    title: 'Launch Your Career at',
    highlight: 'Global Technology Leaders.',
    subtitle:
      'Direct on-campus placement drives with TCS, Infosys, Wipro, Bosch, Mindtree, Google, Microsoft, and Cisco. Dedicated career guidance and internship tracking.',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1920',
    stat1: { value: '150+', label: 'Hiring Partners' },
    stat2: { value: '₹9.4 LPA', label: 'Average CTC' },
    actionText: 'Placement Highlights',
    actionLink: '/placements',
  },
  {
    id: 4,
    tag: 'Vibrant Student Life • IEEE PES • IIC • 40+ Clubs',
    title: 'Celebrate Culture,',
    highlight: 'Hackathons & Sports.',
    subtitle:
      'Host to national technical symposiums, CIRCUTECH, IEEE conferences, 15th Graduation Convocation, and sports competitions on our Olympic grounds.',
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
      className="relative w-full px-4 sm:px-6 lg:px-10 pt-2 pb-8"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Official Government Aided Autonomous Banner & CET Codes */}
      <div className="mb-3 px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between text-xs text-slate-700 dark:text-zinc-300 gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="font-bold text-red-600 dark:text-red-400">B.V.V. Sangha's BEC Bagalkote</span>
          <span className="hidden md:inline">• Government Aided Autonomous College • Affiliated to VTU Belagavi</span>
          <span className="hidden lg:inline">• NAAC "A" Grade (2024–2029)</span>
        </div>
        <div className="flex items-center gap-2 font-mono font-bold text-[11px]">
          <span className="bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 px-2 py-0.5 rounded border border-red-200 dark:border-red-900/60">
            CET: E031 / E049
          </span>
          <span className="bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-900/60">
            COMEDK: E024
          </span>
          <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900/60">
            PG: B124 / C408MC / T810
          </span>
        </div>
      </div>

      {/* 100% Width Carousel Container */}
      <div className="relative h-[620px] sm:h-[660px] lg:h-[700px] w-full rounded-3xl overflow-hidden shadow-float border border-slate-200/80 dark:border-zinc-800 bg-black">
        {/* Background Images with smooth crossfade - Clean and unblocked */}
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
              className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-7000 ease-out"
            />
            {/* Clean dark gradient overlay to ensure crystal clear readability without blocking the photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/20" />
          </div>
        ))}

        {/* Foreground Content - Pristine & High Contrast */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 text-white max-w-4xl">
          {/* Top Pills with Red & Light Blue accents */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-sky-400/50 text-xs font-semibold tracking-wide text-sky-300 uppercase shadow-glow-blue">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>{active.tag}</span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 backdrop-blur-md border border-red-500/50 text-xs font-medium text-red-200 shadow-glow-red">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
              <span>BEC EduNexus Connected Campus</span>
            </div>
          </div>

          {/* Main Title & Description */}
          <div className="space-y-4 my-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              {active.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-sky-300 drop-shadow">
                {active.highlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
              {active.subtitle}
            </p>

            {/* CTAs with 3D Depth */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to={active.actionLink}>
                <Button size="lg" variant="primary" className="shadow-3d-red group">
                  <span>{active.actionText}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-black/40 hover:bg-black/60 border-sky-400/50 text-white backdrop-blur-md hover:border-sky-300 shadow-3d-blue/20"
                >
                  Student Portal Login
                </Button>
              </Link>
              <Link to="/campus-map">
                <button className="flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-white px-3 py-2 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Compass className="w-4 h-4 text-sky-400" />
                  </div>
                  <span>Virtual Map</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Floating Metric Cards at bottom */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/15">
            {/* Stat 1 - Light Green */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-emerald-500/40 hover:border-emerald-400 transition-all hover:scale-[1.02] shadow-3d-green/20">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-200">{active.stat1.label}</span>
              </div>
              <p className="text-xl sm:text-2xl font-extrabold mt-1 text-white tracking-tight">
                {active.stat1.value}
              </p>
            </div>

            {/* Stat 2 - Crimson Red */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-red-500/40 hover:border-red-400 transition-all hover:scale-[1.02] shadow-3d-red/20">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-red-400" />
                <span className="text-xs text-red-200">{active.stat2.label}</span>
              </div>
              <p className="text-xl sm:text-2xl font-extrabold mt-1 text-white tracking-tight">
                {active.stat2.value}
              </p>
            </div>

            {/* Stat 3 - Light Blue */}
            <div className="hidden sm:block p-3.5 sm:p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-sky-500/40 hover:border-sky-400 transition-all hover:scale-[1.02] shadow-3d-blue/20">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                <span className="text-xs text-sky-200">Campus AI Assistant</span>
              </div>
              <p className="text-xl sm:text-2xl font-extrabold mt-1 text-white tracking-tight">
                24/7 Connected
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="p-3 rounded-full bg-black/75 hover:bg-red-600 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="p-3 rounded-full bg-black/75 hover:bg-red-600 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-8 bg-red-500 shadow-glow-red'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 100% Width Quick Service Pills Bar beneath Hero */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 w-full">
        {/* Pill 1: Red Accent */}
        <Card3D glowColor="red" intensity={10}>
          <Link
            to="/departments"
            className="p-4 flex items-center gap-3 transition-all h-full"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60 flex items-center justify-center font-extrabold text-sm shadow-sm">
              01
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">10 Departments</h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">ISE, CSE, ECE, AI&ML, Mech...</p>
            </div>
          </Link>
        </Card3D>

        {/* Pill 2: Light Green Accent */}
        <Card3D glowColor="green" intensity={10}>
          <Link
            to="/placements"
            className="p-4 flex items-center gap-3 transition-all h-full"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-center font-extrabold text-sm shadow-sm">
              02
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Placement Hub</h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">150+ Top Recruiters</p>
            </div>
          </Link>
        </Card3D>

        {/* Pill 3: Light Blue Accent */}
        <Card3D glowColor="blue" intensity={10}>
          <Link
            to="/campus-map"
            className="p-4 flex items-center gap-3 transition-all h-full"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-900/60 flex items-center justify-center font-extrabold text-sm shadow-sm">
              03
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">93-Acre Map</h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">Vidyanagar Campus GPS</p>
            </div>
          </Link>
        </Card3D>

        {/* Pill 4: White/Black with Red accent */}
        <Card3D glowColor="red" intensity={10}>
          <Link
            to="/ai-assistant"
            className="p-4 flex items-center gap-3 transition-all h-full"
          >
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-extrabold text-sm shadow-3d-red">
              04
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">BEC AI Assistant</h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">24/7 Policy & Exam Desk</p>
            </div>
          </Link>
        </Card3D>
      </div>
    </section>
  );
};
