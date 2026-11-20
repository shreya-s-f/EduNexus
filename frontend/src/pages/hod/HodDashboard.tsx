import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Users, GraduationCap, Award, TrendingUp, Building2, BookOpen } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export const HodDashboard: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHod = async () => {
      try {
        const res = await api.get('/hod/dashboard');
        setData(res.data.data);
      } catch (err) {
        console.error('Failed to load HOD dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHod();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading HOD governance portal...</div>;
  }

  const dept = data?.department;
  const stats = data?.stats || {
    totalFaculty: 24,
    totalStudents: 480,
    averageAttendance: '88.4%',
    averageCgpa: '8.42',
    activeLabs: 6,
    placementRate: '94.2%',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-navy-900 p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <Badge variant="primary">HOD Administrative Center</Badge>
          <h1 className="text-3xl font-extrabold">{dept?.name || 'Information Science & Engineering'}</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Head of Department: {user?.name || 'Dr. B. N. Radhika'} • Established {dept?.establishedYear || 2001}
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 text-center">
          <Users className="w-6 h-6 text-brand-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{stats.totalStudents}</h3>
          <p className="text-xs text-slate-500 mt-1">Total Enrolled Students</p>
        </Card>
        <Card className="p-5 text-center">
          <GraduationCap className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{stats.totalFaculty}</h3>
          <p className="text-xs text-slate-500 mt-1">Full-Time Faculty Members</p>
        </Card>
        <Card className="p-5 text-center">
          <Award className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{stats.averageAttendance}</h3>
          <p className="text-xs text-slate-500 mt-1">Average Dept Attendance</p>
        </Card>
        <Card className="p-5 text-center">
          <TrendingUp className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{stats.placementRate}</h3>
          <p className="text-xs text-slate-500 mt-1">Placement Conversion Rate</p>
        </Card>
      </div>

      {/* Faculty Team Roster */}
      <Card className="p-6 space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Department Faculty Members</h3>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {[
            { name: 'Dr. B. N. Radhika', designation: 'Professor & HOD', spec: 'AI, Natural Language Processing', exp: '22 Years' },
            { name: 'Dr. K. S. Venkatesh', designation: 'Associate Professor', spec: 'Distributed DBMS, Cloud Systems', exp: '14 Years' },
            { name: 'Dr. R. Ramanathan', designation: 'Professor', spec: 'Computer Networks, Cryptography', exp: '18 Years' },
            { name: 'Prof. Sneha Deshmukh', designation: 'Assistant Professor', spec: 'Automata & Theoretical Computing', exp: '8 Years' },
            { name: 'Prof. Vikram Malhotra', designation: 'Assistant Professor', spec: 'Software Architecture, DevOps', exp: '10 Years' },
          ].map((f, i) => (
            <div key={i} className="py-3.5 flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{f.name}</h4>
                <p className="text-slate-500">{f.designation} • {f.spec}</p>
              </div>
              <Badge variant="neutral">{f.exp} Exp</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
