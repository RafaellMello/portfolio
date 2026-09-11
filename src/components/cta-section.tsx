'use client';

import { motion } from 'motion/react';
import { Eyebrow } from '@/components/section-title';
import { CtaButton } from '@/components/cta-button';
import { fadeUp, staggerContainer } from '@/lib/motion';

export function CtaSection() {
	return (
		<section id="contato" className="py-24 sm:py-28 lg:py-24">
			<motion.div
				variants={staggerContainer(0.4)}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.4 }}
				className="relative flex flex-col items-center gap-3 overflow-hidden rounded-3xl border border-white/15 bg-card px-6 py-16 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.3)] sm:py-20"
			>
				{/* Borda "liquid glass" — só o aro, o resto do card continua opaco igual antes */}
				<span
					aria-hidden
					className="pointer-events-none absolute inset-x-4 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
				/>
				<div
					className="absolute inset-0 bg-cover bg-center opacity-20"
					style={{ backgroundImage: "url('/code-bg.jpg')" }}
				/>
				<div className="absolute inset-0 [background:linear-gradient(180deg,rgba(5,7,12,0.65),var(--card)_65%)]" />

				<div className="relative z-[1] flex flex-col items-center gap-5 sm:gap-3">
					<motion.span variants={fadeUp}>
						<Eyebrow>Contact Us</Eyebrow>
					</motion.span>
					<motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
						Vamos Construir Seu Projeto?
					</motion.h2>
					<motion.p variants={fadeUp} className="max-w-[480px] text-muted-foreground">
						Fale conosco pelo WhatsApp e receba uma proposta personalizada
						para o seu site ou sistema.
					</motion.p>
					<motion.div variants={fadeUp}>
						<CtaButton
							href="https://wa.me/5521998665233?text=Quero%20fazer%20um%20Or%C3%A7amento%20de%20um%20Projeto!"
							target="_blank"
							rel="noopener noreferrer"
							className="mt-2 !border-primary !bg-primary !text-primary-foreground"
						>
							Entrar em Contato
						</CtaButton>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
