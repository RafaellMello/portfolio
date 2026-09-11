'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';

/**
 * Scroll suave com inércia (site inteiro). Desliga sozinho se o usuário
 * pediu motion reduzido — nesse caso o scroll nativo do navegador é a
 * opção mais previsível/segura.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		const lenis = new Lenis({
			duration: 1.6, // scroll mais lento/deliberado, ritmo "cinematográfico"
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
		});
		lenisRef.current = lenis;

		let raf = 0;
		const loop = (time: number) => {
			lenis.raf(time);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(raf);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	useEffect(() => {
		// Âncoras (#sobre, #portfolio...) passam a usar o scroll do Lenis,
		// com folga pra compensar a nav fixa no topo.
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const anchor = target.closest('a[href^="#"]');
			if (!anchor) return;
			const id = anchor.getAttribute('href');
			if (!id || id.length < 2) return;
			const section = document.querySelector(id);
			if (!section) return;
			e.preventDefault();
			if (lenisRef.current) {
				lenisRef.current.scrollTo(section as HTMLElement, { offset: -70 });
			} else {
				section.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		};

		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, []);

	return <>{children}</>;
}
