import { ScrollProgress } from "@/components/scroll-progress";
import { SiteNav } from "@/components/site-nav";
import { AsmrBackground } from "@/components/asmr-background";

/**
 * Layout do grupo de rotas "(site)" — nav, fundo animado e barra de
 * progresso só existem aqui (na home real). Não afeta a URL (/) e não
 * vaza pra rotas fora do grupo, como /liquid-glass (página de teste que
 * tem seu próprio nav/fundo).
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AsmrBackground />
			<ScrollProgress />
			<SiteNav />
			{children}
		</>
	);
}
