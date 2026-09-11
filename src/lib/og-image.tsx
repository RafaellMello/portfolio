import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const ogImageSize = { width: 1200, height: 630 };

/**
 * Preview compartilhado por opengraph-image.tsx e twitter-image.tsx —
 * é o que WhatsApp/Twitter/Facebook/Discord etc. mostram ao colar o link
 * do site. Por pedido: é só a logo (o mesmo círculo "RM" do nav/footer),
 * centralizada no fundo escuro da marca.
 */
export function renderLogoOgImage() {
	const logo = readFileSync(join(process.cwd(), 'public', 'favicon.png')).toString('base64');

	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: '#05070c',
				}}
			>
				<img
					src={`data:image/png;base64,${logo}`}
					width={280}
					height={280}
					style={{
						borderRadius: '50%',
						border: '6px solid rgba(0,212,255,0.5)',
					}}
				/>
			</div>
		),
		{ ...ogImageSize }
	);
}
