'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const links = [
	{ href: '#sobre', label: 'Sobre' },
	{ href: '#portfolio', label: 'Portfólio' },
	{ href: '#planos', label: 'Serviços' },
];

// Uppercase, tracking largo, peso leve — mesmo tratamento pra todo item da
// nav (links e "contato"), nenhum vira botão em caixa, todos com o mesmo
// peso visual (referência: layout tipo "VERONICA PW / PLAYBOOK / SOCIALS /
// CONTACTS" espalhado por igual na barra inteira).
const navLinkClass =
	'group relative text-[11px] font-light uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground sm:text-xs';

const underlineClass =
	'absolute -bottom-1 left-0 h-px w-0 bg-white/50 transition-all duration-300 group-hover:w-full';

export function SiteNav() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<nav
			className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between gap-6 px-6 py-5 transition-all duration-300 sm:px-10 ${
				scrolled
					? 'border-b border-border bg-background/75 py-3 backdrop-blur-lg'
					: 'border-b border-transparent bg-transparent'
			}`}
		>
			<a href="#topo" className="inline-flex items-center">
				<span className="block h-9 w-9 overflow-hidden rounded-full bg-black transition-transform hover:scale-105">
					<Image
						src="/favicon.png"
						alt="Rafael Mello"
						width={42}
						height={42}
						className="h-[118%] w-[118%] -m-[9%] object-cover"
					/>
				</span>
			</a>

			{links.map((link) => (
				<a key={link.href} href={link.href} className={`hidden md:inline-flex ${navLinkClass}`}>
					{link.label}
					<span className={underlineClass} />
				</a>
			))}

			<a
				href="https://wa.me/5521998665233?text=Quero%20fazer%20um%20Or%C3%A7amento%20de%20um%20Projeto!"
				target="_blank"
				rel="noopener noreferrer"
				className={navLinkClass}
			>
				Contate-nos
				<span className={underlineClass} />
			</a>
		</nav>
	);
}
