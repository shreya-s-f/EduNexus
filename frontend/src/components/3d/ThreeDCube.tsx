import React from 'react';
import { GraduationCap, Sparkles, Trophy, Zap, Shield, Globe } from 'lucide-react';

interface ThreeDCubeProps {
  size?: number; // Size in pixels (default: 180)
}

export const ThreeDCube: React.FC<ThreeDCubeProps> = ({ size = 180 }) => {
  const half = size / 2;

  return (
    <div
      className="perspective-1000 flex items-center justify-center p-8 select-none"
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative animate-spin-cube preserve-3d transition-transform duration-700"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {/* Face 1: FRONT - Vibrant Red */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 border border-red-400/80 shadow-3d-red backface-hidden"
          style={{
            transform: `translateZ(${half}px)`,
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.92), rgba(185, 28, 28, 0.95))',
          }}
        >
          <GraduationCap className="w-8 h-8 text-white mb-2" />
          <span className="text-white font-extrabold text-sm uppercase tracking-wider text-center">
            Excellence
          </span>
          <span className="text-red-100 text-[10px] font-semibold mt-1">NAAC A++</span>
        </div>

        {/* Face 2: BACK - Vibrant Light Green */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 border border-emerald-400/80 shadow-3d-green backface-hidden"
          style={{
            transform: `rotateY(180deg) translateZ(${half}px)`,
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.92), rgba(16, 185, 129, 0.95))',
          }}
        >
          <Trophy className="w-8 h-8 text-white mb-2" />
          <span className="text-white font-extrabold text-sm uppercase tracking-wider text-center">
            Achievements
          </span>
          <span className="text-emerald-100 text-[10px] font-semibold mt-1">98.4% Placed</span>
        </div>

        {/* Face 3: RIGHT - Vibrant Light Blue */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 border border-sky-400/80 shadow-3d-blue backface-hidden"
          style={{
            transform: `rotateY(90deg) translateZ(${half}px)`,
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.92), rgba(56, 189, 248, 0.95))',
          }}
        >
          <Zap className="w-8 h-8 text-white mb-2" />
          <span className="text-white font-extrabold text-sm uppercase tracking-wider text-center">
            Innovation
          </span>
          <span className="text-sky-100 text-[10px] font-semibold mt-1">AI Integrated</span>
        </div>

        {/* Face 4: LEFT - Crisp White with subtle neon accents */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 border border-slate-300 dark:border-zinc-700 shadow-float backface-hidden"
          style={{
            transform: `rotateY(-90deg) translateZ(${half}px)`,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(241, 245, 249, 0.95))',
          }}
        >
          <Globe className="w-8 h-8 text-slate-800 mb-2" />
          <span className="text-slate-900 font-extrabold text-sm uppercase tracking-wider text-center">
            Global Hub
          </span>
          <span className="text-slate-600 text-[10px] font-semibold mt-1">150+ Partners</span>
        </div>

        {/* Face 5: TOP - Deep Jet Black with Red Accent */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 border border-red-500/40 backface-hidden"
          style={{
            transform: `rotateX(90deg) translateZ(${half}px)`,
            background: '#000000',
          }}
        >
          <Sparkles className="w-7 h-7 text-red-400 mb-1 animate-pulse" />
          <span className="text-white font-bold text-xs uppercase tracking-widest">
            EduNexus
          </span>
        </div>

        {/* Face 6: BOTTOM - Deep Jet Black with Blue/Green Accent */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 border border-sky-500/40 backface-hidden"
          style={{
            transform: `rotateX(-90deg) translateZ(${half}px)`,
            background: '#000000',
          }}
        >
          <Shield className="w-7 h-7 text-sky-400 mb-1" />
          <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest">
            Smart Campus
          </span>
        </div>
      </div>
    </div>
  );
};
