import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { AlertCircle, Plus, CheckCircle2, Clock, MapPin, Tag } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { ComplaintItem } from '../types';

export const ComplaintsPage: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [complaints, setComplaints] = useState<ComplaintItem[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Form states
  const [category, setCategory] = useState('Wi-Fi');
  const [location, setLocation] = useState('Academic Block 1 - LH-201');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Classroom', 'Lab', 'Hostel', 'Library', 'Canteen', 'Transport', 'Wi-Fi', 'Cleanliness', 'Security', 'Other'];

  const fetchComplaints = async () => {
    try {
      const endpoint = user?.role === 'ADMIN' ? '/complaints' : '/complaints/my-complaints';
      const res = await api.get(endpoint);
      setComplaints(res.data.data || []);
    } catch (err) {
      console.error('Failed to load complaints', err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !location) {
      addToast('error', 'Incomplete Form', 'Please fill in description and location.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.post('/complaints', {
        category,
        location,
        description,
        priority,
      });
      addToast('success', 'Grievance Submitted', `Ticket #${res.data.data.ticketId} logged successfully!`);
      setIsSubmitModalOpen(false);
      setDescription('');
      fetchComplaints();
    } catch (err) {
      addToast('error', 'Error', 'Failed to submit grievance ticket.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
      case 'Closed':
        return <Badge variant="success">{status}</Badge>;
      case 'In Progress':
      case 'Assigned':
        return <Badge variant="primary">{status}</Badge>;
      case 'Under Review':
        return <Badge variant="warning">{status}</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Campus Grievance & Facilities Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Submit issues regarding lab hardware, classroom projectors, hostel Wi-Fi, transport, or cleanliness.
          </p>
        </div>

        <Button onClick={() => setIsSubmitModalOpen(true)} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          <span>Lodge New Grievance</span>
        </Button>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {complaints.length === 0 ? (
          <Card className="p-12 text-center text-slate-500">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">No Open Grievances</h3>
            <p className="text-xs text-slate-400 mt-1">All campus services operating smoothly without pending issues.</p>
          </Card>
        ) : (
          complaints.map((c) => (
            <Card key={c._id} className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
                    #{c.ticketId}
                  </span>
                  <Badge variant="neutral" size="sm">{c.category}</Badge>
                  <span className={`text-[11px] font-bold ${
                    c.priority === 'Emergency' || c.priority === 'High' ? 'text-rose-600' : 'text-slate-500'
                  }`}>
                    Priority: {c.priority}
                  </span>
                </div>
                <div>{getStatusBadge(c.status)}</div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{c.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-brand-500" />
                  <span>{c.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Submitted by: {c.studentName} ({c.studentUsn})</span>
                <span>Assigned to: {c.assignedTo || 'Facilities Management'}</span>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Submit Modal */}
      <Modal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} title="Lodge Grievance Ticket">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-brand-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-brand-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Specific Location</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Academic Block 1 - Room 204 or Boys Hostel B-101"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description of Issue</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide clear details regarding the problem encountered..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setIsSubmitModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={isSubmitting}>Lodge Grievance</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
