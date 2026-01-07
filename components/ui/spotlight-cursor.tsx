'use client';

import { useEffect, useRef } from 'react';

interface SpotlightConfig {
  radius?: number;
  brightness?: number;
  color?: string;
  smoothing?: number;
}

interface SpotlightCursorProps {
  config?: SpotlightConfig;
}

export function SpotlightCursor({ config }: SpotlightCursorProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  const radius = config?.radius ?? 100;
  const brightness = config?.brightness ?? 0.15;
  const color = config?.color ?? '#ffffff';
  const smoothing = config?.smoothing ?? 0.1;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      currentX.current += (mouseX.current - currentX.current) * smoothing;
      currentY.current += (mouseY.current - currentY.current) * smoothing;

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(circle ${radius}px at ${currentX.current}px ${currentY.current}px, ${color}${Math.round(brightness * 255).toString(16).padStart(2, '0')}, transparent)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [radius, brightness, color, smoothing]);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        mixBlendMode: 'screen',
      }}
    />
  );
}
