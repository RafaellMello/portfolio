import type { Variants } from 'motion/react';

/**
 * Variants compartilhadas pro padrão de reveal do site: o pai declara
 * `variants` + dispara `initial`/`whileInView` (ou `animate`, no caso do
 * Hero) — os filhos só declaram `variants` (sem o próprio gatilho) e
 * HERDAM o estado hidden/visible do pai. Evita o bug de observers de
 * viewport aninhados disparando de forma independente (mesmo padrão já
 * usado em section-title.tsx).
 */
export function staggerContainer(stagger = 0.1, delayChildren = 0): Variants {
	return {
		hidden: {},
		visible: { transition: { staggerChildren: stagger, delayChildren } },
	};
}

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const fadeUpSoft: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};
