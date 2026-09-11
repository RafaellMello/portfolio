'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const items = [
	'Landing Pages',
	'Sites Institucionais',
	'Sistemas Customizados',
	'R$1M+ em Faturamento Gerado',
	'SEO & Performance',
	'Alto Padrão de Entrega',
];

/**
 * Faixa full-bleed rolando taglines reais do site — loop infinito.
 *
 * Duas pegadinhas resolvidas aqui:
 *
 * 1) Animar em PORCENTAGEM ("0%" → "-50%") só é matematicamente exato se
 *    as cópias, JUNTAS, não tiverem nenhum espaço extra entre elas — o
 *    `gap` do flex quebra a conta, porque a % é relativa à largura TOTAL
 *    (cópias + gaps), não à largura de uma cópia. Fix: medir em pixels a
 *    largura real de uma cópia + o gap até a próxima ("período"), e animar
 *    exatamente essa distância em px — o reset cai onde a próxima cópia já
 *    estava, sem salto.
 *
 * 2) Só DUAS cópias não bastam em telas largas: se a viewport é mais larga
 *    que uma cópia (comum em desktop, já que o texto é relativamente
 *    curto), sobra tela sem conteúdo pra desenhar em certos pontos do
 *    scroll — um vão vazio antes da próxima cópia entrar. Fix: calcular
 *    quantas cópias cabem na tela + 1 de sobra, e renderizar essa
 *    quantidade dinamicamente (recalculado no resize).
 */
export function Marquee() {
	const shouldReduceMotion = useReducedMotion();
	const trackRef = useRef<HTMLDivElement>(null);
	const [period, setPeriod] = useState(0);
	const [copies, setCopies] = useState(2);

	useEffect(() => {
		if (shouldReduceMotion) return;
		const el = trackRef.current;
		const parent = el?.parentElement;
		if (!el || !parent) return;

		const measure = () => {
			const gap = parseFloat(getComputedStyle(parent).columnGap || '0') || 0;
			const trackWidth = el.offsetWidth;
			if (!trackWidth) return;
			setPeriod(trackWidth + gap);
			// cópias suficientes pra cobrir a viewport inteira + 1 de folga,
			// garantindo que nunca falte conteúdo enquanto a faixa desliza
			setCopies(Math.max(2, Math.ceil(window.innerWidth / (trackWidth + gap)) + 1));
		};

		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		window.addEventListener('resize', measure);
		return () => {
			ro.disconnect();
			window.removeEventListener('resize', measure);
		};
	}, [shouldReduceMotion]);

	const items_ = (
		<>
			{items.map((item) => (
				<span key={item} className="flex items-center gap-4">
					<span className="whitespace-nowrap text-sm uppercase tracking-[0.15em] text-muted-foreground">
						{item}
					</span>
					<span className="text-muted-foreground/40">•</span>
				</span>
			))}
		</>
	);
	const track = <div className="flex shrink-0 items-center gap-4">{items_}</div>;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, amount: 0.6 }}
			transition={{ duration: 0.6 }}
			className="ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen overflow-hidden border-y border-border py-5"
		>
			{shouldReduceMotion ? (
				<div className="flex justify-center">{track}</div>
			) : (
				<motion.div
					className="flex w-max gap-4"
					animate={period ? { x: [0, -period] } : undefined}
					transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
				>
					<div ref={trackRef} className="flex shrink-0 items-center gap-4">
						{items_}
					</div>
					{Array.from({ length: copies - 1 }).map((_, i) => (
						<div key={i} className="flex shrink-0 items-center gap-4">
							{items_}
						</div>
					))}
				</motion.div>
			)}
		</motion.div>
	);
}
