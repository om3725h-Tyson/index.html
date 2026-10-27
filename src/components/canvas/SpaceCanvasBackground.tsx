import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  originX: number;
  originY: number;
  z: number;
  baseRadius: number;
  radius: number;
  color: { r: number; g: number; b: number };
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  vx: number;
  vy: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  fade: number;
}

export const SpaceCanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();

    // Star generation
    const starColors = [
      { r: 255, g: 255, b: 255 }, // Starlight White
      { r: 103, g: 232, b: 249 }, // Ice Cyan
      { r: 192, g: 132, b: 252 }, // Cosmic Violet
      { r: 253, g: 230, b: 138 }, // Nova Amber
    ];

    const starCount = Math.max(160, Math.min(Math.floor(Math.min(width, height) * 0.35), 300));
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const z = Math.random() * 3 + 0.5;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        originX: Math.random() * width,
        originY: Math.random() * height,
        z: z,
        baseRadius: (Math.random() * 1.4 + 0.6) * (z / 2),
        radius: (Math.random() * 1.4 + 0.6) * (z / 2),
        color: color,
        alpha: Math.random() * 0.6 + 0.4,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: 0,
        vy: 0,
      });
    }

    // Meteors
    const meteors: Meteor[] = [];
    let lastMeteorTime = 0;
    let meteorInterval = 4000;

    // Telemetry tracking
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
      radius: 180,
    };

    const scrollState = {
      currentY: window.scrollY,
      lastY: window.scrollY,
      velocity: 0,
      targetVelocity: 0,
      warpFactor: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleScroll = () => {
      scrollState.currentY = window.scrollY;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationId: number;

    const animate = (timestamp: number) => {
      // Mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Scroll warp tracking
      const scrollDelta = scrollState.currentY - scrollState.lastY;
      scrollState.lastY = scrollState.currentY;
      scrollState.targetVelocity = Math.abs(scrollDelta) * 0.8;
      scrollState.velocity += (scrollState.targetVelocity - scrollState.velocity) * 0.15;
      scrollState.targetVelocity *= 0.88;

      const rawWarp = Math.min(scrollState.velocity / 35, 1.8);
      scrollState.warpFactor += (rawWarp - scrollState.warpFactor) * 0.2;
      const warp = scrollState.warpFactor;

      // Meteors
      if (timestamp - lastMeteorTime > meteorInterval) {
        if (Math.random() > 0.4) {
          meteors.push({
            x: Math.random() > 0.5 ? Math.random() * width : 0,
            y: Math.random() * (height * 0.6),
            length: Math.random() * 90 + 60,
            speed: Math.random() * 10 + 12,
            angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
            alpha: 1,
            fade: Math.random() * 0.015 + 0.01,
          });
        }
        lastMeteorTime = timestamp;
        meteorInterval = Math.random() * 4000 + 3000;
      }

      ctx.clearRect(0, 0, width, height);
      const time = timestamp * 0.002;

      // Render Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = Math.sin(time * (s.twinkleSpeed * 100) + s.twinklePhase);
        const currentAlpha = Math.max(0.15, Math.min(1, s.alpha + twinkle * 0.35));

        if (mouse.active) {
          const distX = mouse.x - s.x;
          const distY = mouse.y - s.y;
          const dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < mouse.radius && dist > 1) {
            const force = (1 - dist / mouse.radius) * 1.8;
            const angle = Math.atan2(distY, distX);
            s.vx += Math.cos(angle) * force * (s.z * 0.4);
            s.vy += Math.sin(angle) * force * (s.z * 0.4);
          }
        }

        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.88;
        s.vy *= 0.88;
        s.x += (s.originX - s.x) * 0.02;
        s.y += (s.originY - s.y) * 0.02;

        if (warp > 0.05) {
          const streakLength = warp * 35 * s.z;
          const streakEndX = s.x;
          const streakEndY = s.y - streakLength;

          const grad = ctx.createLinearGradient(s.x, s.y, streakEndX, streakEndY);
          grad.addColorStop(0, `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${currentAlpha})`);
          grad.addColorStop(1, `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, 0)`);

          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(1, s.baseRadius * (1 + warp * 0.4));
          ctx.lineCap = 'round';
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(streakEndX, streakEndY);
          ctx.stroke();

          s.y -= warp * 4 * s.z;
          if (s.y < 0) {
            s.y = height;
            s.originY = height;
          }
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.baseRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${currentAlpha})`;
          ctx.shadowColor = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${currentAlpha * 0.8})`;
          ctx.shadowBlur = s.z > 2 ? 8 : 2;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Render Meteors
      for (let j = meteors.length - 1; j >= 0; j--) {
        const m = meteors[j];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= m.fade;

        if (m.alpha <= 0 || m.x > width + 100 || m.y > height + 100) {
          meteors.splice(j, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const meteorGrad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        meteorGrad.addColorStop(0.3, `rgba(103, 232, 249, ${m.alpha * 0.7})`);
        meteorGrad.addColorStop(1, `rgba(168, 85, 247, 0)`);

        ctx.beginPath();
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: `
            radial-gradient(circle 800px at 20% 20%, rgba(139, 92, 246, 0.08), transparent 70%),
            radial-gradient(circle 1000px at 80% 60%, rgba(6, 182, 212, 0.07), transparent 75%),
            radial-gradient(circle 600px at 50% 90%, rgba(245, 158, 11, 0.04), transparent 60%)
          `
        }}
      />
    </>
  );
};

