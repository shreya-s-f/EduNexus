import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Award, AlertTriangle, CheckCircle, Calculator, TrendingUp, Info } from 'lucide-react';
import api from '../../services/api';
import { AttendanceSummary, SubjectAttendance } from '../../types';

export const StudentAttendancePage: React.FC = () => {
  const [summary, setSummary] = useState<AttendanceSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<SubjectAttendance | null>(null);
  const [simulatedClasses, setSimulatedClasses] = useState(5);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get('/attendance/summary');
        setSummary(res.data.data);
        if (res.data.data?.subjects?.length > 0) {
          setSelectedSubject(res.data.data.subjects[3] || res.data.data.subjects[0]);
        }
      } catch (err) {
        console.error('Failed to load attendance summary', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading attendance data...</div>;
  }

  // Simulator calculation for selected subject
  const currentAttended = selectedSubject?.attended || 0;
  const currentTotal = selectedSubject?.total || 1;
  const simulatedAttended = currentAttended + simulatedClasses;
  const simulatedTotal = currentTotal + simulatedClasses;
  const simulatedPercentage = Number(((simulatedAttended / simulatedTotal) * 100).toFixed(1));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Attendance Analytics & Smart Predictor
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor your subject-wise presence, detect shortages early, and simulate future attendance scenarios.
        </p>
      </div>

      {/* Overall Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 text-center">
          <p className="text-xs text-slate-500 font-semibold uppercase">Overall Attendance</p>
          <h2 className="text-4xl font-extrabold text-brand-600 dark:text-brand-400 mt-2">
            {summary?.overall.percentage}%
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {summary?.overall.totalAttended} / {summary?.overall.totalHeld} Total Classes Attended
          </p>
        </Card>

        <Card className="p-6 text-center">
          <p className="text-xs text-slate-500 font-semibold uppercase">Eligibility Status</p>
          <div className="mt-2">
            <Badge variant={summary?.overall.percentage && summary.overall.percentage >= 75 ? 'success' : 'danger'} size="md">
              {summary?.overall.status}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-3">University standard: Minimum 75% per subject</p>
        </Card>

        <Card className="p-6 text-center">
          <p className="text-xs text-slate-500 font-semibold uppercase">Subjects Needing Attention</p>
          <h2 className={`text-4xl font-extrabold mt-2 ${summary?.criticalSubjectsCount ? 'text-amber-500' : 'text-emerald-500'}`}>
            {summary?.criticalSubjectsCount}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {summary?.criticalSubjectsCount ? 'Attendance below 75%' : 'All subjects above 75%!'}
          </p>
        </Card>
      </div>

      {/* Warning message if any */}
      {summary?.warningMessage && (
        <div className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center gap-3 ${
          summary.criticalSubjectsCount > 0
            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200'
            : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
        }`}>
          {summary.criticalSubjectsCount > 0 ? (
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          ) : (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          )}
          <span>{summary.warningMessage}</span>
        </div>
      )}

      {/* Subject-Wise Table with Shortage Predictor Metrics */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Subject-Wise Attendance Breakdown
          </h3>
          <span className="text-xs text-slate-400">Click any row to simulate in Predictor</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-6">Subject Code & Name</th>
                <th className="py-3.5 px-4 text-center">Classes Attended</th>
                <th className="py-3.5 px-4 text-center">Attendance %</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-6">Smart Predictor Guidance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {summary?.subjects?.map((sub) => (
                <tr
                  key={sub.code}
                  onClick={() => setSelectedSubject(sub)}
                  className={`cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                    selectedSubject?.code === sub.code ? 'bg-brand-50/50 dark:bg-brand-950/30' : ''
                  }`}
                >
                  <td className="py-4 px-6">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{sub.name}</span>
                    <span className="text-slate-400 text-[11px]">{sub.code} • {sub.faculty}</span>
                  </td>
                  <td className="py-4 px-4 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                    {sub.attended} / {sub.total}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`font-extrabold text-sm ${sub.isWarning ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {sub.percentage}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge variant={sub.isWarning ? 'danger' : sub.percentage >= 85 ? 'success' : 'primary'} size="sm">
                      {sub.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-xs">
                    {sub.isWarning ? (
                      <span className="font-bold text-rose-600 dark:text-rose-400">
                        Attend next {sub.classesNeededFor75} classes to reach 75%
                      </span>
                    ) : (
                      <span className="text-slate-500">
                        Can safely miss up to {sub.classesCanBunk} classes
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Interactive Simulator Card */}
      {selectedSubject && (
        <Card className="p-6 sm:p-8 space-y-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-600">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                Attendance Simulator: {selectedSubject.name} ({selectedSubject.code})
              </h3>
              <p className="text-xs text-slate-500">
                Current: {selectedSubject.attended}/{selectedSubject.total} ({selectedSubject.percentage}%)
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Simulate attending the next consecutive classes:
              </span>
              <span className="font-bold text-brand-600 text-sm">+{simulatedClasses} Classes</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={simulatedClasses}
              onChange={(e) => setSimulatedClasses(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-[11px] text-slate-400">New Total Attended</span>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {simulatedAttended} / {simulatedTotal}
              </p>
            </div>
            <div>
              <span className="text-[11px] text-slate-400">Predicted Attendance</span>
              <p className={`text-xl font-extrabold mt-1 ${simulatedPercentage >= 75 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {simulatedPercentage}%
              </p>
            </div>
            <div>
              <span className="text-[11px] text-slate-400">Resulting Status</span>
              <div className="mt-1">
                <Badge variant={simulatedPercentage >= 75 ? 'success' : 'danger'} size="md">
                  {simulatedPercentage >= 75 ? 'Eligible for Exams' : 'Still Below 75%'}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
