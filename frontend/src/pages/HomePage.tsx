import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  Building2,
  Briefcase,
  Trophy,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Quote,
  Box,
  Zap,
  Award,
} from 'lucide-react';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card3D } from '../components/3d/Card3D';
import { ThreeDCube } from '../components/3d/ThreeDCube';

export const HomePage: React.FC = () => {
  const stats = [
    { label: 'Estd. Year', value: '1963', icon: Calendar, color: 'text-red-500', glow: 'red' as const },
    { label: 'Lush Green Campus', value: '93 Acres', icon: Building2, color: 'text-sky-400', glow: 'blue' as const },
    { label: 'Academic Programs', value: '10 Branches', icon: GraduationCap, color: 'text-emerald-400', glow: 'green' as const },
    { label: 'Recruitment Partners', value: '150+', icon: Briefcase, color: 'text-red-500', glow: 'red' as const },
    { label: 'NAAC Accreditation', value: "'A' Grade", icon: Award, color: 'text-sky-400', glow: 'blue' as const },
    { label: 'Annual Campus Events', value: '200+', icon: Trophy, color: 'text-emerald-400', glow: 'green' as const },
  ];

  const departments = [
    {
      code: 'CSE',
      name: 'Computer Science & Engineering',
      desc: 'High performance computing, AI systems, algorithms, cybersecurity, and cloud laboratories.',
      icon: '⚡',
      stat: '98.4% Placed',
      glow: 'blue' as const,
      color: 'border-sky-400/40',
    },
    {
      code: 'ISE',
      name: 'Information Science & Engineering',
      desc: 'Pioneering cutting-edge cloud architectures, AI, Big Data, and distributed software engineering.',
      icon: '💻',
      stat: '98.0% Placed',
      glow: 'red' as const,
      color: 'border-red-400/40',
    },
    {
      code: 'AIML',
      name: 'Artificial Intelligence & Machine Learning',
      desc: 'Deep learning, autonomous systems, NLP, computer vision, and cognitive computing research.',
      icon: '🧠',
      stat: 'New Cohort',
      glow: 'green' as const,
      color: 'border-emerald-400/40',
    },
    {
      code: 'ECE',
      name: 'Electronics & Communication',
      desc: 'Innovating silicon VLSI design, wireless 5G communications, microelectronics, and embedded robotics.',
      icon: '📡',
      stat: '94.2% Placed',
      glow: 'green' as const,
      color: 'border-emerald-400/40',
    },
    {
      code: 'EEE',
      name: 'Electrical & Electronics',
      desc: 'Clean renewable smart grids, high-voltage transmission, EV powertrains, and power electronics.',
      icon: '🔋',
      stat: '92.4% Placed',
      glow: 'red' as const,
      color: 'border-red-400/40',
    },
    {
      code: 'ME',
      name: 'Mechanical Engineering',
      desc: 'Robotics, advanced thermal simulations, additive 3D manufacturing, and precision CAD/CAM.',
      icon: '⚙️',
      stat: '91.0% Placed',
      glow: 'blue' as const,
      color: 'border-sky-400/40',
    },
    {
      code: 'CV',
      name: 'Civil Engineering',
      desc: 'Green sustainable infrastructure, earthquake-resistant design, GIS modeling, and smart cities.',
      icon: '🏗️',
      stat: '89.5% Placed',
      glow: 'blue' as const,
      color: 'border-sky-400/40',
    },
    {
      code: 'BT',
      name: 'Biotechnology',
      desc: 'Bioinformatics, bioprocess engineering, molecular genetics, and environmental remediation.',
      icon: '🧬',
      stat: '91.8% Placed',
      glow: 'green' as const,
      color: 'border-emerald-400/40',
    },
  ];

  const highlights = [
    {
      title: 'Google Cloud Drive',
      pkg: '₹44.0 LPA',
      role: 'Cloud Software Engineer',
      tag: 'Tier 1 Recruiter',
      glow: 'blue' as const,
    },
    {
      title: 'Microsoft SDE-1',
      pkg: '₹48.0 LPA',
      role: 'Software Development Engineer',
      tag: 'Super Dream Offer',
      glow: 'red' as const,
    },
    {
      title: 'Amazon AWS SDE',
      pkg: '₹38.0 LPA',
      role: 'Cloud Infrastructure Engineer',
      tag: 'Dream Offer',
      glow: 'green' as const,
    },
    {
      title: 'Cisco Systems',
      pkg: '₹22.5 LPA',
      role: 'Core Network Engineer',
      tag: 'Campus Star',
      glow: 'blue' as const,
    },
  ];

  const testimonials = [
    {
      name: 'Priyanka Sundaram',
      role: 'Senior Software Engineer, Google Cloud (Alumna, ISE 2022)',
      text: 'Basaveshwar Engineering College gave me the research freedom, TEQIP lab infrastructure, and mentorship to publish research and crack Google campus interviews seamlessly.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
      glow: 'blue' as const,
    },
    {
      name: 'Rahul Sharma',
      role: 'Final Year Student & SIH Winner (USN: 1EN21IS045)',
      text: 'The unified EduNexus student dashboard, automated attendance warnings, and integrated AI assistant make campus life at BEC Bagalkote smooth and effortless.',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
      glow: 'red' as const,
    },
  ];

  return (
    <div className="w-full space-y-16 lg:space-y-24 pb-16">
      {/* 1. Hero Carousel - 100% Width with New College Photo */}
      <HeroCarousel />

      {/* 2. Campus Statistics Grid - 100% Fluid Width */}
      <section className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Card3D
                key={idx}
                glowColor={s.glow}
                intensity={12}
                className="p-5 text-center flex flex-col items-center justify-center bg-white dark:bg-black border border-slate-200 dark:border-zinc-800"
              >
                <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 ${s.color} mb-3 shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {s.value}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 font-semibold">{s.label}</p>
              </Card3D>
            );
          })}
        </div>
      </section>

      {/* 3. About EduNexus Highlight Section with New High-Res College Photo */}
      <section className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-xs font-bold text-red-600 dark:text-red-400">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-red-500" />
              <span>B.V.V. Sangha’s Basaveshwar Engineering College • Bagalkote</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
              A Unified Intelligent Ecosystem Built for Modern Universities.
            </h2>
            <p className="text-slate-600 dark:text-zinc-300 leading-relaxed text-base">
              Founded in 1963 under B.V.V. Sangha, Basaveshwar Engineering College is a Government-Aided Autonomous
              institution permanently affiliated to VTU Belagavi, accredited by NAAC with 'A' Grade (2024–2029), and supported
              by the World Bank under TEQIP. EduNexus brings students, distinguished faculty, heads of departments,
              and corporate recruiters into one synchronized smart campus platform.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Smart Attendance tracking with predictive 75% shortage calculators',
                'CET Codes: E031 (Aided), E049 (Unaided) • COMEDK Code: E024',
                'Incubation and entrepreneurship support via BEC-STEP and NewGen IEDC',
                'Complete placement pipeline with 150+ global recruiters and alumni mentorship',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700 dark:text-zinc-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/about">
                <Button variant="primary">Learn More About BEC Campus</Button>
              </Link>
              <Link to="/ai-assistant">
                <Button variant="lightblue">Try BEC AI Assistant</Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <Card3D glowColor="blue" intensity={10}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800">
                <img
                  src="/college-campus.jpg"
                  alt="Basaveshwar Engineering College Main Campus"
                  className="w-full h-[450px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 dark:bg-black/90 backdrop-blur-md border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm">Basaveshwar Engineering College, Bagalkote</h4>
                      <p className="text-xs text-slate-500 dark:text-zinc-400">Government Aided Autonomous Institute • Estd. 1963</p>
                    </div>
                    <Badge variant="success">NAAC 'A' Grade</Badge>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* 4. Interactive 3D Hologram Cube & Innovation Showcase */}
      <section className="w-full px-4 sm:px-8 lg:px-12">
        <div className="rounded-3xl bg-black border border-zinc-800 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl w-full">
          {/* Neon Glow Orbs in background */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-sky-600/20 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 w-full">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-xs font-bold text-sky-300">
                <Box className="w-3.5 h-3.5 text-sky-400" />
                <span>BEC Campus Technology Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Immersive 3D Spatial Campus Experience.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                EduNexus integrates modern spatial computing patterns with GPU-accelerated 3D shaders,
                interactive perspective projection, and live campus data streaming. Explore BEC Bagalkote
                laboratories, hostel complexes, and placement drives in real-time.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="p-3 rounded-xl bg-white/5 border border-red-500/30">
                  <span className="text-xs text-red-400 font-bold block">Red Facet</span>
                  <p className="text-sm font-extrabold text-white">Academics</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-sky-500/30">
                  <span className="text-xs text-sky-400 font-bold block">Blue Facet</span>
                  <p className="text-sm font-extrabold text-white">AI Innovation</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-emerald-500/30">
                  <span className="text-xs text-emerald-400 font-bold block">Green Facet</span>
                  <p className="text-sm font-extrabold text-white">Placements</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <ThreeDCube size={190} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Departments Grid with 3D Tilt Cards - 100% Width */}
      <section className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <Badge variant="blue">Academic Departments</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
              Our Academic Departments
            </h2>
            <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1">
              Accredited degree programs with industry-aligned curricula and cutting-edge research labs at BEC Bagalkote.
            </p>
          </div>
          <Link to="/departments">
            <Button variant="outline" size="sm" className="group">
              View All Departments
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {departments.map((dept) => (
            <Card3D key={dept.code} glowColor={dept.glow} intensity={14}>
              <div className="p-6 flex flex-col justify-between h-full bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{dept.icon}</span>
                    <Badge variant={dept.glow === 'red' ? 'primary' : dept.glow === 'blue' ? 'info' : 'success'}>
                      {dept.stat}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {dept.desc}
                  </p>
                </div>
                <Link to={`/departments/${dept.code}`}>
                  <Button variant="ghost" size="sm" className="w-full justify-between text-red-600 dark:text-sky-400 hover:text-red-700">
                    <span>Explore Curriculum</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* 6. Placement Highlights with 3D Depth - 100% Width */}
      <section className="w-full px-4 sm:px-8 lg:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-black text-white shadow-2xl relative overflow-hidden border border-zinc-800 w-full">
          <div className="relative z-10 max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-xs font-bold text-red-300">
              <Zap className="w-3.5 h-3.5 text-red-400" />
              <span>BEC Placement Season 2025-26</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
              Leading the Industry with Unmatched Placements.
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Over 150 recruiters visit our Bagalkote campus every year, offering lucrative packages and global
              internship opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 w-full">
            {highlights.map((h, i) => (
              <Card3D key={i} glowColor={h.glow} intensity={12}>
                <div className="p-5 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
                      {h.tag}
                    </span>
                    <h3 className="text-lg font-extrabold mt-1 text-white">{h.title}</h3>
                    <p className="text-xs text-zinc-400 mt-1">{h.role}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-baseline justify-between">
                    <span className="text-xs text-zinc-500">Package</span>
                    <span className="text-lg font-black text-emerald-400">{h.pkg}</span>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link to="/placements">
              <Button size="lg" variant="primary">
                View Comprehensive Placement Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Testimonials - 100% Width */}
      <section className="w-full px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <Badge variant="blue">Student & Alumni Voices</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
            Loved by Students & Industry Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {testimonials.map((t, idx) => (
            <Card3D key={idx} glowColor={t.glow} intensity={12}>
              <div className="p-8 bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full flex flex-col justify-between">
                <div>
                  <Quote className="w-10 h-10 text-red-400 mb-4" />
                  <p className="text-base text-slate-700 dark:text-zinc-300 italic mb-6 leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-500 shadow-3d-red"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* 8. Call To Action Section - 100% Width */}
      <section className="w-full px-4 sm:px-8 lg:px-12">
        <div className="w-full rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-sky-600 p-8 sm:p-14 text-white text-center shadow-3d-red relative overflow-hidden border border-white/20">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Experience EduNexus at BEC Bagalkote?
            </h2>
            <p className="text-white/90 text-sm sm:text-base">
              Step into the smart university era. Access schedules, check grades, ask the AI assistant,
              and apply for dream placements with one unified credential at Basaveshwar Engineering College.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-md">
                  Register Student Account
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white/10"
                >
                  Explore Demo Portals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
