import { MarkdownRenderer } from '@/components/global/markdown/renderer';
import classNames from 'classnames';
import MarkNav from 'markdown-navbar';
import { ActivityLogIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { useOnClickOutside } from '@/utils/utils';

interface Props {
	markdown: string;
	className?: string;
}

export const MarkdownViewer: React.FC<Props> = ({ className, markdown }) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const contextWapperRef = useRef<HTMLDivElement>(null);
	const [menuVisible, toggleMenuVisible] = useState<boolean>(false);

	useOnClickOutside(menuRef, () => toggleMenuVisible(false));

	return (
		<main className={classNames('relative w-full h-full flex gap-4', className)}>
			<div
				className="hidden max-sm:flex fixed right-8 top-24 p-2 shadow-md rounded-md bg-white"
				onClick={() => toggleMenuVisible(true)}
			>
				<ActivityLogIcon />
			</div>
			<div ref={contextWapperRef} className="w-full max-w-4xl bg-white rounded-md shadow-sm overflow-hidden">
				<MarkdownRenderer className="p-4 overflow-x-hidden" markdown={markdown} />
			</div>
			<motion.div
				ref={menuRef}
				className="sticky top-24 w-full max-w-[18rem] max-h-[calc(100vh-7rem)] col-span-1 bg-white rounded-md shadow-sm overflow-x-hidden max-sm:fixed max-sm:max-h-[calc(100vh-10rem)] max-sm:shadow-md origin-top-right max-sm:top-32 max-sm:mt-2 max-sm:right-8"
				variants={{
					hidden: {
						opacity: 0,
						scale: 0.95,
						pointerEvents: 'none',
					},
					visible: {
						opacity: 1,
						scale: 1,
						pointerEvents: 'auto',
					},
				}}
				animate={isMobile ? (menuVisible ? 'visible' : 'hidden') : 'visible'}
			>
				<MarkNav source={markdown} ordered={false} onNavItemClick={() => toggleMenuVisible(false)} />
			</motion.div>
		</main>
	);
};
