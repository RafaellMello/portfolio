'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/icons/brand-icons';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	external?: boolean;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Navegação',
		links: [
			{ title: 'Sobre', href: '#sobre' },
			{ title: 'Portfólio', href: '#portfolio' },
			{ title: 'Serviços', href: '#planos' },
			{ title: 'Contato', href: '#contato' },
		],
	},
	{
		label: 'Serviços',
		links: [
			{ title: 'Landing Page', href: '#planos' },
			{ title: 'Site Institucional', href: '#planos' },
			{ title: 'Sistema Customizado', href: '#planos' },
		],
	},
	{
		label: 'Redes Sociais',
		links: [
			{ title: 'GitHub', href: 'https://github.com/rafaellmello', icon: GithubIcon, external: true },
			{
				title: 'LinkedIn',
				href: 'https://www.linkedin.com/in/rafael-mello-a5b22330b/',
				icon: LinkedinIcon,
				external: true,
			},
			{
				title: 'Instagram',
				href: 'https://instagram.com/rafaelmello.dev',
				icon: InstagramIcon,
				external: true,
			},
		],
	},
];

export function Footer() {
	return (
		<footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
			<div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<Image
						src="/favicon.png"
						alt="Rafael Mello"
						width={40}
						height={40}
						className="rounded-full"
					/>
					<p className="text-muted-foreground mt-8 text-sm md:mt-0">
						© {new Date().getFullYear()} Rafael Mello. Todos os direitos reservados.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => {
						const isSocials = section.label === 'Redes Sociais';
						return (
							<AnimatedContainer
								key={section.label}
								delay={0.1 + index * 0.1}
								className={isSocials ? 'col-span-2 md:col-span-1' : undefined}
							>
								<div className="mb-10 md:mb-0">
									<h3 className={`text-xs ${isSocials ? 'text-center md:text-left' : ''}`}>
										{section.label}
									</h3>
									<ul
										className={
											isSocials
												? 'text-muted-foreground mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm md:flex-col md:items-start md:justify-start md:gap-2'
												: 'text-muted-foreground mt-4 space-y-2 text-sm'
										}
									>
										{section.links.map((link) => (
											<li key={link.title}>
												<a
													href={link.href}
													target={link.external ? '_blank' : undefined}
													rel={link.external ? 'noopener noreferrer' : undefined}
													className="hover:text-foreground inline-flex items-center transition-all duration-300"
												>
													{link.icon && <link.icon className="me-1 size-4" />}
													{link.title}
												</a>
											</li>
										))}
									</ul>
								</div>
							</AnimatedContainer>
						);
					})}
				</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
