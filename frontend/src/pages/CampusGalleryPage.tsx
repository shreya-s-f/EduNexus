import React, { useState } from 'react';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

export const CampusGalleryPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('ALL');

  const photos = [
    {
      title: 'Central University Quadrangle & Academic Hub',
      tag: 'Campus Architecture',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000',
    },
    {
      title: 'High Performance AI & Supercomputing Lab',
      tag: 'Tech Labs',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
    },
    {
      title: 'HackNexus 36-Hour National Hackathon',
      tag: 'Hackathons',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
    },
    {
      title: 'Samskruthi Annual Cultural Evening',
      tag: 'Cultural',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000',
    },
    {
      title: 'Inter-Collegiate Sports Championship Match',
      tag: 'Sports',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000',
    },
    {
      title: 'Annual Graduation Day Convocation Ceremony',
      tag: 'Graduation',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
    },
    {
      title: 'Quiet Study Pods at Central Digital Library',
      tag: 'Campus Architecture',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000',
    },
    {
      title: 'Robotics & Autonomous Vehicle Prototyping',
      tag: 'Tech Labs',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000',
    },
  ];

  const tags = ['ALL', 'Campus Architecture', 'Tech Labs', 'Hackathons', 'Cultural', 'Sports', 'Graduation'];

  const filtered = selectedTag === 'ALL' ? photos : photos.filter((p) => p.tag === selectedTag);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="primary">Campus Life in Frames</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Campus Gallery & Memories
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          A visual glimpse into our vibrant architectural landmarks, hackathons, concerts, and milestones.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedTag === tag
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl overflow-hidden shadow-soft border border-slate-200/80 dark:border-slate-800 bg-slate-900 aspect-square"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-bold text-brand-300">{item.tag}</span>
              <h4 className="text-xs font-bold leading-snug">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
