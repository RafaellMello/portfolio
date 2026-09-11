'use client';

import { motion, useScroll } from 'motion/react';

export function ScrollProgress() {
	const { scrollYProgress } = useScroll();

	return (
		<motion.div
			className="fixed left-0 top-0 z-[200] h-[2px] w-full origin-left bg-gradient-to-r from-white to-white/30"
			style={{ scaleX: scrollYProgress }}
		/>
	);
}
