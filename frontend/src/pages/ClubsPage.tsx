import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Users, Trophy, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import { ClubItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

export const ClubsPage: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [clubs, setClubs] = useState<ClubItem[]>([]);
  const [joiningClubId, setJoiningClubId] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await api.get('/clubs');
        setClubs(res.data.data || []);
      } catch (err) {
        console.error('Failed to load clubs', err);
      }
    };
    fetchClubs();
  }, []);

  const handleJoinClub = async (club: ClubItem) => {
    if (!user) {
      addToast('warning', 'Login Required', 'Please log in to join student clubs.');
      return;
    }
    setJoiningClubId(club._id);
    try {
      await api.post('/clubs/join', { clubId: club._id });
      addToast('success', 'Joined Club', `Welcome to ${club.name}! You are now an active member.`);
      // Update local count
      setClubs((prev) =>
        prev.map((c) => (c._id === club._id ? { ...c, membersCount: c.membersCount + 1 } : c))
      );
    } catch (err) {
      addToast('error', 'Failed', 'Could not join club.');
    } finally {
      setJoiningClubId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="primary">Student Communities & Chapters</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Over 40+ Thriving Student Clubs & Societies
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          From algorithmic programming to artificial intelligence, humanoid robotics, motorsport, music, and social impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {clubs.map((club) => (
          <Card key={club._id} hover className="overflow-hidden flex flex-col justify-between">
            <div>
              <div className="h-44 w-full relative">
                <img
                  src={club.bannerImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'}
                  alt={club.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="info">{club.category}</Badge>
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full glass-panel text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-brand-500" />
                  <span>{club.membersCount} Members</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{club.name}</h3>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold mt-0.5">
                    {club.shortDescription}
                  </p>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{club.about}</p>

                {/* Achievements */}
                {club.achievements?.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      <span>Key Honors:</span>
                    </span>
                    {club.achievements.map((ach, i) => (
                      <div key={i} className="text-xs text-slate-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Schedule: </span>
                  {club.meetingSchedule}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Button
                onClick={() => handleJoinClub(club)}
                isLoading={joiningClubId === club._id}
                className="w-full"
                size="sm"
              >
                Join {club.name.split(' ')[0]}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
