import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  Users,
  GraduationCap,
  Building2,
  Calendar,
  Briefcase,
  AlertCircle,
  Trophy,
  BookOpen,
  TrendingUp,
} from 'lucide-react';
import api from '../../services/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data.data);
      } catch (err) {
        console.error('Failed to load admin stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const metrics = stats?.metrics || {
    students: 12480,
    faculty: 640,
    departments: 6,
    events: 8,
    placementDrives: 14,
    internships: 10,
    complaints: 12,
    clubs: 8,
  };

  const studentsByDept = stats?.charts?.studentsByDepartment || [
    { department: 'ISE', students: 480 },
    { department: 'CSE', students: 720 },
    { department: 'ECE', students: 480 },
    { department: 'ME', students: 360 },
    { department: 'CV', students: 300 },
    { department: 'EEE', students: 320 },
  ];

  const complaintStatusData = [
    { name: 'Resolved', value: 48, color: '#10b981' },
    { name: 'In Progress', value: 14, color: '#3b82f6' },
    { name: 'Assigned', value: 6, color: '#f59e0b' },
    { name: 'Submitted', value: 4, color: '#ef4444' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-navy-900 p-8 text-white shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <Badge variant="primary">Campus Superuser Control Center</Badge>
          <h1 className="text-3xl font-extrabold">Executive University Administration</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time telemetry across academic enrollment, faculty operations, placements, and campus facilities.
          </p>
        </div>

        <div className="flex gap-2">
          <Badge variant="success">All Systems Operational</Badge>
        </div>
      </div>

      {/* 8 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 text-center">
          <Users className="w-6 h-6 text-brand-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{metrics.students}</h3>
          <p className="text-xs text-slate-500 mt-1">Total Students</p>
        </Card>
        <Card className="p-5 text-center">
          <GraduationCap className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{metrics.faculty}</h3>
          <p className="text-xs text-slate-500 mt-1">Faculty Members</p>
        </Card>
        <Card className="p-5 text-center">
          <Building2 className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{metrics.departments}</h3>
          <p className="text-xs text-slate-500 mt-1">Departments</p>
        </Card>
        <Card className="p-5 text-center">
          <Briefcase className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{metrics.placementDrives}</h3>
          <p className="text-xs text-slate-500 mt-1">Active Placement Drives</p>
        </Card>
        <Card className="p-5 text-center">
          <Calendar className="w-6 h-6 text-amber-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{metrics.events}</h3>
          <p className="text-xs text-slate-500 mt-1">Upcoming Events</p>
        </Card>
        <Card className="p-5 text-center">
          <Trophy className="w-6 h-6 text-rose-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{metrics.clubs}</h3>
          <p className="text-xs text-slate-500 mt-1">Student Clubs</p>
        </Card>
        <Card className="p-5 text-center">
          <AlertCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{metrics.complaints}</h3>
          <p className="text-xs text-slate-500 mt-1">Open Grievances</p>
        </Card>
        <Card className="p-5 text-center">
          <BookOpen className="w-6 h-6 text-cyan-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">60,000+</h3>
          <p className="text-xs text-slate-500 mt-1">Library Catalog</p>
        </Card>
      </div>

      {/* Admin Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Student Enrollment by Engineering Department
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentsByDept}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="department" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    color: '#fff',
                    borderRadius: '0.75rem',
                  }}
                />
                <Bar dataKey="students" fill="#026fc3" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Campus Grievance Resolution Health
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complaintStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {complaintStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    color: '#fff',
                    borderRadius: '0.75rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs">
            {complaintStatusData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span>{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
