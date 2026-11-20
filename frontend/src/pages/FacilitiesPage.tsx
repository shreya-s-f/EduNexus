import React from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { BookOpen, Bus, BedDouble, Dumbbell, Utensils, HeartPulse, Wifi, Shield } from 'lucide-react';

export const FacilitiesPage: React.FC = () => {
  const facilities = [
    {
      title: 'Central Digital Library',
      desc: 'Over 60,000 volumes, IEEE/ACM electronic subscriptions, multimedia reading rooms, and quiet research cubicles.',
      icon: BookOpen,
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Hostels & Residential Halls',
      desc: 'Separate modern residences for boys and girls with 24/7 security, high speed Wi-Fi, solar heating, and nutritious mess food.',
      icon: BedDouble,
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Campus Transport Fleet',
      desc: '18 chartered air-conditioned GPS-tracked buses connecting key residential nodes across Bengaluru city.',
      icon: Bus,
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Olympic Sports Arena',
      desc: 'FIFA standard synthetic football ground, 400m synthetic running track, floodlit basketball and tennis courts, and gymnasium.',
      icon: Dumbbell,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Multi-Cuisine Food Court',
      desc: 'Hygienic university cafeteria, bakery, juice stations, and franchised cafes catering healthy meals throughout the day.',
      icon: Utensils,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Health & Wellness Pavilion',
      desc: '24/7 on-campus medical center staffed with resident medical officers, observation ward, pharmacy, and emergency ambulance.',
      icon: HeartPulse,
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="primary">World-Class Infrastructure</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Campus Facilities & Student Amenities
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Designed to inspire academic focus, physical wellness, social vitality, and technological innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilities.map((fac, idx) => {
          const Icon = fac.icon;
          return (
            <Card key={idx} hover className="overflow-hidden">
              <div className="h-48 w-full relative">
                <img src={fac.image} alt={fac.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 p-2 rounded-xl glass-panel text-brand-600">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{fac.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{fac.desc}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
