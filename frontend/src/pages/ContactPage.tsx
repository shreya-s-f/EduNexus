import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'General Admissions',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('error', 'Incomplete Form', 'Please fill in all mandatory fields.');
      return;
    }
    setSubmitted(true);
    addToast('success', 'Inquiry Sent', 'Your query has been routed to the Admissions Office.');
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="primary">Get In Touch</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Connect With EduNexus Campus
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          Have queries regarding admissions, programs, campus tours, or collaborations? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <Card className="p-6 space-y-3">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Campus Address</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  B.V.V. Sangha's Basaveshwar Engineering College (Autonomous),<br />
                  S. Nijalingappa Vidyanagar, Bagalkote - 587 102, Karnataka, India.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="primary" size="sm">CET: E031 / E049</Badge>
                  <Badge variant="blue" size="sm">COMEDK: E024</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Telephone Helplines</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Helpline Mobile: +91-76187-81963
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Principal Office: 08354-234060 / 234204
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Official Email Desks</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Principal Email: becprincipal@yahoo.com
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Institutional Desk: principal@becbgk.edu
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-8">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Inquiry Received!</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Thank you for contacting EduNexus. Our admissions counsellor will reach out within 24 working hours.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                Submit Another Inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Send an Inquiry</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ananya Rao"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ananya@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Department / Subject of Interest
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  <option>General Admissions</option>
                  <option>Information Science & Engineering</option>
                  <option>Computer Science & Engineering</option>
                  <option>Electronics & Communication</option>
                  <option>Mechanical Engineering</option>
                  <option>Civil Engineering</option>
                  <option>Electrical & Electronics</option>
                  <option>Campus Hostel / Transport Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message / Inquiry *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you are looking for..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send className="w-4 h-4" />
                <span>Submit Campus Inquiry</span>
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
