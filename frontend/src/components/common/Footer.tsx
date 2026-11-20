import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Heart, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white">EduNexus</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              "Your Campus, Connected." The comprehensive next-generation university ecosystem uniting
              academics, smart attendance, placement funnels, student clubs, and campus intelligence.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-brand-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                NAAC A++ Grade • NBA Accredited
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Academics</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/departments/ISE" className="hover:text-white transition-colors">Information Science</Link></li>
              <li><Link to="/departments/CSE" className="hover:text-white transition-colors">Computer Science</Link></li>
              <li><Link to="/departments/ECE" className="hover:text-white transition-colors">Electronics & Comm.</Link></li>
              <li><Link to="/departments/ME" className="hover:text-white transition-colors">Mechanical Engg.</Link></li>
              <li><Link to="/departments/CV" className="hover:text-white transition-colors">Civil Engineering</Link></li>
            </ul>
          </div>

          {/* Student Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Campus Portals</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/login" className="hover:text-white transition-colors">Student Login</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Faculty Portal</Link></li>
              <li><Link to="/placements" className="hover:text-white transition-colors">Placement Cell</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">Hackathons & Fests</Link></li>
              <li><Link to="/campus-map" className="hover:text-white transition-colors">Interactive Campus Map</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Helplines</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>Knowledge City, Outer Ring Road, Bengaluru 560103</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 80 2844 1100</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>info@edunexus.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} EduNexus Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/about" className="hover:text-slate-300">Terms of Service</Link>
            <Link to="/emergency" className="text-rose-400 hover:text-rose-300 font-semibold">Campus SOS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
