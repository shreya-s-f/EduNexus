import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Calendar, MapPin, Clock, Users, CheckCircle, Search, Trophy, Sparkles } from 'lucide-react';
import api from '../services/api';
import { EventItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

export const EventsPage: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const categories = ['ALL', 'Hackathons', 'Workshops', 'Cultural', 'Sports', 'Technical', 'Seminars'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events', {
          params: {
            category: selectedCategory !== 'ALL' ? selectedCategory : undefined,
            search: search || undefined,
          },
        });
        setEvents(res.data.data || []);
      } catch (err) {
        console.error('Failed to load events', err);
      }
    };
    fetchEvents();
  }, [selectedCategory, search]);

  const handleRegister = async (event: EventItem) => {
    if (!user) {
      addToast('warning', 'Login Required', 'Please log in to your student account to register for events.');
      return;
    }

    setIsRegistering(true);
    setSelectedEvent(event);
    try {
      const res = await api.post('/events/register', { eventId: event._id });
      setConfirmationCode(res.data.data.confirmationCode);
      addToast('success', 'Registration Confirmed', `Successfully registered for ${event.title}!`);
    } catch (err: any) {
      addToast('error', 'Registration Error', err.response?.data?.message || 'Could not complete registration.');
      setSelectedEvent(null);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="primary">Campus Life & Hackathons</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Upcoming Events & Conferences
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          Discover hackathons, guest lectures, cultural galas, and inter-collegiate championships.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <Card key={evt._id} hover className="overflow-hidden flex flex-col justify-between">
            <div>
              <div className="h-44 w-full relative">
                <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge variant="primary">{evt.category}</Badge>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{evt.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-brand-500" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{evt.registeredCount} / {evt.registrationLimit} Registered</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Button onClick={() => handleRegister(evt)} className="w-full" size="sm">
                Register For Event
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={!!confirmationCode}
        onClose={() => setConfirmationCode(null)}
        title="Event Registration Pass"
      >
        <div className="text-center space-y-4 py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selectedEvent?.title}</h4>
            <p className="text-xs text-slate-500 mt-1">Please save your digital entry pass confirmation code:</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-lg font-extrabold tracking-widest text-brand-600 dark:text-brand-400">
            {confirmationCode}
          </div>
          <p className="text-[11px] text-slate-400">
            Show this code at the registration desk on the event day. A copy has been saved to your student notifications.
          </p>
          <Button onClick={() => setConfirmationCode(null)} className="w-full">
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
};
