'use client';

import { motion } from 'motion/react';
import { SectionHead } from '@/components/section-title';
import { fadeUp, fadeUpSoft, staggerContainer } from '@/lib/motion';

export const stats = [
	{
		number: 'R$ 1M+',
		label: 'em faturamento gerado através de landing pages entregues',
	},
	{
		number: 'Alto Padrão',
		label: 'precisão técnica, prazos cumpridos e comunicação direta em cada etapa',
	},
	{
		number: 'SEO & Performance',
		label: 'sites rápidos, estruturados e otimizados para buscadores desde a base',
	},
];

export function AboutSection() {
	return (
		<section id="sobre" className="py-24 sm:py-28 lg:py-24">
			<SectionHead eyebrow="About Me" title="Quem Desenvolve" />

			<div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr] md:grid-rows-3">
				<motion.div
					variants={staggerContainer(0.18)}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					className="flex flex-col justify-center gap-3 rounded-3xl border border-border bg-card p-8 md:col-start-1 md:row-span-3"
				>
					<motion.h3
						variants={fadeUp}
						className="text-[1.7rem] font-bold leading-[1.12] tracking-[-0.025em] sm:text-[2.3rem]"
					>
						Design elegante.
						<br />
						Código limpo.
						<br />
						Resultado real.
					</motion.h3>
					<motion.div variants={fadeUp} className="mt-2 space-y-3 text-[0.95rem] leading-relaxed text-muted-foreground">
						<p>
							Somos especializados no desenvolvimento de landing pages, sites
							institucionais e sistemas sob medida, com foco em performance,
							conversão e credibilidade visual.
						</p>
						<p>
							Entregas de landing pages que ultrapassam R$ 1 milhão em
							faturamento gerado, além de projetos para administrações
							municipais e empresas de grande porte, nos quais responsabilidade
							e padrão profissional elevado são exigências constantes.
						</p>
					</motion.div>
				</motion.div>

				{stats.map((stat, i) => (
					<motion.div
						key={stat.number}
						variants={staggerContainer(0.08, i * 0.1)}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.4 }}
						className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-border bg-card p-6 pl-7 transition-colors hover:border-white/25 md:col-start-2"
						style={{ gridRow: i + 1 }}
					>
						<span className="absolute inset-y-0 left-0 w-1.5 bg-primary" />
						<motion.span
							variants={fadeUpSoft}
							className="mb-1.5 text-2xl font-bold tracking-[-0.01em] text-foreground"
						>
							{stat.number}
						</motion.span>
						<motion.span variants={fadeUpSoft} className="text-sm leading-relaxed text-muted-foreground">
							{stat.label}
						</motion.span>
					</motion.div>
				))}
			</div>
		</section>
	);
}
