import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface Props {
	markdown: string;
	className?: string;
}

export const MarkdownRenderer: React.FC<Props> = ({ markdown = '', className }) => {
	return (
		<ReactMarkdown
			className={classNames('markdown-body', className)}
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
		>
			{markdown}
		</ReactMarkdown>
	);
};
