import { renderLogoOgImage, ogImageSize } from '@/lib/og-image';

export const runtime = 'nodejs';
export const alt = 'Rafael Mello — Desenvolvedor Front-End';
export const size = ogImageSize;
export const contentType = 'image/png';

export default function Image() {
	return renderLogoOgImage();
}
