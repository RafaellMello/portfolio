'use client';

import { useEffect, useRef } from 'react';

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	size: number;
	isGlass: boolean;
}

const PARTICLE_COUNT = 320;
const SCATTER_RADIUS = 280;
const FRICTION = 0.95;

/**
 * ASMR Background (referência: 21st.dev/@ashishrajwaniai01/components/asmr-background,
 * adaptado — trocado o vórtice/redemoinho original por um espalhamento)
 * — partículas em formato de diamante: parte "poeira de carvão" (escura),
 * parte "estilhaço de vidro" (mais clara), em cinza neutro — sem cor de
 * marca aqui, pra manter o site mais monocromático.
 * Reagem ao mouse se espalhando pra fora dele (repulsão radial pura, sem
 * componente tangencial/giro), com atrito/desaceleração e um brilho
 * ("friction glow") que só acende em partículas acelerando. Rastro
 * de movimento via véu semitransparente por cima do frame anterior, não
 * clearRect. Um jitter ambiente bem sutil mantém alguma vida mesmo sem
 * interação (senão, com atrito puro, tudo para e vira ponto morto).
 * Sem JS ou com motion reduzido: cai pro gradiente escuro simples do body.
 */
export function AsmrBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let width = 0;
		let height = 0;
		let particles: Particle[] = [];
		let raf = 0;
		const mouse = { x: -9999, y: -9999, active: false };

		function spawnParticle(): Particle {
			const isGlass = Math.random() < 0.3;
			return {
				x: Math.random() * width,
				y: Math.random() * height,
				vx: 0,
				vy: 0,
				size: isGlass ? 1.4 + Math.random() * 2 : 1 + Math.random() * 1.6,
				isGlass,
			};
		}

		function resize() {
			if (!canvas) return;
			width = window.innerWidth;
			height = window.innerHeight;
			const dpr = window.devicePixelRatio || 1;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

			if (ctx) {
				ctx.fillStyle = '#05070c';
				ctx.fillRect(0, 0, width, height);
			}

			particles = Array.from({ length: PARTICLE_COUNT }, spawnParticle);
		}

		function drawDiamond(x: number, y: number, size: number) {
			ctx!.beginPath();
			ctx!.moveTo(x, y - size);
			ctx!.lineTo(x + size, y);
			ctx!.lineTo(x, y + size);
			ctx!.lineTo(x - size, y);
			ctx!.closePath();
		}

		function tick() {
			if (!ctx) return;

			// Rastro: véu quase transparente por cima do frame anterior.
			ctx.fillStyle = 'rgba(5, 7, 12, 0.16)';
			ctx.fillRect(0, 0, width, height);

			for (const p of particles) {
				if (mouse.active) {
					const dx = p.x - mouse.x;
					const dy = p.y - mouse.y;
					const dist = Math.hypot(dx, dy) || 1;
					if (dist < SCATTER_RADIUS) {
						const force = 1 - dist / SCATTER_RADIUS;
						// empurra pra FORA do cursor — espalha, não gira em
						// volta (sem componente tangencial, sem puxão pro centro)
						p.vx += (dx / dist) * force * 1.3;
						p.vy += (dy / dist) * force * 1.3;
					}
				}

				// jitter ambiente bem sutil — sem isso, atrito puro faz tudo
				// parar e virar ponto morto quando ninguém mexe o mouse
				p.vx += (Math.random() - 0.5) * 0.018;
				p.vy += (Math.random() - 0.5) * 0.018;

				p.vx *= FRICTION;
				p.vy *= FRICTION;
				p.x += p.vx;
				p.y += p.vy;

				if (p.x < 0) p.x = width;
				if (p.x > width) p.x = 0;
				if (p.y < 0) p.y = height;
				if (p.y > height) p.y = 0;

				const speed = Math.hypot(p.vx, p.vy);
				const glow = Math.min(speed * 3, 5);

				// Neutro (cinza) — a cor de destaque do site fica só nos
				// colchetes [ ] e nos botões, não espalhada no fundo.
				ctx.fillStyle = p.isGlass ? 'rgba(180, 185, 195, 0.24)' : 'rgba(70, 72, 78, 0.38)';
				if (glow > 1.5) {
					ctx.shadowBlur = glow;
					ctx.shadowColor = 'rgba(180, 185, 195, 0.35)';
				} else {
					ctx.shadowBlur = 0;
				}

				drawDiamond(p.x, p.y, p.size);
				ctx.fill();
			}
			ctx.shadowBlur = 0;

			raf = requestAnimationFrame(tick);
		}

		function onMove(e: PointerEvent) {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
			mouse.active = true;
		}
		function onLeave() {
			mouse.active = false;
		}

		resize();
		tick();
		window.addEventListener('resize', resize);
		window.addEventListener('pointermove', onMove);
		window.addEventListener('pointerleave', onLeave);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', resize);
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('pointerleave', onLeave);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 -z-10"
		/>
	);
}
