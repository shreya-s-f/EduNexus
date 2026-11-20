import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Calendar, Award, FileText, CheckCircle2, TrendingUp } from 'lucide-react';
import api from '../services/api';

export const ExamsResultsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'results' | 'timetable'>('results');
  const [exams, setExams] = useState<any[]>([]);
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const [examRes, resultRes] = await Promise.all([
          api.get('/exams'),
          api.get('/exams/results'),
        ]);
        setExams(examRes.data.data || []);
        setResultData(resultRes.data.data);
      } catch (err) {
        console.error('Failed to load exams data', err);
      }
    };
    fetchExams();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Examinations, Hall Tickets & Semester Results
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          University examination schedules, continuous internal evaluation results, and SGPA grade cards.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'results'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          Semester End Results & SGPA
        </button>
        <button
          onClick={() => setActiveTab('timetable')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'timetable'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          Upcoming Examination Schedules
        </button>
      </div>

      {activeTab === 'results' ? (
        <div className="space-y-6">
          {/* Result Card Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-6 text-center">
              <span className="text-xs text-slate-400 font-semibold uppercase">Latest Semester SGPA</span>
              <h2 className="text-4xl font-extrabold text-brand-600 dark:text-brand-400 mt-2">
                {resultData?.sgpa || 8.85}
              </h2>
              <p className="text-xs text-slate-400 mt-1">Semester 5 Examination</p>
            </Card>

            <Card className="p-6 text-center">
              <span className="text-xs text-slate-400 font-semibold uppercase">Cumulative CGPA</span>
              <h2 className="text-4xl font-extrabold text-indigo-500 mt-2">
                {resultData?.cgpa || 8.72}
              </h2>
              <p className="text-xs text-slate-400 mt-1">Across Semesters 1 to 5</p>
            </Card>

            <Card className="p-6 text-center">
              <span className="text-xs text-slate-400 font-semibold uppercase">Final Result Status</span>
              <div className="mt-3">
                <Badge variant="success" size="md">
                  {resultData?.resultStatus || 'PASS (FIRST CLASS WITH DISTINCTION)'}
                </Badge>
              </div>
            </Card>
          </div>

          {/* Subjects Marks Table */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Official Grade Card - Semester 5
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="py-3.5 px-6">Subject Code & Name</th>
                    <th className="py-3.5 px-4 text-center">Internal (50)</th>
                    <th className="py-3.5 px-4 text-center">External (100)</th>
                    <th className="py-3.5 px-4 text-center">Total</th>
                    <th className="py-3.5 px-4 text-center">Grade Point</th>
                    <th className="py-3.5 px-4 text-center">Letter Grade</th>
                    <th className="py-3.5 px-4 text-center">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {resultData?.subjects?.map((sub: any) => (
                    <tr key={sub.subjectCode} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-4 px-6 font-bold text-slate-900 dark:text-slate-100">
                        {sub.subjectName}
                        <span className="block text-[11px] text-slate-400 font-normal">{sub.subjectCode}</span>
                      </td>
                      <td className="py-4 px-4 text-center font-mono">{sub.internalMarks}</td>
                      <td className="py-4 px-4 text-center font-mono">{sub.externalMarks}</td>
                      <td className="py-4 px-4 text-center font-mono font-bold">{sub.totalMarks}</td>
                      <td className="py-4 px-4 text-center font-bold text-brand-600">{sub.gradePoint}</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="primary" size="sm">{sub.grade}</Badge>
                      </td>
                      <td className="py-4 px-4 text-center font-semibold">{sub.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {exams.map((exam) => (
            <Card key={exam._id} className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{exam.title}</h3>
                  <p className="text-xs text-slate-500">Duration: {exam.startDate} to {exam.endDate}</p>
                </div>
                <Badge variant="warning">{exam.type}</Badge>
              </div>

              <div className="space-y-2">
                {exam.timetable?.map((slot: any, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">{slot.subjectName}</span>
                      <span className="text-slate-500">{slot.subjectCode} • Hall: {slot.roomNumber}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-brand-600 dark:text-brand-400 block">{slot.date}</span>
                      <span className="text-slate-400 text-[11px]">{slot.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
