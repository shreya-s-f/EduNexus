import React, { useRef, useState, MouseEvent } from 'react';
import { cn } from '../../utils/cn';

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // Tilt intensity (default: 15)
  glowColor?: 'red' | 'blue' | 'green' | 'multi' | 'none';
  enableShine?: boolean;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className,
  intensity = 14,
  glowColor = 'none',
  enableShine = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    setRotation({ x: rotateX, y: rotateY });
    setShinePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const glowStyles = {
    red: 'hover:shadow-3d-red hover:border-c-red-400 dark:hover:border-c-red-500',
    blue: 'hover:shadow-3d-blue hover:border-c-blue-400 dark:hover:border-c-blue-500',
    green: 'hover:shadow-3d-green hover:border-c-green-400 dark:hover:border-c-green-500',
    multi: 'hover:shadow-float hover:border-c-blue-400 dark:hover:border-c-red-500',
    none: 'hover:shadow-card hover:border-slate-300 dark:hover:border-zinc-700',
  };

  return (
    <div
      className="perspective-1000 inline-block w-full"
      style={{ perspective: '1100px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotation.x.toFixed(2)}deg) rotateY(${rotation.y.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className={cn(
          'relative rounded-2xl border transition-all duration-300 preserve-3d',
          'bg-white dark:bg-dark-card border-slate-200/90 dark:border-dark-border',
          glowStyles[glowColor],
          className
        )}
        {...props}
      >
        {/* Specular 3D Light Sheen Overlay */}
        {enableShine && isHovered && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl z-30 transition-opacity duration-300 opacity-60 dark:opacity-35"
            style={{
              background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 65%)`,
            }}
          />
        )}

        {/* Card Content with 3D Depth */}
        <div className="relative z-10 preserve-3d h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
