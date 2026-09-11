'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Eyebrow } from '@/components/section-title';
import { CtaButton, SecondaryButton } from '@/components/cta-button';
import { useTextScramble } from '@/hooks/use-text-scramble';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/icons/brand-icons';
import { fadeUp, staggerContainer } from '@/lib/motion';

const stack = [
	{ src: '/html51.png', alt: 'HTML5' },
	{ src: '/css1.png', alt: 'CSS3' },
	{ src: '/js.png', alt: 'JavaScript' },
	{ src: '/react.png', alt: 'React' },
];

const socials = [
	{ href: 'https://github.com/rafaellmello', label: 'GitHub de Rafael Mello', Icon: GithubIcon },
	{
		href: 'https://www.linkedin.com/in/rafael-mello-a5b22330b/',
		label: 'LinkedIn de Rafael Mello',
		Icon: LinkedinIcon,
	},
	{ href: 'https://instagram.com/rafaelmello.dev', label: 'Instagram de Rafael Mello', Icon: InstagramIcon },
];

function ProfilePhoto({ className = '' }: { className?: string }) {
	return (
		<div className={`relative flex justify-center ${className}`}>
			<div className="absolute h-[380px] w-[380px] rounded-full bg-white/8 blur-2xl" />
			<div className="relative h-[280px] w-[280px] overflow-hidden rounded-full border-2 border-white/20 shadow-2xl sm:h-[340px] sm:w-[340px]">
				<Image
					src="/euia.jpg"
					alt="Foto de perfil de Rafael Mello"
					fill
					sizes="340px"
					className="object-cover"
					priority
				/>
			</div>
		</div>
	);
}

export function Hero() {
	const nameRef = useTextScramble('Rafael Mello');

	return (
		<header id="topo" className="flex min-h-[100svh] items-center py-24">
			<div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-[1.3fr_0.7fr]">
				<motion.div
					variants={staggerContainer(0.1, 0.1)}
					initial="hidden"
					animate="visible"
					className="flex flex-col items-start gap-4 text-left"
				>
					<motion.span variants={fadeUp}>
						<Eyebrow>Front-End Developer</Eyebrow>
					</motion.span>

					<motion.h1
						variants={fadeUp}
						className="text-6xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl lg:text-8xl"
					>
						<span ref={nameRef}>Rafael Mello</span>
					</motion.h1>

					{/* No mobile a foto entra aqui, entre o nome e o parágrafo; no
					    desktop ela some daqui e vive na coluna da direita. */}
					<motion.div variants={fadeUp} className="w-full md:hidden">
						<ProfilePhoto />
					</motion.div>

					<motion.p
						variants={fadeUp}
						className="max-w-[600px] text-lg leading-relaxed text-muted-foreground sm:text-xl"
					>
						Desenvolvo sites e sistemas que unem design, estratégia e
						tecnologia, pensados para escalar vendas, fortalecer marcas e
						gerar resultado real.
					</motion.p>

					<motion.div variants={fadeUp} className="mt-2 hidden flex-wrap items-center gap-4 sm:flex">
						<CtaButton href="#portfolio" size="lg">Ver Portfólio</CtaButton>
						<SecondaryButton
							href="https://wa.me/5521998665233?text=Quero%20fazer%20um%20Or%C3%A7amento%20de%20um%20Projeto!"
							target="_blank"
							rel="noopener noreferrer"
							size="lg"
						>
							Entrar em Contato
						</SecondaryButton>
					</motion.div>

					<motion.div
						variants={fadeUp}
						className="mt-4 flex flex-wrap items-center justify-center gap-6 border-t border-border pt-4 md:justify-start"
					>
						<div className="flex items-center gap-3 border-r border-border pr-6">
							{stack.map((logo) => (
								<Image
									key={logo.alt}
									src={logo.src}
									alt={logo.alt}
									width={42}
									height={42}
									className="opacity-90"
								/>
							))}
						</div>
						<div className="flex items-center gap-2 text-muted-foreground">
							{socials.map(({ href, label, Icon }) => (
								<a
									key={href}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={label}
									className="flex h-10 w-10 items-center justify-center rounded-full transition hover:text-foreground"
								>
									<Icon className="h-6 w-6" />
								</a>
							))}
						</div>
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, ease: 'easeOut' }}
					className="hidden md:block"
				>
					<ProfilePhoto />
				</motion.div>
			</div>
		</header>
	);
}
