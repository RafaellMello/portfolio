'use client';

/**
 * REPAGINAÇÃO TESTE — "Liquid Glass"
 * Rota isolada (/liquid-glass), não afeta a home nem nenhum componente
 * real do site. Reaproveita cópia/imagens/dados dos componentes originais
 * (stats, projects, plans) mas com uma linguagem visual nova: painéis
 * translúcidos com blur pesado, aro especular no topo, glint de luz no
 * hover e blobs coloridos passando atrás pra dar o que "refratar".
 * Serve só pra avaliação — nada aqui é definitivo.
 */

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/icons/brand-icons';
import { stats } from '@/components/about-section';
import { projects } from '@/components/portfolio-section';
import { plans } from '@/components/plans-section';

const PANEL =
	'relative overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.05] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.3),0_20px_60px_rgba(0,0,0,0.5)]';

const PILL =
	'group/pill relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(0,0,0,0.25),0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20';

/** Aro especular (linha de luz no topo) — a "borda" que todo painel de
 * vidro líquido tem, mais visível nos cantos. */
function GlassRim() {
	return (
		<span
			aria-hidden
			className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
		/>
	);
}

/** Glint diagonal que varre o painel no hover — o "brilho" líquido. */
function GlassSheen() {
	return (
		<span
			aria-hidden
			className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.4)_50%,transparent_65%)] transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
		/>
	);
}

function GlassBackdrop() {
	const blobs = [
		{ color: 'rgba(0,212,255,0.35)', size: 560, top: '-10%', left: '-8%', dur: 22 },
		{ color: 'rgba(168,85,247,0.3)', size: 620, top: '20%', left: '65%', dur: 26 },
		{ color: 'rgba(255,45,149,0.22)', size: 480, top: '60%', left: '10%', dur: 30 },
		{ color: 'rgba(0,212,255,0.2)', size: 500, top: '75%', left: '70%', dur: 24 },
	];
	return (
		<div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#05070c]">
			{blobs.map((b, i) => (
				<motion.div
					key={i}
					className="absolute rounded-full blur-[120px]"
					style={{
						width: b.size,
						height: b.size,
						top: b.top,
						left: b.left,
						background: b.color,
					}}
					animate={{
						x: [0, 40, -30, 0],
						y: [0, -30, 20, 0],
					}}
					transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
				/>
			))}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,7,12,0.6)_100%)]" />
		</div>
	);
}

const navLinks = [
	{ href: '#sobre-lg', label: 'Sobre' },
	{ href: '#portfolio-lg', label: 'Portfólio' },
	{ href: '#planos-lg', label: 'Serviços' },
];

export default function LiquidGlassTestPage() {
	return (
		<div className="relative min-h-screen text-foreground">
			<GlassBackdrop />

			{/* Aviso de que é uma página de teste, com volta pro site real */}
			<Link
				href="/"
				className="fixed bottom-5 left-1/2 z-[200] -translate-x-1/2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium text-foreground backdrop-blur-xl transition hover:bg-white/20 sm:bottom-6"
			>
				🧪 Teste — Liquid Glass · voltar ao site
			</Link>

			{/* NAV — cápsula flutuante centralizada */}
			<nav className="fixed inset-x-0 top-5 z-[100] flex justify-center px-4">
				<div className="flex items-center gap-5 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2.5 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_30px_rgba(0,0,0,0.4)] sm:gap-7 sm:px-6">
					<a href="#top-lg" className="block h-8 w-8 overflow-hidden rounded-full border border-white/30 bg-black">
						<Image
							src="/favicon.png"
							alt="Rafael Mello"
							width={32}
							height={32}
							className="h-[118%] w-[118%] -m-[9%] object-cover"
						/>
					</a>
					{navLinks.map((l) => (
						<a
							key={l.href}
							href={l.href}
							className="hidden text-xs font-light uppercase tracking-[0.15em] text-muted-foreground transition hover:text-foreground sm:inline-flex"
						>
							{l.label}
						</a>
					))}
					<a
						href="https://wa.me/5521998665233?text=Quero%20fazer%20um%20Or%C3%A7amento%20de%20um%20Projeto!"
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-xl transition hover:bg-white/20"
					>
						Contato
					</a>
				</div>
			</nav>

			<main className="mx-auto flex w-[90vw] max-w-6xl flex-col gap-28 pb-32 pt-40 sm:gap-36">
				{/* HERO */}
				<header id="top-lg" className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.3fr_0.7fr]">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="flex flex-col items-start gap-5 text-left"
					>
						<span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-[2px] text-muted-foreground backdrop-blur-xl">
							Front-End Developer
						</span>
						<h1 className="text-6xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl lg:text-8xl">
							Rafael Mello
						</h1>
						<p className="max-w-[600px] text-lg leading-relaxed text-muted-foreground sm:text-xl">
							Desenvolvo sites e sistemas que unem design, estratégia e
							tecnologia, pensados para escalar vendas, fortalecer marcas e
							gerar resultado real.
						</p>
						<div className="mt-2 flex flex-wrap items-center gap-4">
							<a href="#portfolio-lg" className={PILL}>
								<GlassSheen />
								Ver Portfólio
							</a>
							<a
								href="https://wa.me/5521998665233?text=Quero%20fazer%20um%20Or%C3%A7amento%20de%20um%20Projeto!"
								target="_blank"
								rel="noopener noreferrer"
								className={`${PILL} !bg-primary/25 !border-primary/40`}
							>
								<GlassSheen />
								Entrar em Contato
							</a>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6 }}
						className="relative flex justify-center"
					>
						<div className="absolute h-[380px] w-[380px] rounded-full bg-primary/15 blur-[80px]" />
						<div className="relative h-[280px] w-[280px] overflow-hidden rounded-full border-2 border-white/30 shadow-[inset_0_2px_0_rgba(255,255,255,0.4),0_20px_60px_rgba(0,0,0,0.5)] sm:h-[320px] sm:w-[320px]">
							<Image src="/euia.jpg" alt="Rafael Mello" fill sizes="320px" className="object-cover" priority />
							<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.25)_0%,transparent_35%)]" />
						</div>
					</motion.div>
				</header>

				{/* MARQUEE — faixa de chips de vidro */}
				<div className="flex flex-wrap justify-center gap-3">
					{['Landing Pages', 'Sites Institucionais', 'Sistemas Customizados', 'R$1M+ Gerado', 'SEO & Performance'].map(
						(item) => (
							<span
								key={item}
								className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-[0.1em] text-muted-foreground backdrop-blur-xl"
							>
								{item}
							</span>
						)
					)}
				</div>

				{/* SOBRE */}
				<section id="sobre-lg" className="flex flex-col gap-6">
					<h2 className="text-center text-4xl font-bold tracking-[-0.02em] sm:text-5xl">Quem Desenvolve</h2>
					<div className="grid grid-cols-1 gap-5 md:grid-cols-[1.2fr_1fr]">
						<div className={`group ${PANEL} flex flex-col justify-center gap-3 p-8`}>
							<GlassRim />
							<GlassSheen />
							<h3 className="text-[1.7rem] font-bold leading-[1.12] tracking-[-0.025em] sm:text-[2.1rem]">
								Design elegante.
								<br />
								Código limpo.
								<br />
								Resultado real.
							</h3>
							<p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
								Especializados em landing pages, sites institucionais e sistemas
								sob medida — com foco em performance, conversão e credibilidade visual.
							</p>
						</div>
						<div className="flex flex-col gap-5">
							{stats.map((stat) => (
								<div key={stat.number} className={`group ${PANEL} flex-1 p-6`}>
									<GlassRim />
									<GlassSheen />
									<span className="mb-1.5 block text-xl font-bold tracking-[-0.01em] text-primary">
										{stat.number}
									</span>
									<span className="text-sm leading-relaxed text-muted-foreground">{stat.label}</span>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* PORTFÓLIO */}
				<section id="portfolio-lg" className="flex flex-col gap-8">
					<h2 className="text-center text-4xl font-bold tracking-[-0.02em] sm:text-5xl">Portfólio</h2>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{projects.map((p) => (
							<a
								key={p.title}
								href={p.href}
								target="_blank"
								rel="noopener noreferrer"
								className={`group ${PANEL} flex flex-col`}
							>
								<GlassRim />
								<GlassSheen />
								<div className="relative aspect-video overflow-hidden">
									<Image
										src={p.image}
										alt={p.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105"
										style={{ objectPosition: p.objectPosition ?? 'center' }}
										sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
								</div>
								<div className="flex items-center justify-between gap-2 p-5">
									<span className="text-sm font-semibold">{p.title}</span>
									<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-xl transition group-hover:bg-white/20">
										<ArrowUpRight className="size-4" />
									</span>
								</div>
							</a>
						))}
					</div>
				</section>

				{/* PLANOS */}
				<section id="planos-lg" className="flex flex-col gap-8">
					<h2 className="text-center text-4xl font-bold tracking-[-0.02em] sm:text-5xl">Seu Site, Sua Vitrine</h2>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{plans.map((plan) => (
							<div key={plan.title} className={`group ${PANEL} flex h-full flex-col p-8`}>
								<GlassRim />
								<GlassSheen />
								<div className="mb-5 text-center">
									<h3 className="mb-2 text-xl font-bold">{plan.title}</h3>
									<p className="text-sm text-muted-foreground">{plan.sub}</p>
								</div>
								<div className="mb-5 border-t border-white/10" />
								<ul className="mb-6 flex-grow space-y-3">
									{plan.features.slice(0, 5).map((f) => (
										<li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85">
											<span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
												<ArrowRight className="size-3" strokeWidth={2.5} />
											</span>
											{f}
										</li>
									))}
								</ul>
								<a
									href={plan.whatsapp}
									target="_blank"
									rel="noopener noreferrer"
									className={`${PILL} w-full`}
								>
									<GlassSheen />
									Ver Mais
								</a>
							</div>
						))}
					</div>
				</section>

				{/* CTA FINAL */}
				<section id="contato-lg" className={`group ${PANEL} flex flex-col items-center gap-3 px-6 py-16 text-center sm:py-20`}>
					<GlassRim />
					<GlassSheen />
					<div
						className="absolute inset-0 -z-[1] bg-cover bg-center opacity-15"
						style={{ backgroundImage: "url('/code-bg.jpg')" }}
					/>
					<span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-[2px] text-muted-foreground backdrop-blur-xl">
						Contact Us
					</span>
					<h2 className="text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Vamos Construir Seu Projeto?</h2>
					<p className="max-w-[480px] text-muted-foreground">
						Me chame no WhatsApp e receba um orçamento sob medida para o seu site ou sistema.
					</p>
					<a
						href="https://wa.me/5521998665233?text=Quero%20fazer%20um%20Or%C3%A7amento%20de%20um%20Projeto!"
						target="_blank"
						rel="noopener noreferrer"
						className={`${PILL} mt-2 !bg-primary/25 !border-primary/40`}
					>
						<GlassSheen />
						Entrar em Contato
					</a>
				</section>

				{/* FOOTER */}
				<footer className={`group ${PANEL} flex flex-col items-center gap-6 px-6 py-10 text-center`}>
					<GlassRim />
					<div className="flex items-center gap-4">
						<a
							href="https://github.com/rafaellmello"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
							className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-muted-foreground backdrop-blur-xl transition hover:text-foreground"
						>
							<GithubIcon className="h-5 w-5" />
						</a>
						<a
							href="https://www.linkedin.com/in/rafael-mello-a5b22330b/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-muted-foreground backdrop-blur-xl transition hover:text-foreground"
						>
							<LinkedinIcon className="h-5 w-5" />
						</a>
						<a
							href="https://instagram.com/rafaelmello.dev"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
							className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-muted-foreground backdrop-blur-xl transition hover:text-foreground"
						>
							<InstagramIcon className="h-5 w-5" />
						</a>
					</div>
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} Rafael Mello. Todos os direitos reservados.
					</p>
				</footer>
			</main>
		</div>
	);
}
