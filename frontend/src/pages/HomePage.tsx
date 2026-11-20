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
  BookOpen,
  Sparkles,
  Shield,
  Star,
  Quote,
} from 'lucide-react';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const HomePage: React.FC = () => {
  const stats = [
    { label: 'Enrolled Students', value: '12,480+', icon: Users, color: 'text-brand-500' },
    { label: 'Distinguished Faculty', value: '640+', icon: GraduationCap, color: 'text-indigo-500' },
    { label: 'Engineering Departments', value: '6 Majors', icon: Building2, color: 'text-purple-500' },
    { label: 'Recruitment Partners', value: '150+', icon: Briefcase, color: 'text-emerald-500' },
    { label: 'Student Clubs & Guilds', value: '40+', icon: Trophy, color: 'text-amber-500' },
    { label: 'Annual Campus Events', value: '200+', icon: Calendar, color: 'text-rose-500' },
  ];

  const departments = [
    {
      code: 'ISE',
      name: 'Information Science & Engineering',
      desc: 'Pioneering cutting-edge cloud architectures, AI, and distributed software engineering.',
      icon: '💻',
      stat: '98.4% Placed',
    },
    {
      code: 'CSE',
      name: 'Computer Science & Engineering',
      desc: 'Mastery in core computing algorithms, cybersecurity, machine learning, and systems.',
      icon: '⚡',
      stat: '97.8% Placed',
    },
    {
      code: 'ECE',
      name: 'Electronics & Communication',
      desc: 'Innovating silicon VLSI design, wireless 5G communications, and embedded robotics.',
      icon: '📡',
      stat: '94.2% Placed',
    },
    {
      code: 'ME',
      name: 'Mechanical Engineering',
      desc: 'Robotics, EV powertrains, additive manufacturing, and advanced thermal simulation.',
      icon: '⚙️',
      stat: '91.0% Placed',
    },
    {
      code: 'CV',
      name: 'Civil Engineering',
      desc: 'Sustainable green infrastructure, earthquake-resistant design, and smart city modeling.',
      icon: '🏗️',
      stat: '89.5% Placed',
    },
    {
      code: 'EEE',
      name: 'Electrical & Electronics',
      desc: 'Clean renewable grids, battery storage engineering, and high-efficiency power electronics.',
      icon: '🔋',
      stat: '92.4% Placed',
    },
  ];

  const highlights = [
    {
      title: 'Google Cloud Drive',
      pkg: '₹44.0 LPA',
      role: 'Cloud Software Engineer',
      tag: 'Tier 1 Recruiter',
    },
    {
      title: 'Microsoft SDE-1',
      pkg: '₹48.0 LPA',
      role: 'Software Development Engineer',
      tag: 'Super Dream Offer',
    },
    {
      title: 'Amazon AWS SDE',
      pkg: '₹38.0 LPA',
      role: 'Cloud Infrastructure Engineer',
      tag: 'Dream Offer',
    },
    {
      title: 'Cisco Systems',
      pkg: '₹22.5 LPA',
      role: 'Core Network Engineer',
      tag: 'Campus Star',
    },
  ];

  const testimonials = [
    {
      name: 'Priyanka Sundaram',
      role: 'Senior Software Engineer, Google Cloud (Alumna, ISE 2022)',
      text: 'EduNexus provided me with the research freedom, mentorship, and cloud labs to publish research and crack Google campus interviews seamlessly.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Rahul Sharma',
      role: 'Final Year Student & SIH Winner (USN: 1EN21IS045)',
      text: 'The unified student dashboard, automated attendance warnings, and integrated AI assistant make university life smooth and effortless.',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. Hero Carousel matching Dribbble inspiration */}
      <HeroCarousel />

      {/* 2. Campus Statistics Grid with Animated Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Card
                key={idx}
                hover
                className="p-5 text-center flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
              >
                <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 ${s.color} mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {s.value}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{s.label}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. About EduNexus Highlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="primary" size="md">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              About EduNexus Platform
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
              A Unified Intelligent Ecosystem Built for Modern Universities.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              EduNexus brings students, distinguished faculty, heads of departments, administrators,
              corporate recruiters, and esteemed alumni into one coherent, synchronized ecosystem.
              From attendance intelligence to automated placement funnels, campus GPS navigation, and
              our 24/7 AI Assistant.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Smart Attendance tracking with predictive shortage calculators',
                'Role-based permission gating for Students, Faculty, HODs, and Admins',
                'Built-in EduNexus AI chatbot trained on institutional knowledge',
                'Complete placement pipeline with interview scheduling and resume scoring',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex gap-4">
              <Link to="/about">
                <Button>Learn More About Campus</Button>
              </Link>
              <Link to="/ai-assistant">
                <Button variant="outline">Try EduNexus AI</Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-slate-200 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
                alt="Students collaborating"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel text-slate-900 dark:text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">Autonomous Engineering Excellence</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-300">NAAC A++ Grade • NBA Accredited</p>
                  </div>
                  <Badge variant="success">98.4% Career Success</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <Badge variant="info">Academic Excellence</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-2">
              Our Academic Departments
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Accredited degree programs with industry-aligned curricula and cutting-edge research labs.
            </p>
          </div>
          <Link to="/departments">
            <Button variant="outline" size="sm" className="group">
              View All Departments
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Card key={dept.code} hover className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{dept.icon}</span>
                  <Badge variant="success">{dept.stat}</Badge>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {dept.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {dept.desc}
                </p>
              </div>
              <Link to={`/departments/${dept.code}`}>
                <Button variant="ghost" size="sm" className="w-full justify-between text-brand-600 dark:text-brand-400">
                  <span>Explore Curriculum & Labs</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. Placement Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-navy-900 to-indigo-950 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mb-8">
            <Badge variant="warning" className="bg-amber-400/20 text-amber-300 border-amber-400/30">
              Placement Season 2025-26
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
              Leading the Industry with Unmatched Placements.
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Over 150 recruiters visit our campus every year, offering lucrative packages and global
              internship opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all"
              >
                <div>
                  <span className="text-[11px] font-semibold text-brand-300 uppercase tracking-wider">
                    {h.tag}
                  </span>
                  <h3 className="text-lg font-bold mt-1">{h.title}</h3>
                  <p className="text-xs text-slate-300 mt-1">{h.role}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/15 flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">Package</span>
                  <span className="text-lg font-extrabold text-emerald-400">{h.pkg}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link to="/placements">
              <Button size="lg" className="shadow-lg shadow-brand-500/30">
                View Comprehensive Placement Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <Badge variant="neutral">Student & Alumni Voices</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-2">
            Loved by Students & Industry Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="p-8 relative">
              <Quote className="w-10 h-10 text-brand-200 dark:text-brand-900/60 mb-4" />
              <p className="text-base text-slate-700 dark:text-slate-300 italic mb-6 leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-500"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. Call To Action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-indigo-700 p-8 sm:p-14 text-white text-center shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Experience EduNexus?
            </h2>
            <p className="text-slate-100 text-sm sm:text-base">
              Step into the smart university era. Access schedules, check grades, ask the AI assistant,
              and apply for dream placements with one unified credential.
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
                  className="border-white/40 text-white hover:bg-white/10"
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
