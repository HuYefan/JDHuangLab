'use client';

import { NextPage } from 'next';
import { join as pathJoin } from 'path';
import fs from 'fs';

import { MarkdownViewer } from '@/components/global/markdown/viewer';

interface StaticProps {
	markdown: string;
}

const LabMembersPage: NextPage<StaticProps> = (context) => {
	return (
		<main className="w-full h-full pb-4">
			<MarkdownViewer markdown={context?.markdown} />
		</main>
	);
};

export default LabMembersPage;

export async function getStaticProps() {
	const md = fs.readFileSync(pathJoin(process.cwd(), '/src/_markdowns/lab_members/index.md'), 'utf-8');

	return {
		props: {
			markdown: md,
		},
	};
}
