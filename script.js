document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     OPENING SEQUENCE
     ============================================ */

  // Particle canvas for opening
  const particleCanvas = document.getElementById('particle-canvas');
  const pCtx = particleCanvas.getContext('2d');
  let particles = [];
  let animFrame;

  function initParticleCanvas() {
    const size = Math.min(window.innerWidth, window.innerHeight);
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.life = Math.random() * 100 + 50;
      this.maxLife = this.life;
      this.hue = Math.random() > 0.7 ? 45 : 35; // gold-ish
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life--;
      this.opacity = (this.life / this.maxLife) * 0.6;
      if (this.life <= 0) this.reset();
      if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
    }
    draw() {
      pCtx.beginPath();
      pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      pCtx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
      pCtx.fill();
      if (this.size > 1.5) {
        pCtx.shadowBlur = this.size * 4;
        pCtx.shadowColor = `hsla(${this.hue}, 80%, 70%, ${this.opacity * 0.5})`;
        pCtx.fill();
        pCtx.shadowBlur = 0;
      }
    }
  }

  function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animFrame = requestAnimationFrame(animateParticles);
  }

  let openingComplete = false;

  function startParticles() {
    initParticleCanvas();
    createParticles(120);
    animateParticles();
  }

  window.addEventListener('resize', () => {
    if (document.getElementById('opening-overlay').style.display !== 'none' ||
        !document.getElementById('opening-overlay').classList.contains('hidden')) {
      initParticleCanvas();
    }
  });

  // Envelope and wax seal
  const envelopeContainer = document.getElementById('envelope-container');
  const waxSeal = document.getElementById('wax-seal');
  const envelopeFlap = document.getElementById('envelope-flap');
  const palaceDoors = document.getElementById('palace-doors');
  const floralBloom = document.getElementById('floral-bloom');
  const sparkleBurst = document.getElementById('sparkle-burst');
  const openingOverlay = document.getElementById('opening-overlay');
  const mainContent = document.getElementById('main-content');

  // Create sparkles
  function createSparkles() {
    const container = sparkleBurst;
    for (let i = 0; i < 40; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${['#C9A84C', '#F0D78C', '#FFFFFF', '#F4C2C2'][Math.floor(Math.random() * 4)]};
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: 0;
        box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(201,168,76,0.8);
        animation: sparkleAnim ${Math.random() * 2 + 1.5}s ease forwards;
        animation-delay: ${Math.random() * 0.5}s;
      `;
      container.appendChild(sparkle);
    }
  }

  function handleSealClick() {
    if (openingComplete) return;
    openingComplete = true;

    waxSeal.classList.add('clicked');

    setTimeout(() => {
      envelopeFlap.classList.add('open');
    }, 400);

    setTimeout(() => {
      createSparkles();
      sparkleBurst.classList.add('active');
    }, 800);

    setTimeout(() => {
      floralBloom.classList.add('active');
    }, 1200);

    setTimeout(() => {
      envelopeContainer.classList.add('fade-out');
      palaceDoors.classList.add('active');
    }, 2200);

    setTimeout(() => {
      palaceDoors.classList.add('open');
    }, 2600);

    setTimeout(() => {
      openingOverlay.classList.add('fade-out');
      mainContent.classList.add('visible');
    }, 4200);

    setTimeout(() => {
      openingOverlay.classList.add('hidden');
      if (animFrame) cancelAnimationFrame(animFrame);
      initHeroParticles();
      createFloatingPetals();
    }, 5200);
  }

  waxSeal.addEventListener('click', handleSealClick);
  waxSeal.addEventListener('touchend', (e) => { e.preventDefault(); handleSealClick(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!openingComplete) handleSealClick(); }
  });

  // Inject sparkle keyframe
  const sparkleStyle = document.createElement('style');
  sparkleStyle.textContent = `
    @keyframes sparkleAnim {
      0% { transform: scale(0) rotate(0deg); opacity: 0; }
      20% { transform: scale(1.5) rotate(180deg); opacity: 1; }
      80% { transform: scale(1) rotate(360deg); opacity: 0.8; }
      100% { transform: scale(0) rotate(720deg); opacity: 0; }
    }
  `;
  document.head.appendChild(sparkleStyle);

  // Initial page load
  startParticles();

  /* ============================================
     HERO PARTICLES
     ============================================ */
  const heroCanvas = document.getElementById('hero-particles');
  const hCtx = heroCanvas.getContext('2d');
  let heroParticles = [];

  function initHeroCanvas() {
    heroCanvas.width = window.innerWidth;
    heroCanvas.height = window.innerHeight;
  }

  class HeroParticle {
    constructor() {
      this.x = Math.random() * heroCanvas.width;
      this.y = Math.random() * heroCanvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedY = -(Math.random() * 0.5 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.1;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.hue = Math.random() > 0.6 ? 45 : 35;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y < -10) {
        this.y = heroCanvas.height + 10;
        this.x = Math.random() * heroCanvas.width;
      }
    }
    draw() {
      hCtx.beginPath();
      hCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      hCtx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
      hCtx.fill();
      if (this.size > 2) {
        hCtx.shadowBlur = this.size * 5;
        hCtx.shadowColor = `hsla(${this.hue}, 80%, 70%, ${this.opacity * 0.3})`;
        hCtx.fill();
        hCtx.shadowBlur = 0;
      }
    }
  }

  let heroAnimFrame;

  function initHeroParticles() {
    initHeroCanvas();
    heroParticles = [];
    for (let i = 0; i < 60; i++) {
      heroParticles.push(new HeroParticle());
    }
    animateHeroParticles();
  }

  function animateHeroParticles() {
    hCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    heroParticles.forEach(p => {
      p.update();
      p.draw();
    });
    heroAnimFrame = requestAnimationFrame(animateHeroParticles);
  }

  window.addEventListener('resize', () => {
    initHeroCanvas();
    initParticleCanvas();
  });

  /* ============================================
     FLOATING PETALS
     ============================================ */
  function createFloatingPetals() {
    const container = document.getElementById('floating-petals');
    if (!container) return;
    const colors = ['#F4C2C2', '#FDE8E8', '#F0D78C', '#FFFFFF'];
    for (let i = 0; i < 15; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      const size = Math.random() * 15 + 10;
      petal.style.cssText = `
        width: ${size}px;
        height: ${size * 0.8}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 15 + 15}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: ${Math.random() * 0.3 + 0.1};
        transform: rotate(${Math.random() * 360}deg);
      `;
      container.appendChild(petal);
    }
  }

  /* ============================================
     HERO REVEAL ANIMATION
     ============================================ */
  function animateHeroReveal() {
    const texts = document.querySelectorAll('.hero-tagline, .hero-names, .hero-traditional-quote, .hero-romantic-line, .hero-btn, .hero-decor-line');
    texts.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, 5200 + i * 400);
    });
  }

  // Observe when main content becomes visible
  const observer = new MutationObserver(() => {
    if (mainContent.classList.contains('visible')) {
      animateHeroReveal();
      observer.disconnect();
    }
  });
  observer.observe(mainContent, { attributes: true, attributeFilter: ['class'] });

  // Fallback
  setTimeout(animateHeroReveal, 6000);

  /* ============================================
     NAVBAR
     ============================================ */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  /* ============================================
     SCROLL REVEAL
     ============================================ */
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    const threshold = 0.1;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < windowHeight * (1 - threshold) && rect.bottom > 0;
  }

  function revealOnScroll() {
    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-text, .reveal-lr, .reveal-rl, ' +
      '.story-card, .event-card, .countdown-container, ' +
      '.book-gallery.reveal, .details-container, .venue-content, .gallery-item, .family-group, ' +
      '.family-union, .blessing-card, ' +
      '.finale-names, .finale-thanks, .finale-message'
    );

    revealElements.forEach(el => {
      if (isInViewport(el) && !el.classList.contains('visible')) {
        el.classList.add('visible');
      }
    });
  }

  // Initial check
  setTimeout(revealOnScroll, 5500);
  setTimeout(revealOnScroll, 6000);

  // Throttled scroll
  let scrollTimeout;

  /* ============================================
     COUNTDOWN TIMER
     ============================================ */
  const weddingDate = new Date('2026-07-06T11:39:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ============================================
     HERO BUTTON
     ============================================ */
  document.getElementById('hero-btn').addEventListener('click', () => {
    document.getElementById('details').scrollIntoView({ behavior: 'smooth' });
  });

  /* ============================================
      3D COVERFLOW GALLERY
      ============================================ */
  /* ============================================
      BOOK GALLERY
      ============================================ */
  let currentPage = 0;
  let isFlipping = false;
  const bookCover = document.getElementById('book-cover');
  const bookPages = document.getElementById('book-pages');
  const pages = document.querySelectorAll('.book-page');
  const bookFinal = document.getElementById('book-final');
  const bookNav = document.getElementById('book-nav');
  const bookProgress = document.getElementById('book-progress');
  const prevBtn = document.getElementById('book-prev');
  const nextBtn = document.getElementById('book-next');
  const totalPages = pages.length;

  function updateBook() {
    pages.forEach((p, i) => {
      p.classList.remove('active-page', 'flipping');
      p.style.opacity = '';
      p.style.transform = '';
      p.style.pointerEvents = '';

      if (i === currentPage) {
        p.classList.add('active-page');
      } else if (i < currentPage) {
        p.style.opacity = '0';
        p.style.transform = 'scale(0.9) rotateY(-90deg)';
        p.style.pointerEvents = 'none';
      } else {
        p.style.opacity = '0';
        p.style.transform = 'scale(0.95) rotateY(10deg)';
        p.style.pointerEvents = 'none';
      }
    });

    if (bookProgress) {
      bookProgress.textContent = `${currentPage + 1} / ${totalPages}`;
    }
    if (prevBtn) {
      prevBtn.disabled = currentPage === 0;
    }
    if (nextBtn) {
      if (currentPage === totalPages - 1) {
        nextBtn.textContent = '✦';
      } else {
        nextBtn.textContent = '▶';
      }
    }
  }

  if (document.getElementById('book-open-btn')) {
    document.getElementById('book-open-btn').addEventListener('click', () => {
      if (bookCover) bookCover.classList.add('opened');
      if (bookPages) bookPages.classList.add('active');
      if (bookNav) bookNav.classList.add('active');
      currentPage = 0;
      updateBook();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (isFlipping) return;
      if (currentPage === totalPages - 1) {
        showFinalPage();
        return;
      }
      isFlipping = true;
      const current = pages[currentPage];
      if (current) current.classList.add('flipping');
      setTimeout(() => {
        currentPage++;
        updateBook();
        isFlipping = false;
      }, 400);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (isFlipping || currentPage <= 0) return;
      isFlipping = true;
      currentPage--;
      updateBook();
      setTimeout(() => { isFlipping = false; }, 400);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!bookPages || !bookPages.classList.contains('active')) return;
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      if (currentPage < totalPages - 1) {
        if (nextBtn) nextBtn.click();
      } else {
        showFinalPage();
      }
    }
    if (e.key === 'ArrowLeft') {
      if (prevBtn) prevBtn.click();
    }
  });

  function showFinalPage() {
    if (bookPages) bookPages.classList.remove('active');
    if (bookFinal) bookFinal.classList.add('active');
    if (bookNav) bookNav.classList.remove('active');
  }

  if (document.getElementById('book-close-btn')) {
    document.getElementById('book-close-btn').addEventListener('click', () => {
      if (bookFinal) bookFinal.classList.remove('active');
      if (bookCover) bookCover.classList.remove('opened');
      if (bookNav) bookNav.classList.remove('active');
      if (bookPages) bookPages.classList.remove('active');
      currentPage = 0;
      updateBook();
      const gallerySection = document.getElementById('gallery');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  const bookContainer = document.querySelector('.book-gallery');
  if (bookContainer) {
    bookContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    bookContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && nextBtn) nextBtn.click();
        else if (diff < 0 && prevBtn) prevBtn.click();
      }
    }, { passive: true });
  }



  /* ============================================
     STAR FIELD (FINALE)
     ============================================ */
  function createStarField() {
    const container = document.getElementById('finale-stars');
    if (!container) return;
    for (let i = 0; i < 80; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 2 + 1;
      star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${['#FFFFFF', '#F0D78C', '#F4C2C2'][Math.floor(Math.random() * 3)]};
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.1};
        animation: starTwinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
        animation-delay: ${Math.random() * 3}s;
      `;
      container.appendChild(star);
    }
  }

  const starStyle = document.createElement('style');
  starStyle.textContent = `
    @keyframes starTwinkle {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50% { opacity: 0.9; transform: scale(1.5); }
    }
  `;
  document.head.appendChild(starStyle);
  createStarField();

  /* ============================================
     SMOOTH SCROLL FOR NAV LINKS
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ============================================
     WIN RESIZE HANDLER for stars
     ============================================ */
  window.addEventListener('resize', () => {
    const starContainer = document.getElementById('finale-stars');
    if (starContainer) {
      starContainer.innerHTML = '';
      createStarField();
    }
  });

  /* ============================================
     PARALLAX EFFECT ON HERO
     ============================================ */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero-section');
    if (hero && scrollY < hero.offsetHeight) {
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrollY / hero.offsetHeight) * 0.5;
      }
    }
  });

  /* ============================================
     TIMELINE LINE PROGRESS
     ============================================ */
  function updateTimeline() {
    const timelineLine = document.querySelector('.timeline-line');
    const storyCards = document.querySelectorAll('.story-card');
    if (!timelineLine || !storyCards.length) return;

    let visibleCount = 0;
    storyCards.forEach(card => {
      if (card.classList.contains('visible')) visibleCount++;
    });

    const progress = (visibleCount / storyCards.length) * 100;
    // Animate line via gradient stops (already handled in CSS)
  }

  // Integrate timeline update into scroll handler
  const scrollHandler = function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      revealOnScroll();
      updateTimeline();
    }, 50);
  };

  window.removeEventListener('scroll', revealOnScroll);
  window.addEventListener('scroll', scrollHandler);

  /* ============================================
     PREVENT OVERSCROLL ON OPENING
     ============================================ */
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    document.body.style.overflow = '';
  }, 5500);

  /* ============================================
     SECURITY & COPY-PROTECTION HANDLERS
     ============================================ */
  // Disable Right-Click Context Menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  }, false);

  // Disable Keyboard Shortcuts (DevTools, Save, PrintScreen, Copy)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey && (
      e.key === 'u' || e.key === 'U' ||
      e.key === 's' || e.key === 'S' ||
      e.key === 'p' || e.key === 'P' ||
      (e.shiftKey && (e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J' || e.key === 'c' || e.key === 'C'))
    )) {
      e.preventDefault();
      return false;
    }
    
    if (e.key === 'PrintScreen') {
      navigator.clipboard.writeText('');
      e.preventDefault();
      return false;
    }
  });

  // Clear Clipboard on copy attempt
  document.addEventListener('copy', (e) => {
    e.preventDefault();
  });

});
