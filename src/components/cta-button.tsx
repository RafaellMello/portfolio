import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	children: ReactNode;
	size?: 'md' | 'lg';
};

const sizeClass = {
	md: 'px-7 py-3.5 text-base',
	lg: 'px-9 py-5 text-lg sm:text-xl',
};

/** Botão-assinatura do site: contorno ciano vívido, preenche no hover e
 * os colchetes [ ] se abrem nos cantos (mesma linguagem do eyebrow). */
export function CtaButton({ children, className = '', size = 'md', ...props }: Props) {
	return (
		<a
			{...props}
			className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full border border-primary/50 font-semibold tracking-[-0.01em] text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_10px_30px_rgba(0,212,255,0.35)] ${sizeClass[size]}
				before:absolute before:-left-1.5 before:-top-1.5 before:h-3.5 before:w-3.5 before:border-l-2 before:border-t-2 before:border-primary before:opacity-0 before:transition-all before:duration-300
				after:absolute after:-bottom-1.5 after:-right-1.5 after:h-3.5 after:w-3.5 after:border-r-2 after:border-b-2 after:border-primary after:opacity-0 after:transition-all after:duration-300
				hover:before:h-5 hover:before:w-5 hover:before:opacity-100
				hover:after:h-5 hover:after:w-5 hover:after:opacity-100
				${className}`}
		>
			{children}
		</a>
	);
}

/** Ação secundária: contorno ciano vívido igual ao resto, sem os colchetes —
 * continua distinta do botão principal sem virar link de texto puro. */
export function SecondaryButton({ children, className = '', size = 'md', ...props }: Props) {
	return (
		<a
			{...props}
			className={`inline-flex items-center justify-center gap-2.5 rounded-full border border-primary/50 font-semibold tracking-[-0.01em] text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 ${sizeClass[size]} ${className}`}
		>
			{children}
		</a>
	);
}
