'use client';

import { motion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

export function Eyebrow({ children }: { children: ReactNode }) {
	return (
		<span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[2px] text-muted-foreground">
			<span className="text-primary">[</span>
			{children}
			<span className="text-primary">]</span>
		</span>
	);
}

/* Um único observer de viewport no elemento pai (ver SectionHead abaixo);
 * os filhos só declaram "variants" e HERDAM o estado hidden/visible do pai
 * — nenhum filho monta o próprio observer. Isso evita o bug de observers
 * aninhados não disparando de forma independente (o título sumindo). */
const fadeUpVariant: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const wipeVariant: Variants = {
	hidden: { clipPath: 'inset(0 100% 0 0)' },
	visible: {
		clipPath: 'inset(0 0% 0 0)',
		transition: { duration: 0.9, ease: [0.7, 0, 0.15, 1] },
	},
};

const headVariant: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.12 } },
};

export function SectionHead({
	eyebrow,
	title,
	sub,
}: {
	eyebrow: string;
	title: string;
	sub?: string;
}) {
	return (
		<motion.div
			variants={headVariant}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.4 }}
			className="mx-auto mb-12 flex max-w-xl flex-col items-center gap-3 text-center sm:mb-16"
		>
			<motion.span variants={fadeUpVariant}>
				<Eyebrow>{eyebrow}</Eyebrow>
			</motion.span>
			<motion.h2
				variants={wipeVariant}
				className="text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl"
			>
				{title}
			</motion.h2>
			{sub && (
				<motion.p variants={fadeUpVariant} className="text-base text-muted-foreground">
					{sub}
				</motion.p>
			)}
		</motion.div>
	);
}
