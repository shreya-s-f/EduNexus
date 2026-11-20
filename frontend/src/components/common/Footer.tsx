import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-slate-300 border-t border-zinc-800 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 flex items-center justify-center text-white shadow-3d-red">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white flex items-center gap-1.5">
                EduNexus • BEC
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              <strong>Basaveshwar Engineering College (Autonomous), Bagalkote</strong><br />
              A premier B.V.V. Sangha institution established in 1963, permanently affiliated to VTU Belagavi,
              accredited by NAAC with 'A' Grade (2024–2029) across a 93-acre campus.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 border border-emerald-500/40 text-xs text-emerald-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                NAAC 'A' Grade (2024–2029) • NBA • TEQIP
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Academic Branches</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/departments/CSE" className="hover:text-sky-400 transition-colors">Computer Science (CSE)</Link></li>
              <li><Link to="/departments/ISE" className="hover:text-sky-400 transition-colors">Information Science (ISE)</Link></li>
              <li><Link to="/departments/ECE" className="hover:text-sky-400 transition-colors">Electronics & Comm. (ECE)</Link></li>
              <li><Link to="/departments/EEE" className="hover:text-sky-400 transition-colors">Electrical & Electronics (EEE)</Link></li>
              <li><Link to="/departments/ME" className="hover:text-sky-400 transition-colors">Mechanical Engg. (ME)</Link></li>
              <li><Link to="/departments/CV" className="hover:text-sky-400 transition-colors">Civil Engineering (CV)</Link></li>
            </ul>
          </div>

          {/* Student Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Campus Portals</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/login" className="hover:text-red-400 transition-colors">Student Portal Login</Link></li>
              <li><Link to="/login" className="hover:text-red-400 transition-colors">Faculty Portal</Link></li>
              <li><Link to="/placements" className="hover:text-emerald-400 transition-colors">Placement & Internship Cell</Link></li>
              <li><Link to="/events" className="hover:text-sky-400 transition-colors">CIRCUTECH & Fests</Link></li>
              <li><Link to="/campus-map" className="hover:text-sky-400 transition-colors">Interactive 93-Acre Map</Link></li>
            </ul>
          </div>

          {/* Contact Details from becbgk.edu */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Official Helplines</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>S. Nijalingappa Vidyanagar, Bagalkote - 587 102, Karnataka, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91-76187-81963 / 08354-234060</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>becprincipal@yahoo.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} B.V.V. Sangha's Basaveshwar Engineering College. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-zinc-300">CET: E031 / E049</Link>
            <Link to="/about" className="hover:text-zinc-300">COMEDK: E024</Link>
            <Link to="/emergency" className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              Campus SOS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
