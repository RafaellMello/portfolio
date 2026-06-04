gsap.registerPlugin(ScrollTrigger);

const isDesktop = window.matchMedia('(pointer: fine)').matches;

// ─── Prevent FOUC: container visível, filhos do hero escondidos ──────────
gsap.set('.container', { opacity: 1 });
gsap.set(['.profile-image', 'h1', '.profile-section h2', '.logo', '.social-icon', '.pitch-section', '.card-menu'], { opacity: 0 });

// ─── Hero Entrance Timeline ───────────────────────────────────────────────
const heroTl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power3.out' } });

heroTl
  .fromTo('.profile-image',
    { scale: 0.85, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
  )
  .fromTo('h1',
    { y: 20, opacity: 0, filter: 'blur(6px)' },
    { y: 0,  opacity: 1, filter: 'blur(0px)', duration: 0.4 },
    '-=0.35'
  )
  .fromTo('.profile-section h2',
    { y: 12, opacity: 0 },
    { y: 0,  opacity: 1, duration: 0.32 },
    '-=0.28'
  )
  .fromTo('.logo',
    { y: 15, opacity: 0, scale: 0.5, rotation: -10 },
    { y: 0,  opacity: 1, scale: 1, rotation: 0, duration: 0.28, stagger: 0.05, ease: 'back.out(2.8)' },
    '-=0.2'
  )
  .fromTo('.social-icon',
    { y: 12, opacity: 0, scale: 0.5 },
    { y: 0,  opacity: 1, scale: 1, duration: 0.22, stagger: 0.06, ease: 'back.out(2.2)' },
    '-=0.12'
  )
  .fromTo('.pitch-section',
    { y: 15, opacity: 0 },
    { y: 0,  opacity: 1, duration: 0.32 },
    '-=0.2'
  )
  .fromTo('.card-menu',
    { y: 12, opacity: 0 },
    { y: 0,  opacity: 1, duration: 0.28 },
    '-=0.24'
  )
  .call(() => {
    gsap.fromTo('.profile-image',
      { boxShadow: '0 0 0px rgba(0,148,255,0), 0 0 0px rgba(0,80,200,0)' },
      {
        boxShadow: '0 0 30px rgba(0,148,255,0.65), 0 0 60px rgba(0,80,200,0.3)',
        duration: 1.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      }
    );

    gsap.to('.section', {
      boxShadow: '0 0 22px rgba(255,255,255,0.1), 0 0 48px rgba(0,140,255,0.1)',
      borderColor: 'rgba(255,255,255,0.48)',
      duration: 1.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
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
