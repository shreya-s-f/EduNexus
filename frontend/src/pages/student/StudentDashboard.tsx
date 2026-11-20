import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  TrendingUp,
  FileText,
  Clock,
  Sparkles,
  AlertTriangle,
  BookOpen,
  Trophy,
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card3D } from '../../components/3d/Card3D';
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
      {/* 3D Welcome Banner with Red & Light Blue Gradient */}
      <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-sky-600 p-6 sm:p-8 text-white shadow-3d-red flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden border border-white/20">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <Badge variant="primary" className="bg-white/25 text-white border-transparent">
              Semester {student.semester} • Section {student.section}
            </Badge>
            <span className="text-xs text-white/90 font-mono">USN: {student.usn}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome Back, {student.name}!
          </h1>
          <p className="text-xs sm:text-sm text-red-100 max-w-xl">
            Department of {student.department}. Continuous Internal Evaluation (CIE-II) scheduled for March 16.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <Link to="/ai-assistant">
            <Button
              size="sm"
              variant="lightblue"
              className="shadow-md font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-white animate-pulse" />
              Ask Campus AI
            </Button>
          </Link>
          <Link to="/timetable">
            <Button
              size="sm"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/10"
            >
              View Schedule
            </Button>
          </Link>
        </div>
      </div>

      {/* Attendance Shortage Smart Warning if applicable */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-black border border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm shadow-sm">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 animate-bounce" />
          <span>
            <strong>Smart Attendance Warning:</strong> Your Automata Theory & Computability (21IS54) attendance is currently <strong>68.4%</strong> (Below 75%). You need <strong>4 consecutive classes</strong> to reach eligibility.
          </span>
        </div>
        <Link to="/student/attendance" className="font-bold text-red-600 dark:text-sky-400 hover:underline shrink-0">
          Open Attendance Predictor →
        </Link>
      </div>

      {/* 6 Key Stat Cards with 3D Perspective Tilt (Card3D) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Attendance - Light Green */}
        <Card3D glowColor="green" intensity={12}>
          <div className="p-5 text-center bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto mb-2 font-bold shadow-2xs">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {stats.attendance}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-semibold mt-0.5">Attendance</p>
          </div>
        </Card3D>

        {/* CGPA - Crimson Red */}
        <Card3D glowColor="red" intensity={12}>
          <div className="p-5 text-center bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center justify-center mx-auto mb-2 font-bold shadow-2xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {stats.cgpa}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-semibold mt-0.5">Cumulative CGPA</p>
          </div>
        </Card3D>

        {/* Assignments - Light Blue */}
        <Card3D glowColor="blue" intensity={12}>
          <div className="p-5 text-center bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 flex items-center justify-center mx-auto mb-2 font-bold shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {stats.assignments}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-semibold mt-0.5">Assignments</p>
          </div>
        </Card3D>

        {/* Certificates - Light Green */}
        <Card3D glowColor="green" intensity={12}>
          <div className="p-5 text-center bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto mb-2 font-bold shadow-2xs">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {stats.certificates}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-semibold mt-0.5">Certificates</p>
          </div>
        </Card3D>

        {/* Projects - Light Blue */}
        <Card3D glowColor="blue" intensity={12}>
          <div className="p-5 text-center bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 flex items-center justify-center mx-auto mb-2 font-bold shadow-2xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {stats.projects}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-semibold mt-0.5">Projects Built</p>
          </div>
        </Card3D>

        {/* Hackathons - Crimson Red */}
        <Card3D glowColor="red" intensity={12}>
          <div className="p-5 text-center bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center justify-center mx-auto mb-2 font-bold shadow-2xs">
              <Sparkles className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {stats.hackathons}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-semibold mt-0.5">Hackathons Won</p>
          </div>
        </Card3D>
      </div>

      {/* 3D Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Academic Progress Chart */}
        <Card3D glowColor="red" intensity={8}>
          <div className="p-6 space-y-4 bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Academic Performance (SGPA)
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">Semester-wise grade trajectory</p>
              </div>
              <Badge variant="success">Consistent 8.7+ Avg</Badge>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="semester" stroke="#71717a" fontSize={12} />
                  <YAxis domain={[7.0, 10.0]} stroke="#71717a" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#000000',
                      borderColor: '#ef4444',
                      color: '#fff',
                      borderRadius: '0.75rem',
                      boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sgpa"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ fill: '#38bdf8', r: 5 }}
                    activeDot={{ r: 8, fill: '#ef4444' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card3D>

        {/* Attendance by Subject Chart */}
        <Card3D glowColor="blue" intensity={8}>
          <div className="p-6 space-y-4 bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Attendance by Subject
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">Minimum mandatory threshold is 75%</p>
              </div>
              <Link to="/student/attendance" className="text-xs text-red-600 dark:text-sky-400 hover:underline">
                Detailed Breakdown →
              </Link>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="subject" stroke="#71717a" fontSize={11} />
                  <YAxis domain={[0, 100]} stroke="#71717a" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#000000',
                      borderColor: '#38bdf8',
                      color: '#fff',
                      borderRadius: '0.75rem',
                      boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)',
                    }}
                  />
                  <Bar dataKey="percentage" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card3D>
      </div>

      {/* Schedule & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <Card3D glowColor="none" intensity={6} className="lg:col-span-2">
          <div className="p-6 space-y-4 bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span>Today's Class Schedule</span>
              </h3>
              <Link to="/timetable" className="text-xs text-red-600 dark:text-sky-400 hover:underline">
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
                  className="p-3.5 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 flex items-center justify-between text-xs transition-colors hover:border-red-400/50"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{slot.subject}</span>
                    <p className="text-slate-500 dark:text-zinc-400">{slot.faculty} • {slot.room}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-red-600 dark:text-sky-400">{slot.time}</span>
                    <Badge variant="neutral" size="sm" className="block mt-1">
                      {slot.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card3D>

        {/* Quick Actions Panel */}
        <Card3D glowColor="red" intensity={8}>
          <div className="p-6 space-y-3 bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/student/attendance" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs hover:border-emerald-500">
                  📊 Check Attendance & Predictions
                </Button>
              </Link>
              <Link to="/timetable" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs hover:border-sky-500">
                  🗓️ View Weekly Timetable
                </Button>
              </Link>
              <Link to="/exams" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs hover:border-red-500">
                  📑 View Exam Hall Tickets & Grades
                </Button>
              </Link>
              <Link to="/placements" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs hover:border-sky-500">
                  💼 Browse Placement Opportunities
                </Button>
              </Link>
              <Link to="/complaints" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs hover:border-red-500">
                  ⚠️ Submit Campus Grievance
                </Button>
              </Link>
              <Link to="/ai-assistant" className="block">
                <Button size="sm" variant="lightblue" className="w-full justify-start text-xs">
                  ✨ Ask EduNexus AI Assistant
                </Button>
              </Link>
            </div>
          </div>
        </Card3D>
      </div>
    </div>
  );
};
