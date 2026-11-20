import React from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ShieldCheck, Award, Target, BookOpen, Compass, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="primary">Campus Heritage & Vision</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Pioneering Future Engineering Since 1998
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          EduNexus Campus is a globally recognized autonomous institution empowering over 12,000 students
          with world-class technical education, interdisciplinary research, and progressive campus life.
        </p>
      </div>

      {/* Campus Hero Image */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600"
          alt="EduNexus University Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-8">
          <div className="text-white space-y-2">
            <span className="px-3 py-1 rounded-full bg-brand-500 text-xs font-bold uppercase">
              120+ Acre Sustainable Green Campus
            </span>
            <h3 className="text-2xl font-bold">Center of Excellence & Technological Research</h3>
          </div>
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Our Vision</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            To emerge as a premier global technological university renowned for high-impact innovation,
            ethical leadership, sustainable problem solving, and shaping graduates who lead transformative
            change in society.
          </p>
        </Card>

        <Card className="p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Our Mission</h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
              <span>Deliver contemporary industry-aligned engineering curricula and hands-on lab training.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
              <span>Foster interdisciplinary collaborative research with top technology enterprises.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
              <span>Promote an inclusive environment that values social responsibility and lifelong learning.</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Key Accreditations */}
      <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Accreditations & Recognitions</h3>
          <p className="text-sm text-slate-500 mt-1">Certified to the highest standards of academic excellence</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 shadow-soft">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <h4 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">NAAC A++</h4>
            <p className="text-xs text-slate-500">Highest CGPA of 3.82 / 4.0</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 shadow-soft">
            <Award className="w-8 h-8 text-brand-500 mx-auto mb-2" />
            <h4 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">NIRF Top 50</h4>
            <p className="text-xs text-slate-500">Ministry of Education, GoI</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 shadow-soft">
            <BookOpen className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h4 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">NBA Accredited</h4>
            <p className="text-xs text-slate-500">All 6 Core Programs</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 shadow-soft">
            <Target className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <h4 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">AICTE Approved</h4>
            <p className="text-xs text-slate-500">Autonomous Status</p>
          </div>
        </div>
      </div>
    </div>
  );
};
