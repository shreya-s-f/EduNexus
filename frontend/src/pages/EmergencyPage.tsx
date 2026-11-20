import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  AlertTriangle,
  PhoneCall,
  HeartPulse,
  ShieldAlert,
  Flame,
  Shield,
  Phone,
  CheckCircle,
} from 'lucide-react';

export const EmergencyPage: React.FC = () => {
  const [sosActive, setSosActive] = useState(false);

  const contacts = [
    {
      title: 'Campus Emergency Response Desk',
      ext: 'Ext 100 / +91 80 2844 1100',
      icon: ShieldAlert,
      color: 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/60 dark:border-rose-900',
      desc: 'Central security station manned 24 hours. Located at Main Gate 1.',
    },
    {
      title: 'University Ambulance & Trauma Care',
      ext: '+91 80 2844 1108',
      icon: HeartPulse,
      color: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/60 dark:border-red-900',
      desc: 'Dedicated on-campus BLS ambulance with paramedic support.',
    },
    {
      title: 'Women Safety & Anti-Harassment Cell',
      ext: 'Ext 109 / 1800-425-WOMEN',
      icon: Shield,
      color: 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950/60 dark:border-purple-900',
      desc: 'Confidential reporting and immediate counseling assistance.',
    },
    {
      title: 'Anti-Ragging Squad Hotline',
      ext: '1800-180-5522 (Toll Free 24/7)',
      icon: AlertTriangle,
      color: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/60 dark:border-amber-900',
      desc: 'Strict zero-tolerance policy monitored by University Disciplinary Board.',
    },
    {
      title: 'Campus Fire & Hazard Control',
      ext: 'Ext 101',
      icon: Flame,
      color: 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950/60 dark:border-orange-900',
      desc: 'Fire suppression team and evacuation marshals across all blocks.',
    },
    {
      title: 'National Cybercrime Helpline',
      ext: '1930 / cybercrime.gov.in',
      icon: ShieldCheckIcon,
      color: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/60 dark:border-blue-900',
      desc: 'For digital frauds, credential breaches, and cyber safety.',
    },
  ];

  function ShieldCheckIcon(props: any) {
    return <Shield {...props} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs sm:text-sm flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
        <span>
          <strong>Demonstration Note:</strong> All contact numbers displayed below are configurable campus
          intercom extensions and national helpline references for academic platform simulation.
        </span>
      </div>

      {/* Prominent SOS Trigger Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 p-8 sm:p-12 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider">
            Critical Emergency Quick Dial
          </span>
          <h2 className="text-3xl font-extrabold">Instant Campus SOS Response</h2>
          <p className="text-sm text-rose-100 max-w-xl">
            Pressing this button activates a priority alert sent directly to the Campus Security Control Room
            with your current campus zone.
          </p>
        </div>

        <div>
          {sosActive ? (
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-rose-600 font-bold shadow-lg animate-pulse">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
              <span>SOS Alert Dispatched to Main Gate Security!</span>
            </div>
          ) : (
            <button
              onClick={() => setSosActive(true)}
              className="px-8 py-4 rounded-2xl bg-white text-rose-600 hover:bg-rose-50 text-base font-extrabold shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <PhoneCall className="w-5 h-5" />
              <span>TRIGGER CAMPUS SOS</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Emergency Desks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((c, i) => {
          const Icon = c.icon;
          return (
            <Card key={i} className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl border ${c.color} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{c.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{c.desc}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs text-slate-500">Direct Helpline:</span>
                <span className="font-mono text-sm font-bold text-brand-600 dark:text-brand-400">
                  {c.ext}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
