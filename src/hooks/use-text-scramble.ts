'use client';

import { useEffect, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#01';
const MAX_DURATION_MS = 1200; // rede de segurança: nunca fica preso embaralhado

/**
 * Efeito "decode": o texto embaralha em caracteres aleatórios e resolve
 * de volta pro texto real, caractere a caractere. Roda uma vez, ao montar.
 * Sem JS/motion reduzido: o texto real já está no DOM (rendered normalmente
 * pelo React), então não tem nada "quebrado" pra esconder.
 *
 * Rede de segurança: requestAnimationFrame pode ficar sem rodar (aba em
 * segundo plano, throttling do navegador, dispositivo lento) — sem isso,
 * o nome fica preso pela metade indefinidamente. Um timeout força o texto
 * final correto depois de MAX_DURATION_MS, não importa o estado do rAF.
 */
export function useTextScramble(text: string, { enabled = true } = {}) {
	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!enabled) return;
		const el = ref.current;
		if (!el) return;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		const queue = [...text].map((to) => ({
			to,
			end: 10 + Math.floor(Math.random() * 20),
			char: '',
		}));

		let frame = 0;
		let raf = 0;
		let done = false;

		const finish = () => {
			if (done) return;
			done = true;
			cancelAnimationFrame(raf);
			clearTimeout(safety);
			el.textContent = text;
		};

		const tick = () => {
			let output = '';
			let complete = 0;
			for (const item of queue) {
				if (item.to === ' ') {
					output += ' ';
					complete++;
					continue;
				}
				if (frame >= item.end) {
					output += item.to;
					complete++;
				} else {
					if (!item.char || Math.random() < 0.3) {
						item.char = CHARS[Math.floor(Math.random() * CHARS.length)];
					}
					output += `<span class="text-primary">${item.char}</span>`;
				}
			}
			el.innerHTML = output;
			if (complete < queue.length) {
				frame++;
				raf = requestAnimationFrame(tick);
			} else {
				finish();
			}
		};

		const safety = setTimeout(finish, MAX_DURATION_MS);

		tick();
		return () => {
			done = true;
			cancelAnimationFrame(raf);
			clearTimeout(safety);
		};
	}, [text, enabled]);

	return ref;
}
