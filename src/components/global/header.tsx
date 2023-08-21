'use client';

import classNames from 'classnames';
import * as Menubar from '@radix-ui/react-menubar';
import { useRouter } from 'next/router';

import { yanone, tektur, inter } from '@/components/global/fonts';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useState } from 'react';

const RouteNames = [
	['WELCOME', '/'],
	['RESEARCH', '/research'],
	['PUBLICATIONS', '/publications'],
	['LAB MEMBERS', '/lab_members'],
	['CONTACT US', '/contact_us'],
	['LAB PHOTOS', '/lab_photos'],
	['JOIN THE LAB', '/join_the_lab'],
	['BLOG', '/blog'],
];

export const HeaderBar: React.FC = () => {
	const router = useRouter();

	const [menuVisible, setMenuVisible] = useState<string>('');

	return (
		<header className="w-screen h-24 fixed left-0 top-0 z-20 flex items-center justify-center max-sm:h-14 max-sm:pt-6">
			<div
				className={classNames(
					'w-full max-w-6xl flex justify-between items-center py-4 px-6 bg-white shadow-sm rounded-md font-bold  max-sm:mx-4 max-sm:py-2 max-sm:px-2',
					yanone.className,
				)}
			>
				<div className="flex flex-col text-center cursor-pointer" onClick={() => router.push('/')}>
					<h1 className={classNames(tektur.className)}>Huang Laboratory</h1>
					<span className={classNames('text-xs font-light scale-75 -mt-1.5', inter.className)}>
						the University of Hong Kong
					</span>
				</div>
				<div className="flex justify-center items-center gap-4 max-sm:hidden">
					{RouteNames.map(([name, routerPath], index) => (
						<div className="flex items-center -mb-1.5" key={index}>
							<h1
								className="text-xl leading-none opacity-80 cursor-pointer hover:scale-95 hover:opacity-70"
								onClick={() => router.push(routerPath)}
							>
								{name}
							</h1>
							{index < RouteNames.length - 1 && <span className="text-sm ml-4 leading-none opacity-60">/</span>}
						</div>
					))}
				</div>
				<Menubar.Root className="hidden max-sm:flex" value={menuVisible} onValueChange={setMenuVisible}>
					<Menubar.Menu value="def">
						<Menubar.Trigger className="hidden max-sm:flex p-2">
							<HamburgerMenuIcon />
						</Menubar.Trigger>
						{menuVisible && (
							<Menubar.Portal forceMount>
								<Menubar.Content align="start" sideOffset={5} alignOffset={-3}>
									<motion.div
										className="fixed top-0 right-0 mt-2.5 mr-4 bg-white shadow-md rounded-md flex flex-col gap-4 px-4 py-2 font-bold origin-top-right"
										initial={{
											opacity: 0,
											scale: 0.95,
										}}
										animate={{
											opacity: 1,
											scale: 1,
										}}
										exit={{
											opacity: 0,
											scale: 0.95,
										}}
									>
										{RouteNames.map(([name, routerPath], index) => (
											<Menubar.Item className="flex items-center" key={index} onClick={() => router.push(routerPath)}>
												{name}
											</Menubar.Item>
										))}
									</motion.div>
								</Menubar.Content>
							</Menubar.Portal>
						)}
					</Menubar.Menu>
				</Menubar.Root>
			</div>
		</header>
	);
};
