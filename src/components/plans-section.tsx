'use client';

import { motion, type Variants } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SectionHead } from '@/components/section-title';
import { staggerContainer } from '@/lib/motion';

const cardVariant: Variants = {
	hidden: { opacity: 0, y: 24, scale: 0.97 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.5, delay: i * 0.08 },
	}),
};

const featureItemVariant: Variants = {
	hidden: { opacity: 0, x: -8 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export interface Plan {
	title: string;
	sub: string;
	features: string[];
	whatsapp: string;
}

export const plans: Plan[] = [
	{
		title: 'Landing Page',
		sub: 'Para quem busca uma página de vendas ou apresentação de um produto ou vitrine.',
		features: [
			'Layout de alta fidelidade alinhado à identidade da marca',
			'Arquitetura de conteúdo focada em conversão',
			'Design responsivo para qualquer dispositivo',
			'Copy e CTAs estratégicos para gerar ação',
			'Performance técnica: código limpo e carregamento rápido',
			'SEO on-page estruturado desde a base',
			'Rastreamento de acessos e conversões com integração a plataformas de analytics',
			'Formulário de captação via e-mail ou API',
			'Seções modulares: depoimentos, FAQ, portfólio e mais',
			'Compatibilidade garantida nos principais navegadores',
		],
		whatsapp:
			'https://wa.me/5521998665233?text=Quero%20uma%20Landing%20Page%20e%20Gostaria%20de%20mais%20Detalhes.',
	},
	{
		title: 'Site Institucional',
		sub: 'Para empresas e marcas que querem presença digital sólida e profissional',
		features: [
			'Arquitetura de informação clara e navegação intuitiva',
			'Páginas sob medida: Sobre, Serviços, Contato e mais',
			'Identidade visual consistente em toda a interface',
			'Estrutura escalável para novas páginas sem retrabalho',
			'Design responsivo em qualquer dispositivo',
			'SEO estrutural: URLs semânticas, meta dados e performance',
			'Posicionamento visual focado em autoridade e confiança',
			'Formulário de contato configurado para captação de leads',
		],
		whatsapp:
			'https://wa.me/5521998665233?text=Quero%20um%20Site%20Institucional%20e%20Gostaria%20de%20mais%20Detalhes.',
	},
	{
		title: 'Sistema/Aplicação Customizada',
		sub: 'Para empresas que querem automatizar processos e ganhar eficiência com um sistema próprio',
		features: [
			'Sistema web sob medida, feito para a rotina real da sua empresa',
			'Painel administrativo próprio com controle total de acessos',
			'Automação de processos manuais e repetitivos',
			'Cadastro de usuários, permissões e níveis de acesso',
			'Integração com banco de dados, APIs e ferramentas externas',
			'Dashboards e relatórios para acompanhar resultados em tempo real',
			'Arquitetura escalável, pronta para crescer com o negócio',
			'Suporte técnico e evolução contínua do sistema',
		],
		whatsapp:
			'https://wa.me/5521998665233?text=Quero%20um%20Sistema%2FAplica%C3%A7%C3%A3o%20Customizada%20e%20Gostaria%20de%20mais%20Detalhes.',
	},
];

export function PlansSection() {
	return (
		<section id="planos" className="py-24 sm:py-28 lg:py-24">
			<SectionHead eyebrow="Services" title="Seu Site, Sua Vitrine" />

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{plans.map((plan, i) => (
					<motion.div
						key={plan.title}
						custom={i}
						variants={cardVariant}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
						className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 transition-[box-shadow,border-color] hover:border-white/20 hover:shadow-[0_24px_50px_rgba(255,255,255,0.06)]"
					>
						<span className="absolute inset-x-0 top-0 h-[3px] bg-white/25" />

						<div className="mb-5 text-center">
							<h3 className="mb-2 text-xl font-bold text-foreground">{plan.title}</h3>
							<p className="text-sm text-muted-foreground">{plan.sub}</p>
						</div>

						<div className="mb-5 border-t border-border" />

						<motion.ul variants={staggerContainer(0.045, 0.2)} className="mb-6 flex-grow space-y-3">
							{plan.features.map((f) => (
								<motion.li
									key={f}
									variants={featureItemVariant}
									className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85"
								>
									<span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-foreground">
										<ArrowRight className="size-3" strokeWidth={2.5} />
									</span>
									{f}
								</motion.li>
							))}
						</motion.ul>

						<div className="border-t border-border pt-4 text-center">
							<a
								href={plan.whatsapp}
								target="_blank"
								rel="noopener noreferrer"
								className="group relative inline-block w-full rounded-full border border-primary/50 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.5px] text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_12px_26px_rgba(0,212,255,0.32)]
									before:absolute before:-left-1.5 before:-top-1.5 before:h-3.5 before:w-3.5 before:border-l-2 before:border-t-2 before:border-primary before:opacity-0 before:transition-all before:duration-300
									after:absolute after:-bottom-1.5 after:-right-1.5 after:h-3.5 after:w-3.5 after:border-r-2 after:border-b-2 after:border-primary after:opacity-0 after:transition-all after:duration-300
									hover:before:h-5 hover:before:w-5 hover:before:opacity-100
									hover:after:h-5 hover:after:w-5 hover:after:opacity-100"
							>
								Ver Mais
							</a>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
