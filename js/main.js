/**
 * ===================================================================
 * DEEP COSMOS // INTERACTIVE SUITE & MICRO-INTERACTION ENGINE
 * Handles sticky navigation, 3D card tilt, cursor spotlight,
 * audio synthesis, filter matrices, and telemetry feedback.
 * ===================================================================
 */

class CosmicSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  toggle() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playBeep(freq = 800, duration = 0.08, type = 'sine') {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  playWarp() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.05, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.3);
      });
    } catch (e) {}
  }
}

// Global Sound Instance
const soundEngine = new CosmicSoundEngine();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation & Header Transitions
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Active Section Highlighting
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // 3. Audio Toggle
  const audioBtn = document.getElementById('audio-toggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      const active = soundEngine.toggle();
      audioBtn.classList.toggle('active', active);
      const text = audioBtn.querySelector('.audio-label');
      if (text) {
        text.textContent = active ? 'AUDIO: ON' : 'AUDIO: OFF';
      }
      if (active) soundEngine.playBeep(900, 0.1);
    });
  }

  // 4. 3D Card Tilt & Cursor Spotlight
  const capsules = document.querySelectorAll('.space-capsule');

  capsules.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update spotlight CSS variables
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Calculate 3D Tilt Angles
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7; // Max tilt 7 deg
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseenter', () => {
      soundEngine.playBeep(1200, 0.04);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
    });
  });

  // 5. Orbital Metric Counters
  const counterElements = document.querySelectorAll('.metric-number');
  let countersAnimated = false;

  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counterElements.forEach(el => {
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const isDecimal = target % 1 !== 0;
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1600; // ms
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.textContent = `${prefix}${isDecimal ? count.toFixed(1) : Math.floor(count)}${suffix}`;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsHUD = document.querySelector('.metrics-hud');
  if (metricsHUD) countUpObserver.observe(metricsHUD);

  // 6. Project Filter Matrix
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-capsule-item');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      soundEngine.playBeep(650, 0.05);

      const category = pill.getAttribute('data-category');

      projectCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 7. Toast Notification Handler
  const showToast = (message) => {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>📡</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 2800);
  };

  // 8. Copy Subspace Frequency (Email)
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email') || 'om.cosmic.dev@galaxy.orbit';
      navigator.clipboard.writeText(email).then(() => {
        soundEngine.playSuccess();
        showToast(`Subspace frequency copied: ${email}`);
      }).catch(() => {
        showToast(`Frequency: ${email}`);
      });
    });
  }

  // 9. Transmission Form Submission (Contact Form)
  const contactForm = document.getElementById('transmission-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      soundEngine.playWarp();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>🛰️ TRANSMITTING SIGNAL...</span>`;

      setTimeout(() => {
        soundEngine.playSuccess();
        submitBtn.innerHTML = `<span>✅ TRANSMISSION CONFIRMED</span>`;
        showToast('Signal successfully received by cosmic relay station!');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 3000);
      }, 1400);
    });
  }

  // 10. Galactic Stardate Generator
  const stardateEl = document.getElementById('galactic-stardate');
  if (stardateEl) {
    const updateStardate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const dayOfYear = Math.floor((now - new Date(year, 0, 0)) / 1000 / 60 / 60 / 24);
      const seconds = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400;
      const stardate = (year + (dayOfYear + seconds) / 365.25).toFixed(2);
      stardateEl.textContent = `STARDATE: ${stardate} // SECTOR-7G // COORD: [42.36°N, 71.05°W]`;
    };
    updateStardate();
    setInterval(updateStardate, 10000);
  }

  // 11. Interactive Buttons Audio Feedback
  document.querySelectorAll('.cosmic-btn, .nav-link, .social-orb-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      soundEngine.playBeep(1400, 0.03);
    });
    btn.addEventListener('click', () => {
      soundEngine.playBeep(880, 0.08);
    });
  });
});

