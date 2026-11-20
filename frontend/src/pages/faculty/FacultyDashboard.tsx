import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { BookOpen, Users, Clock, FileCheck, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

export const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Batch attendance marking state
  const [markingDate, setMarkingDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState('21IS51');
  const [markedSuccess, setMarkedSuccess] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/faculty/dashboard');
        setData(res.data.data);
      } catch (err) {
        console.error('Failed to load faculty dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleMarkAttendance = async () => {
    try {
      await api.post('/attendance/mark', {
        department: 'ISE',
        semester: 6,
        section: 'A',
        subjectCode: selectedSubject,
        subjectName: 'Database Management Systems',
        date: markingDate,
        records: [
          { studentUsn: '1EN21IS045', studentName: 'Rahul Sharma', status: 'present' },
          { studentUsn: '1EN21IS046', studentName: 'Ananya Rao', status: 'present' },
          { studentUsn: '1EN21IS047', studentName: 'Varun Nair', status: 'absent' },
        ],
      });
      setMarkedSuccess(true);
      addToast('success', 'Attendance Recorded', 'Batch attendance saved to permanent university records.');
      setTimeout(() => setMarkedSuccess(false), 4000);
    } catch (err) {
      addToast('error', 'Error', 'Failed to submit batch attendance.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading faculty dashboard...</div>;
  }

  const faculty = data?.faculty || {
    name: user?.name || 'Dr. K. S. Venkatesh',
    designation: 'Associate Professor',
    department: 'Information Science & Engineering',
    facultyId: 'FAC102',
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="primary">Faculty ID: {faculty.facultyId}</Badge>
            <span className="text-xs text-slate-300 font-semibold">{faculty.designation}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">{faculty.name}</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Department of {faculty.department} • Active Teaching Term Even Semester 2026
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="bg-brand-500 hover:bg-brand-600 shadow-md">
            + New Assignment
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 text-center">
          <Users className="w-6 h-6 text-brand-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">128</h3>
          <p className="text-xs text-slate-500 mt-1">Students Under Tutelage</p>
        </Card>
        <Card className="p-5 text-center">
          <BookOpen className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">3 Courses</h3>
          <p className="text-xs text-slate-500 mt-1">Assigned Subjects</p>
        </Card>
        <Card className="p-5 text-center">
          <FileCheck className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">6 Pending</h3>
          <p className="text-xs text-slate-500 mt-1">Assignment Submissions</p>
        </Card>
        <Card className="p-5 text-center">
          <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">3 Sessions</h3>
          <p className="text-xs text-slate-500 mt-1">Scheduled Today</p>
        </Card>
      </div>

      {/* Interactive Batch Attendance Section */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              Interactive Attendance Marker
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select department, semester, subject, and date to mark student present/absent states.
            </p>
          </div>
          <Badge variant="info">Section 6-A</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Teaching Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-brand-500"
            >
              <option value="21IS51">21IS51 - Database Management Systems</option>
              <option value="21ISL56">21ISL56 - DBMS & Network Laboratory</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Class Date
            </label>
            <input
              type="date"
              value={markingDate}
              onChange={(e) => setMarkingDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-end">
            <Button onClick={handleMarkAttendance} className="w-full" size="sm">
              Submit Attendance Log
            </Button>
          </div>
        </div>

        {markedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Attendance successfully verified and recorded into centralized student database!</span>
          </div>
        )}
      </Card>
    </div>
  );
};
