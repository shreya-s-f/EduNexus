import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Award, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

export const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        const studentData = res.data.data?.profileDetail;
        if (studentData) {
          setProfile(studentData);
          setPhone(studentData.phone || '');
          setAddress(studentData.address || '');
          setDob(studentData.dob || '');
          setSkills(studentData.skills || []);
        }
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (!skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.put('/students/profile', {
        phone,
        address,
        dob,
        skills,
      });
      addToast('success', 'Profile Updated', 'Student profile details updated successfully.');
      setIsEditing(false);
    } catch (err) {
      addToast('error', 'Update Failed', 'Could not update student profile.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading student profile...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Student Profile & Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your personal data, academic credentials, verified certifications, and technical skill tags.
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} size="sm">
            Edit Profile
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(false)} variant="ghost" size="sm">
            Cancel Editing
          </Button>
        )}
      </div>

      {/* Main Profile Card */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-brand-500 shadow-lg shrink-0">
            <img
              src={profile?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{user?.name}</h2>
              <Badge variant="success">Active Student</Badge>
            </div>
            <p className="text-sm font-mono text-brand-600 dark:text-brand-400 font-bold">
              USN: {profile?.usn || user?.usn || '1EN21IS045'}
            </p>
            <p className="text-xs text-slate-500">
              Department of {profile?.department || 'Information Science & Engineering'} • Semester {profile?.semester || 6}
            </p>
          </div>
        </div>

        {/* Academic Overview Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-center">
          <div>
            <span className="text-[11px] text-slate-400">Cumulative CGPA</span>
            <p className="text-xl font-extrabold text-brand-600 mt-0.5">{profile?.cgpa || '8.72'}</p>
          </div>
          <div>
            <span className="text-[11px] text-slate-400">Attendance</span>
            <p className="text-xl font-extrabold text-emerald-500 mt-0.5">{profile?.attendancePercentage || 87.5}%</p>
          </div>
          <div>
            <span className="text-[11px] text-slate-400">Earned Credits</span>
            <p className="text-xl font-extrabold text-indigo-500 mt-0.5">{profile?.credits || 114} / 160</p>
          </div>
          <div>
            <span className="text-[11px] text-slate-400">Admission Year</span>
            <p className="text-xl font-extrabold text-slate-700 dark:text-slate-300 mt-0.5">{profile?.admissionYear || 2023}</p>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSave} className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Institutional Email
              </label>
              <input
                type="email"
                disabled
                value={user?.email || 'student@edunexus.demo'}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                disabled={!isEditing}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                disabled={!isEditing}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Residential Address
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Bengaluru, Karnataka"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>

          {/* Technical Skills Section */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Technical Skill Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-medium"
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-brand-400 hover:text-brand-700"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <div className="flex gap-2 max-w-sm pt-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g. Next.js, PyTorch"
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
                <Button type="button" onClick={handleAddSkill} size="sm">
                  Add
                </Button>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end pt-4">
              <Button type="submit" isLoading={isSaving}>
                Save Profile Changes
              </Button>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};
