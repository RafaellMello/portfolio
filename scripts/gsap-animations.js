gsap.registerPlugin(ScrollTrigger);

const isDesktop = window.matchMedia('(pointer: fine)').matches;

// ─── Prevent FOUC: container visível, filhos escondidos ──────────────────
gsap.set('.container', { opacity: 1 });
gsap.set(['.profile-image', 'h1', '.profile-section h2', '.logo', '.social-icon', '.pitch-section', '.card-menu'], { opacity: 0 });
gsap.set('.portfolio-title', { opacity: 0 });
gsap.set(['.section-title', '.card'], { opacity: 0 });
gsap.set('.portfolio-item', { opacity: 0 });

// ─── Hero Entrance Timeline ───────────────────────────────────────────────
const heroTl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power3.out' } });

heroTl
  .fromTo('.profile-image',
    { scale: 0.85, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
  )
  .fromTo('h1',
    { y: 35, opacity: 0, filter: 'blur(10px)' },
    { y: 0,  opacity: 1, filter: 'blur(0px)', duration: 0.8 },
    '-=0.45'
  )
  .fromTo('.profile-section h2',
    { y: 20, opacity: 0 },
    { y: 0,  opacity: 1, duration: 0.6 },
    '-=0.35'
  )
  .fromTo('.logo',
    { y: 30, opacity: 0, scale: 0.3, rotation: -20 },
    { y: 0,  opacity: 1, scale: 1, rotation: 0, duration: 0.55, stagger: 0.09, ease: 'back.out(2.8)' },
    '-=0.25'
  )
  .fromTo('.social-icon',
    { y: 25, opacity: 0, scale: 0.4 },
    { y: 0,  opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2.2)' },
    '-=0.2'
  )
  .fromTo('.pitch-section',
    { y: 28, opacity: 0 },
    { y: 0,  opacity: 1, duration: 0.85 },
    '-=0.1'
  )
  .fromTo('.card-menu',
    { y: 22, opacity: 0 },
    { y: 0,  opacity: 1, duration: 0.6 },
    '-=0.35'
  )
  .call(() => {
    // Glow na foto de perfil
    gsap.to('.profile-image', {
      boxShadow: '0 0 28px rgba(0,148,255,0.55), 0 0 55px rgba(0,80,200,0.22)',
      duration: 2.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // Glow pulse no botão CTA
    gsap.to('.section', {
      boxShadow: '0 0 22px rgba(255,255,255,0.1), 0 0 48px rgba(0,140,255,0.1)',
      borderColor: 'rgba(255,255,255,0.48)',
      duration: 1.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // ScrollTriggers só após o hero terminar
    setupScrollAnimations();
  });

// ─── Logos magnéticas (desktop) ───────────────────────────────────────────
if (isDesktop) {
  document.querySelectorAll('.logo').forEach(logo => {
    logo.addEventListener('mousemove', (e) => {
      const r = logo.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.45;
      const y = (e.clientY - r.top  - r.height / 2) * 0.45;
      gsap.to(logo, { x, y, duration: 0.3, ease: 'power2.out' });
    });
    logo.addEventListener('mouseleave', () => {
      gsap.to(logo, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// ─── Parallax com mouse nas estrelas (desktop) ────────────────────────────
if (isDesktop) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;
    gsap.to('#stars',  { x: x * 0.18, y: y * 0.18, duration: 2.2, ease: 'power1.out' });
    gsap.to('#stars2', { x: x * 0.45, y: y * 0.45, duration: 2.2, ease: 'power1.out' });
    gsap.to('#stars3', { x: x,        y: y,        duration: 2.2, ease: 'power1.out' });
  });
}

// ─── ScrollTriggers (inicializados após o hero terminar) ─────────────────
function setupScrollAnimations() {
  gsap.fromTo('.portfolio-title',
    { opacity: 0, y: 55, letterSpacing: '18px' },
    {
      opacity: 1, y: 0, letterSpacing: '0px',
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.portfolio-section', start: 'top 80%' }
    }
  );

  document.querySelectorAll('.portfolio-item').forEach((item, i) => {
    const fromX = isDesktop ? (i % 2 === 0 ? -70 : 70) : 0;
    const fromY = isDesktop ? 0 : 30;
    gsap.fromTo(item,
      { x: fromX, y: fromY, opacity: 0 },
      {
        x: 0, y: 0, opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  ScrollTrigger.refresh();

  gsap.fromTo('.section-title',
    { opacity: 0, y: 48, filter: 'blur(7px)' },
    {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.plans-section', start: 'top 80%' }
    }
  );

  gsap.fromTo('.card',
    { y: 65, opacity: 0, scale: 0.91 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 0.85,
      stagger: 0.14,
      ease: 'back.out(1.35)',
      scrollTrigger: { trigger: '.cards-container', start: 'top 85%' }
    }
  );
}

// ─── 3D tilt nos portfolio items (desktop) ────────────────────────────────
if (isDesktop) {
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const r  = item.getBoundingClientRect();
      const rx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      const ry = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      gsap.to(item, {
        rotationY: rx * 9,
        rotationX: ry * -9,
        transformPerspective: 900,
        transformOrigin: 'center center',
        duration: 0.35,
        ease: 'power2.out'
      });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { rotationY: 0, rotationX: 0, duration: 0.65, ease: 'power3.out' });
    });
  });
}
