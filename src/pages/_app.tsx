import { AppProps } from 'next/app';
import Head from 'next/head';

import 'normalize.css';
import 'github-markdown-css/github-markdown.css';
import '@/styles/global.scss';

import { HeaderBar } from '@/components/global/header';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Huang Laboratory | the University of Hong Kong</title>
				<link rel="icon" type="image/svg+xml" href="/favicon.ico" />
			</Head>

			<HeaderBar />
			<main className="w-full h-full max-w-6xl flex flex-col items-center justify-center max-sm:px-4">
				<Component {...pageProps} />
				{/* used for md */}
				<div className="justify-evenly" />
			</main>
		</>
	);
}
