import { Html, Main, Head, NextScript } from 'next/document';
import classNames from 'classnames';

import { inter } from '@/components/global/fonts';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className={classNames('w-screen min-h-screen relative flex justify-center', inter.className)}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
