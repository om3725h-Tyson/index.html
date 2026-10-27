/**
 * ===================================================================
 * DEEP COSMOS // CANVAS STARFIELD & WARP DRIVE ENGINE
 * Interactive multi-layered starfield with gravitational cursor physics
 * and scroll-velocity hyperdrive warp acceleration.
 * ===================================================================
 */

class SpaceCanvasEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Dimensions
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Starfield Configuration
    this.starCount = Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.35);
    this.starCount = Math.max(180, Math.min(this.starCount, 320));
    this.stars = [];

    // Meteors
    this.meteors = [];
    this.lastMeteorTime = 0;
    this.meteorInterval = 4000; // Average spawn interval in ms

    // Cursor Telemetry & Interaction
    this.mouse = {
      x: this.width / 2,
      y: this.height / 2,
      targetX: this.width / 2,
      targetY: this.height / 2,
      active: false,
      radius: 180,
    };

    // Scroll Velocity & Warp Speed Tracking
    this.scroll = {
      currentY: window.scrollY,
      lastY: window.scrollY,
      velocity: 0,
      targetVelocity: 0,
      warpFactor: 0,
    };

    // Color Palette
    this.starColors = [
      { r: 255, g: 255, b: 255 }, // Starlight White
      { r: 103, g: 232, b: 249 }, // Ice Cyan
      { r: 192, g: 132, b: 252 }, // Cosmic Violet
      { r: 253, g: 230, b: 138 }, // Nova Amber
    ];

    // Initialization
    this.init();
  }

  init() {
    this.resize();
    this.createStars();
    this.bindEvents();
    this.animate(0);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    // Re-adjust stars within new bounds
    if (this.stars.length > 0) {
      this.stars.forEach(star => {
        if (star.x > this.width) star.x = Math.random() * this.width;
        if (star.y > this.height) star.y = Math.random() * this.height;
      });
    }
  }

  createStars() {
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      const color = this.starColors[Math.floor(Math.random() * this.starColors.length)];
      const z = Math.random() * 3 + 0.5; // Depth layer (0.5 = distant, 3.5 = near)

      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        originX: Math.random() * this.width,
        originY: Math.random() * this.height,
        z: z,
        baseRadius: (Math.random() * 1.4 + 0.6) * (z / 2),
        radius: (Math.random() * 1.4 + 0.6) * (z / 2),
        color: color,
        alpha: Math.random() * 0.6 + 0.4,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        // Displacement physics
        vx: 0,
        vy: 0,
        dx: 0,
        dy: 0,
      });
    }
  }

  spawnMeteor() {
    // Spawn meteor from top or side
    const startFromTop = Math.random() > 0.5;
    const meteor = {
      x: startFromTop ? Math.random() * this.width : 0,
      y: startFromTop ? 0 : Math.random() * (this.height * 0.6),
      length: Math.random() * 90 + 60,
      speed: Math.random() * 10 + 12,
      angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1), // ~45 degrees trajectory
      alpha: 1,
      fade: Math.random() * 0.015 + 0.01,
    };
    this.meteors.push(meteor);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Pointer tracking
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
      this.mouse.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });

    // Touch support
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.targetX = e.touches[0].clientX;
        this.mouse.targetY = e.touches[0].clientY;
        this.mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.mouse.active = false;
    });

    // Scroll speed tracking
    window.addEventListener('scroll', () => {
      this.scroll.currentY = window.scrollY;
    }, { passive: true });
  }

  updatePhysics(timestamp) {
    // 1. Mouse Lerping
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.12;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.12;

    // 2. Scroll Velocity Tracking & Warp Damping
    const scrollDelta = this.scroll.currentY - this.scroll.lastY;
    this.scroll.lastY = this.scroll.currentY;
    this.scroll.targetVelocity = Math.abs(scrollDelta) * 0.8;

    // Smooth lerp velocity
    this.scroll.velocity += (this.scroll.targetVelocity - this.scroll.velocity) * 0.15;
    // Decay target velocity if no scroll
    this.scroll.targetVelocity *= 0.88;

    // Warp factor normalized between 0 and 1
    const rawWarp = Math.min(this.scroll.velocity / 35, 1.8);
    this.scroll.warpFactor += (rawWarp - this.scroll.warpFactor) * 0.2;

    // 3. Meteor Spawning
    if (timestamp - this.lastMeteorTime > this.meteorInterval) {
      if (Math.random() > 0.4) {
        this.spawnMeteor();
      }
      this.lastMeteorTime = timestamp;
      this.meteorInterval = Math.random() * 4000 + 3000;
    }
  }

  render(timestamp) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const time = timestamp * 0.002;
    const warp = this.scroll.warpFactor;

    // Render Stars
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];

      // Twinkle calculation
      const twinkle = Math.sin(time * (s.twinkleSpeed * 100) + s.twinklePhase);
      const currentAlpha = Math.max(0.15, Math.min(1, s.alpha + twinkle * 0.35));

      // Gravitational Cursor Reaction
      if (this.mouse.active) {
        const distX = this.mouse.x - s.x;
        const distY = this.mouse.y - s.y;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < this.mouse.radius && dist > 1) {
          // Subtle magnetic attraction & elastic orbital deflection
          const force = (1 - dist / this.mouse.radius) * 1.8;
          const angle = Math.atan2(distY, distX);
          
          s.vx += Math.cos(angle) * force * (s.z * 0.4);
          s.vy += Math.sin(angle) * force * (s.z * 0.4);
        }
      }

      // Apply velocity and elastic rebound to origin
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.88; // Damping
      s.vy *= 0.88;

      // Elastic pull back to ambient position
      s.x += (s.originX - s.x) * 0.02;
      s.y += (s.originY - s.y) * 0.02;

      // Constellation Scroll / Warp Acceleration Effect
      if (warp > 0.05) {
        // Star stretches into a velocity streak
        const streakLength = warp * 35 * s.z;
        const streakEndX = s.x;
        const streakEndY = s.y - streakLength; // Vertical warp streak

        const grad = this.ctx.createLinearGradient(s.x, s.y, streakEndX, streakEndY);
        grad.addColorStop(0, `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${currentAlpha})`);
        grad.addColorStop(1, `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, 0)`);

        this.ctx.beginPath();
        this.ctx.strokeStyle = grad;
        this.ctx.lineWidth = Math.max(1, s.baseRadius * (1 + warp * 0.4));
        this.ctx.lineCap = 'round';
        this.ctx.moveTo(s.x, s.y);
        this.ctx.lineTo(streakEndX, streakEndY);
        this.ctx.stroke();

        // Also move star slightly during warp
        s.y -= warp * 4 * s.z;
        if (s.y < 0) {
          s.y = this.height;
          s.originY = this.height;
        }
      } else {
        // Standard Resting Twinkle Star
        this.ctx.beginPath();
        this.ctx.arc(s.x, s.y, s.baseRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${currentAlpha})`;
        this.ctx.shadowColor = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${currentAlpha * 0.8})`;
        this.ctx.shadowBlur = s.z > 2 ? 8 : 2;
        this.ctx.fill();
        this.ctx.shadowBlur = 0; // Reset shadow for performance
      }
    }

    // Render Meteors
    for (let j = this.meteors.length - 1; j >= 0; j--) {
      const m = this.meteors[j];
      m.x += Math.cos(m.angle) * m.speed;
      m.y += Math.sin(m.angle) * m.speed;
      m.alpha -= m.fade;

      if (m.alpha <= 0 || m.x > this.width + 100 || m.y > this.height + 100) {
        this.meteors.splice(j, 1);
        continue;
      }

      const tailX = m.x - Math.cos(m.angle) * m.length;
      const tailY = m.y - Math.sin(m.angle) * m.length;

      const meteorGrad = this.ctx.createLinearGradient(m.x, m.y, tailX, tailY);
      meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
      meteorGrad.addColorStop(0.3, `rgba(103, 232, 249, ${m.alpha * 0.7})`);
      meteorGrad.addColorStop(1, `rgba(168, 85, 247, 0)`);

      this.ctx.beginPath();
      this.ctx.strokeStyle = meteorGrad;
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      this.ctx.moveTo(m.x, m.y);
      this.ctx.lineTo(tailX, tailY);
      this.ctx.stroke();

      // Meteor head spark
      this.ctx.beginPath();
      this.ctx.arc(m.x, m.y, 2.5, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
      this.ctx.shadowColor = '#67e8f9';
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }
  }

  animate(timestamp) {
    this.updatePhysics(timestamp);
    this.render(timestamp);
    requestAnimationFrame((t) => this.animate(t));
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.spaceCanvas = new SpaceCanvasEngine('space-canvas');
});

