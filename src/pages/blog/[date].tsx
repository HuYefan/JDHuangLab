'use client';

import { NextPage } from 'next';
import fs from 'fs';
import { resolve, join as pathJoin } from 'path';
import { promisify } from 'util';
import frontMatter from 'front-matter';

import { MarkdownViewer } from '@/components/global/markdown/viewer';

interface StaticProps {
	markdown: string;
}

const ContactUsPage: NextPage<StaticProps> = (context) => {
	return (
		<main className="w-full h-full pb-4">
			<MarkdownViewer markdown={context?.markdown} />
		</main>
	);
};

export default ContactUsPage;

interface PostAttributes {
	title?: string;
	summary?: string;
}

interface FrontMatterType {
	attributes: PostAttributes;
	body: string;
}

export async function getStaticProps(context: { params: Record<string, string> }) {
	const [isYear, isMonth, isDay] = context?.params?.date?.split('-') ?? [];

	const mdPath = pathJoin(process.cwd(), `/src/_markdowns/blog/${isYear}/${isMonth}-${isDay}.md`);

	if (!fs.existsSync(mdPath)) {
		return {
			props: {
				markdown: '404',
			},
		};
	}

	let md = '';
	const {
		attributes: { title },
		body,
	} = frontMatter(fs.readFileSync(mdPath, 'utf-8')) as FrontMatterType;

	if (title) {
		md = `## ${title}\n${body}`;
	} else {
		md = body;
	}

	return {
		props: {
			markdown: md,
		},
	};
}

const MARKDOWNPATH = pathJoin(process.cwd(), '/src/_markdowns/blog');

export async function getStaticPaths() {
	const readdir = promisify(fs.readdir);
	const stat = promisify(fs.stat);

	const getFiles = async (dir: string): Promise<string[]> => {
		const subdirs = await readdir(dir);
		const files = await Promise.all(
			subdirs.map(async (subdir: string) => {
				const res = resolve(dir, subdir);
				return (await stat(res)).isDirectory() ? getFiles(res) : res.slice(MARKDOWNPATH.length + 1);
			}),
		);
		return files.flat().filter((file: string) => file.endsWith('.md'));
	};

	const getSegments = (file: string) => {
		let segments = file.slice(0, -3).replace(/\\/g, '/').split('/');
		if (segments[segments.length - 1] === 'index') segments.pop();
		return segments;
	};

	const files = await getFiles(MARKDOWNPATH);
	const paths = files.map((file: string) => ({
		params: {
			date: getSegments(file).join('-'),
		},
	}));

	return {
		paths: paths,
		fallback: false,
	};
}
