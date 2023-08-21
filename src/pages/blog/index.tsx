'use client';

import { NextPage } from 'next';
import fs from 'fs';
import { resolve, join as pathJoin } from 'path';
import { promisify } from 'util';
import frontMatter from 'front-matter';

import { orbitron } from '@/components/global/fonts';
import classNames from 'classnames';
import { useRouter } from 'next/router';

type FileInfo = {
	path: string;
	content: string;
};

interface PostAttributes {
	title?: string;
	summary?: string;
}

interface FrontMatterType {
	attributes: PostAttributes;
	body: string;
}

interface StaticProps {
	mds: [string[], PostAttributes][];
}

const BlogPage: NextPage<StaticProps> = ({ mds }) => {
	const router = useRouter();

	return (
		<main className="w-full h-full pb-4 max-h-[calc(100vh-7rem)] overflow-x-hidden flex flex-col gap-4">
			{mds.map(([[year, date], { title, summary }], index) => (
				<div
					className="w-full flex gap-4 p-4 bg-white rounded-md shadow-sm justify-between items-center"
					key={index}
					onClick={() => router.push(`blog/${year}-${date}`)}
				>
					<div className="flex gap-4 w-[calc(100%-12rem)] max-sm:w-full">
						<div className="opacity-80 max-w-20">
							<h1
								className={classNames(
									'font-bold text-sm text-white bg-black px-2 py-1.5 rounded-t-sm',
									orbitron.className,
								)}
							>
								{date}
							</h1>
							<h2
								className={classNames(
									'text-xs text-center text-white bg-black px-2 py-1 rounded-b-sm mt-0.5',
									orbitron.className,
								)}
							>
								{year}
							</h2>
						</div>
						<div className="max-w-[calc(100%-12rem)] max-sm:max-w-[calc(100vw-10rem)] h-full flex flex-col justify-center">
							<h1 className="font-bold text-2xl truncate overflow-hidden">{title}</h1>
							<p className="text-sm opacity-70 truncate">{summary}</p>
						</div>
					</div>
					<div className="px-4 py-2 outline-2 outline rounded-sm shadow-sm text-sm hover:text-white hover:bg-black hover:scale-95 max-sm:hidden cursor-pointer">
						Read more
					</div>
				</div>
			))}
		</main>
	);
};

export default BlogPage;

const MARKDOWNPATH = pathJoin(process.cwd(), '/src/_markdowns/blog');

export async function getStaticProps() {
	const readdir = promisify(fs.readdir);
	const stat = promisify(fs.stat);
	const readFile = promisify(fs.readFile);

	const getFiles = async (dir: string): Promise<FileInfo[]> => {
		const subdirs = await readdir(dir);
		const files = await Promise.all(
			subdirs.map(async (subdir: string) => {
				const absPath = resolve(dir, subdir);
				const isDirectory = (await stat(absPath)).isDirectory();

				if (isDirectory) {
					return getFiles(absPath);
				} else {
					const path = absPath.slice(MARKDOWNPATH.length + 1);
					const content = await readFile(absPath, 'utf8');
					return { path, content };
				}
			}),
		);

		return files.flat().filter((file: FileInfo) => file.path.endsWith('.md'));
	};

	const getSegments = (file: string) => {
		let segments = file.slice(0, -3).replace(/\\/g, '/').split('/');
		if (segments[segments.length - 1] === 'index') segments.pop();
		return segments;
	};

	const files = await getFiles(MARKDOWNPATH);
	const mds = files
		.map(({ path, content }) => {
			const { attributes: postAttributes, body: postBody } = frontMatter(content) as FrontMatterType;

			if (postBody) {
				const summary = postBody.replace(/<[^>]+>/g, '').slice(0, 120);
				postAttributes.summary = summary + (summary.length > 120 ? '...' : '');
			}

			return [getSegments(path), postAttributes];
		})
		.reverse();

	return {
		props: {
			mds,
		},
	};
}
