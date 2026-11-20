import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Clock, Calendar, MapPin, User, BookOpen } from 'lucide-react';
import api from '../services/api';

export const TimetablePage: React.FC = () => {
  const [timetable, setTimetable] = useState<any[]>([]);
  const [activeDay, setActiveDay] = useState('Monday');
  const [loading, setLoading] = useState(true);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await api.get('/timetable/weekly');
        setTimetable(res.data.data || []);
      } catch (err) {
        console.error('Failed to load timetable', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTimetable();
  }, []);

  const activeDaySchedule = timetable.find((d) => d.day === activeDay) || timetable[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Academic Weekly Timetable
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Department of Information Science & Engineering • Semester 6 (Section A)
        </p>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeDay === day
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Slots List for Selected Day */}
      <Card className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
            {activeDay}'s Schedule
          </h3>
          <Badge variant="primary">{activeDaySchedule?.slots?.length || 0} Sessions Scheduled</Badge>
        </div>

        <div className="space-y-3">
          {activeDaySchedule?.slots?.map((slot: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                    {slot.subjectName}
                  </span>
                  <Badge variant="neutral" size="sm">{slot.subjectCode}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {slot.facultyName}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    {slot.roomNumber}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400 block">
                  {slot.startTime} – {slot.endTime}
                </span>
                <Badge
                  variant={slot.type === 'Lab' ? 'info' : slot.type === 'Tutorial' ? 'warning' : 'primary'}
                  size="sm"
                  className="mt-1"
                >
                  {slot.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
