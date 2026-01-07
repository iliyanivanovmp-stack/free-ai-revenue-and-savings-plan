'use client';

import { useEffect, useRef } from 'react';

export function GridCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const gridSize = 50;
    const maxDistance = 150;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const dx = mouseX.current - x;
          const dy = mouseY.current - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 1;

            ctx.beginPath();
            if (x + gridSize < canvas.width) {
              ctx.moveTo(x, y);
              ctx.lineTo(x + gridSize, y);
            }
            if (y + gridSize < canvas.height) {
              ctx.moveTo(x, y);
              ctx.lineTo(x, y + gridSize);
            }
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 opacity-50"
    />
  );
}
