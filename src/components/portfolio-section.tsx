'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SectionHead } from '@/components/section-title';

/** Marca de mira no canto, meio pra fora da borda do card — como uma marca
 * de agrimensura em planta técnica. Reforça o mood "blueprint/developer"
 * já estabelecido pelos colchetes [ ] do site. */
function CrossDecor({ position }: { position: 'top-start' | 'bottom-end' }) {
	return (
		<svg
			aria-hidden
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1"
			strokeLinecap="round"
			className={`pointer-events-none absolute z-20 size-3.5 text-border transition-colors duration-300 group-hover:text-foreground/60 ${
				position === 'top-start'
					? '-translate-x-1/2 -translate-y-1/2 left-0 top-0'
					: 'translate-x-1/2 translate-y-1/2 bottom-0 right-0'
			}`}
		>
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</svg>
	);
}

export interface Project {
	title: string;
	flag: 'br' | 'us';
	image: string;
	video?: string;
	href: string;
	objectPosition?: 'center' | 'top';
}

export const projects: Project[] = [
	{
		title: 'Portal do Contribuinte - PMDC',
		flag: 'br',
		image: '/pmdc.png',
		video: '/videoportal.mp4',
		href: 'https://portalcontribuinte.duquedecaxias.rj.gov.br',
	},
	{
		title: "Giuseppe's Pizzeria",
		flag: 'us',
		image: '/giuseppe.png',
		href: 'https://www.giuseppespizzerianc.com/',
	},
	{
		title: 'Micro-SaaS PraiseHub',
		flag: 'br',
		image: '/praisehub.png',
		href: 'https://praisehub.vercel.app/',
	},
	{
		title: 'ACTOP GEO Engenharia',
		flag: 'br',
		image: '/ACTOPGEO.png',
		href: 'https://eng.actopgeo.com/fundacao/',
		objectPosition: 'top',
	},
	{
		title: 'Farmácia PharmaZoe',
		flag: 'br',
		image: '/pharmazoe1.png',
		video: '/videopharmazoe.mp4',
		href: 'https://pharmazoe.com.br/',
	},
	{
		title: 'Landing Page Fiorelle',
		flag: 'br',
		image: '/fiorelle.png',
		href: 'https://fiorelle.vercel.app/',
	},
];

export function PortfolioSection() {
	return (
		<section id="portfolio" className="py-24 sm:py-28 lg:py-24">
			<SectionHead
				eyebrow="Works"
				title="Portfólio"
				sub="Projetos reais, em produção, para clientes de diferentes segmentos."
			/>

			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{projects.map((project, i) => (
					<PortfolioCard key={project.title} project={project} index={i} />
				))}
			</div>
		</section>
	);
}

function PortfolioCard({ project, index }: { project: Project; index: number }) {
	const cardRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [hovered, setHovered] = useState(false);

	// Zoom contínuo ligado ao scroll (1.15 → 1) enquanto o card atravessa a
	// tela — sempre coberto pelo overflow-hidden do frame, nunca "estoura".
	const { scrollYProgress } = useScroll({
		target: cardRef,
		offset: ['start end', 'end start'],
	});
	const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

	const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
		e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
	};

	return (
		<motion.article
			ref={cardRef}
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.25 }}
			transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
			onPointerMove={handlePointerMove}
			className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,box-shadow] hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
			onMouseEnter={() => {
				setHovered(true);
				videoRef.current?.play().catch(() => {});
			}}
			onMouseLeave={() => {
				setHovered(false);
				if (!videoRef.current) return;
				videoRef.current.pause();
				videoRef.current.currentTime = 0;
			}}
		>
			<CrossDecor position="top-start" />
			<CrossDecor position="bottom-end" />

			{/* Spotlight que segue o cursor — só aparece no hover, some no resto. */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					background:
						'radial-gradient(circle 220px at var(--mx) var(--my), rgba(255,255,255,0.1), transparent 70%)',
				}}
			/>

			<div className="relative aspect-video overflow-hidden bg-black">
				<motion.div style={{ scale }} className="relative h-full w-full">
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover transition-opacity duration-300"
						style={{
							objectPosition: project.objectPosition ?? 'center',
							opacity: project.video && hovered ? 0 : 1,
						}}
						sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
					/>
				</motion.div>
				{project.video && (
					<video
						ref={videoRef}
						src={project.video}
						loop
						muted
						playsInline
						preload="none"
						poster={project.image}
						className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
						style={{ opacity: hovered ? 1 : 0 }}
					/>
				)}
			</div>

			<div className="mt-auto flex items-center justify-between gap-3 p-5">
				<h3 className="flex items-center gap-2 text-[1.05rem] font-semibold">
					{project.title}
					<Image
						src={`https://flagcdn.com/w20/${project.flag}.png`}
						alt={project.flag === 'br' ? 'Brasil' : 'Estados Unidos'}
						width={18}
						height={13}
						unoptimized
						className="rounded-[2px]"
					/>
				</h3>
				<a
					href={project.href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Visitar projeto ${project.title}`}
					className="group/link flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
				>
					<ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
				</a>
			</div>
		</motion.article>
	);
}
