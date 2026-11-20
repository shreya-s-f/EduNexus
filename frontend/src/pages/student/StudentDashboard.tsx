import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  TrendingUp,
  FileText,
  Briefcase,
  Calendar,
  Clock,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Trophy,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/students/dashboard');
        setDashboardData(res.data.data);
      } catch (err) {
        console.error('Failed to load student dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const performanceHistory = [
    { semester: 'Sem 1', sgpa: 8.4 },
    { semester: 'Sem 2', sgpa: 8.55 },
    { semester: 'Sem 3', sgpa: 8.7 },
    { semester: 'Sem 4', sgpa: 8.65 },
    { semester: 'Sem 5', sgpa: 8.85 },
  ];

  const attendanceBreakdown = [
    { subject: 'DBMS', percentage: 87.5 },
    { subject: 'AI/ML', percentage: 86.6 },
    { subject: 'Networks', percentage: 83.3 },
    { subject: 'Automata', percentage: 68.4 }, // below 75!
    { subject: 'Software Arch.', percentage: 91.6 },
  ];

  const stats = dashboardData?.stats || {
    attendance: '87%',
    attendanceNumeric: 87.5,
    cgpa: '8.7',
    assignments: '8/10',
    certificates: '12',
    projects: '5',
    hackathons: '3',
    credits: 114,
  };

  const student = dashboardData?.student || {
    name: user?.name || 'Rahul Sharma',
    usn: user?.usn || '1EN21IS045',
    department: 'Information Science & Engineering',
    semester: 6,
    section: 'A',
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <Badge variant="primary" className="bg-white/20 text-white border-transparent">
              Semester {student.semester} • Section {student.section}
            </Badge>
            <span className="text-xs text-white/80 font-mono">USN: {student.usn}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome Back, {student.name}!
          </h1>
          <p className="text-xs sm:text-sm text-brand-100 max-w-xl">
            Department of {student.department}. Continuous Internal Evaluation (CIE-II) scheduled for March 16.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <Link to="/ai-assistant">
            <Button
              size="sm"
              className="bg-white text-brand-700 hover:bg-brand-50 shadow-md font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-purple-600" />
              Ask Campus AI
            </Button>
          </Link>
          <Link to="/timetable">
            <Button
              size="sm"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              View Schedule
            </Button>
          </Link>
        </div>
      </div>

      {/* Attendance Shortage Smart Warning if applicable */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            <strong>Smart Attendance Warning:</strong> Your Automata Theory & Computability (21IS54) attendance is currently <strong>68.4%</strong> (Below 75%). You need <strong>4 consecutive classes</strong> to reach eligibility.
          </span>
        </div>
        <Link to="/student/attendance" className="font-bold text-amber-900 dark:text-amber-100 hover:underline shrink-0">
          Open Attendance Predictor →
        </Link>
      </div>

      {/* 6 Key Stat Cards Required in Prompt */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Attendance */}
        <Card className="p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-2 font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {stats.attendance}
          </h3>
          <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Attendance</p>
        </Card>

        {/* CGPA */}
        <Card className="p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center mx-auto mb-2 font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {stats.cgpa}
          </h3>
          <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Cumulative CGPA</p>
        </Card>

        {/* Assignments */}
        <Card className="p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center mx-auto mb-2 font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {stats.assignments}
          </h3>
          <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Assignments</p>
        </Card>

        {/* Certificates */}
        <Card className="p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto mb-2 font-bold">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {stats.certificates}
          </h3>
          <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Certificates</p>
        </Card>

        {/* Projects */}
        <Card className="p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center mx-auto mb-2 font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {stats.projects}
          </h3>
          <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Projects Built</p>
        </Card>

        {/* Hackathons */}
        <Card className="p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto mb-2 font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {stats.hackathons}
          </h3>
          <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Hackathons Won</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Academic Progress Chart */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Academic Performance (SGPA)
              </h3>
              <p className="text-xs text-slate-500">Semester-wise grade trajectory</p>
            </div>
            <Badge variant="success">Consistent 8.7+ Avg</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceHistory}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="semester" stroke="#94a3b8" fontSize={12} />
                <YAxis domain={[7.0, 10.0]} stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    color: '#fff',
                    borderRadius: '0.75rem',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sgpa"
                  stroke="#026fc3"
                  strokeWidth={3}
                  dot={{ fill: '#026fc3', r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Attendance by Subject Chart */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Attendance by Subject
              </h3>
              <p className="text-xs text-slate-500">Minimum mandatory threshold is 75%</p>
            </div>
            <Link to="/student/attendance" className="text-xs text-brand-600 hover:underline">
              Detailed Breakdown →
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceBreakdown}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    color: '#fff',
                    borderRadius: '0.75rem',
                  }}
                />
                <Bar dataKey="percentage" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Schedule & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <Card className="p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-500" />
              <span>Today's Class Schedule</span>
            </h3>
            <Link to="/timetable" className="text-xs text-brand-600 hover:underline">
              Full Timetable
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { time: '09:00 - 10:00 AM', subject: 'Database Management Systems (21IS51)', room: 'LH-201', faculty: 'Dr. K. S. Venkatesh', type: 'Lecture' },
              { time: '10:00 - 11:00 AM', subject: 'Artificial Intelligence & ML (21IS52)', room: 'LH-201', faculty: 'Prof. Ananya Rao', type: 'Lecture' },
              { time: '11:15 - 01:15 PM', subject: 'DBMS & Network Laboratory (21ISL56)', room: 'Lab 3', faculty: 'Dr. K. S. Venkatesh', type: 'Lab' },
              { time: '02:00 - 03:00 PM', subject: 'Computer Networks (21IS53)', room: 'LH-201', faculty: 'Dr. R. Ramanathan', type: 'Lecture' },
            ].map((slot, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{slot.subject}</span>
                  <p className="text-slate-500">{slot.faculty} • {slot.room}</p>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-brand-600 dark:text-brand-400">{slot.time}</span>
                  <Badge variant="neutral" size="sm" className="block mt-1">
                    {slot.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions Panel */}
        <Card className="p-6 space-y-3">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/student/attendance" className="block">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                📊 Check Attendance & Predictions
              </Button>
            </Link>
            <Link to="/timetable" className="block">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                🗓️ View Weekly Timetable
              </Button>
            </Link>
            <Link to="/exams" className="block">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                📑 View Exam Hall Tickets & Grades
              </Button>
            </Link>
            <Link to="/placements" className="block">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                💼 Browse Placement Opportunities
              </Button>
            </Link>
            <Link to="/complaints" className="block">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                ⚠️ Submit Campus Grievance
              </Button>
            </Link>
            <Link to="/ai-assistant" className="block">
              <Button size="sm" className="w-full justify-start text-xs bg-purple-600 hover:bg-purple-700">
                ✨ Ask EduNexus AI Assistant
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
