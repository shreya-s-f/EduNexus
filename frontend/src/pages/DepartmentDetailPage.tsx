import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ArrowLeft, Mail, Phone, Award, FlaskConical, BookOpen, CheckCircle } from 'lucide-react';
import api from '../services/api';
import { DepartmentItem } from '../types';

export const DepartmentDetailPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [department, setDepartment] = useState<DepartmentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/departments/${code}`);
        setDepartment(res.data.data);
      } catch (err) {
        console.error('Failed to load department detail', err);
      } finally {
        setLoading(false);
      }
    };
    if (code) fetchDetail();
  }, [code]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-slate-500">Loading department information...</p>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Department Not Found</h2>
        <Link to="/departments" className="mt-4 inline-block text-brand-500">
          Return to Departments
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Link to="/departments">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Departments</span>
        </Button>
      </Link>

      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-card h-80">
        <img
          src={department.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1600'}
          alt={department.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent flex items-end p-8 sm:p-12">
          <div className="text-white space-y-2">
            <span className="px-3 py-1 rounded-full bg-brand-500 text-xs font-bold uppercase tracking-wider">
              {department.code} Department
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold">{department.name}</h1>
            <p className="text-sm text-slate-300 max-w-2xl">{department.description}</p>
          </div>
        </div>
      </div>

      {/* Grid Overview & HOD Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-500" />
              <span>Vision & Mission</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "{department.vision}"
            </p>
            <div className="space-y-2 pt-2">
              {department.mission?.map((m, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Laboratories & Centers */}
          <Card className="p-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-indigo-500" />
              <span>Research Laboratories & Compute Facilities</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {department.labs?.map((lab, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{lab.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{lab.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {lab.equipment?.map((eq, j) => (
                      <span key={j} className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-medium">
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* HOD & Quick Contacts sidebar */}
        <div className="space-y-6">
          <Card className="p-6 text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-brand-500 shadow-md">
              <img
                src={department.hodPhoto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'}
                alt={department.hodName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">{department.hodName}</h4>
              <p className="text-xs text-slate-500 font-medium">Professor & Head of Department</p>
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800 text-left">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{department.hodEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{department.contactPhone}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Department Accolades</span>
            </h4>
            <div className="space-y-2">
              {department.achievements?.map((ach, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200">
                  {ach}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
