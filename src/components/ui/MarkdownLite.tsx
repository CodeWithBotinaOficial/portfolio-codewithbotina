import React from 'react';

/**
 * Props for the MarkdownLite component.
 */
interface MarkdownLiteProps {
  /** The markdown string to render */
  text: string;
}

/**
 * A lightweight Markdown renderer that avoids heavy dependencies.
 * Supports basic formatting: headers, bold, italic, links, and lists.
 * 
 * @param text - The markdown content
 */
const MarkdownLite: React.FC<MarkdownLiteProps> = ({ text }) => {
  if (!text) return null;

  /**
   * Processes inline markdown syntax (bold, italic, links) into React nodes.
   */
  const processInlineStyles = (content: string) => {
    const tokenRegex = /\[(.+?)\]\((.+?)\)|\*\*(.+?)\*\*|\*(.+?)\*/g;
    const nodes: React.ReactNode[] = [];
    let key = 0;
    let lastIndex = 0;

    for (const match of content.matchAll(tokenRegex)) {
      const matchIndex = match.index ?? 0;
      if (matchIndex > lastIndex) {
        nodes.push(content.slice(lastIndex, matchIndex));
      }

      if (match[1] && match[2]) {
        nodes.push(
          <a
            key={`link-${key++}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-charcoal hover:underline font-medium"
          >
            {match[1]}
          </a>
        );
      } else if (match[3]) {
        nodes.push(<strong key={`strong-${key++}`}>{match[3]}</strong>);
      } else if (match[4]) {
        nodes.push(<em key={`em-${key++}`}>{match[4]}</em>);
      }

      lastIndex = matchIndex + match[0].length;
    }

    if (lastIndex < content.length) {
      nodes.push(content.slice(lastIndex));
    }

    return nodes;
  };

  /**
   * Parses markdown into React elements.
   */
  const parseMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    const blocks: React.ReactNode[] = [];
    let listItems: string[] = [];
    let key = 0;

    const flushList = () => {
      if (listItems.length === 0) return;
      blocks.push(
        <ul key={`ul-${key++}`} className="list-disc pl-5 mb-4 space-y-1 text-text-muted">
          {listItems.map((item) => (
            <li key={`li-${key++}`}>{processInlineStyles(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    };

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('- ')) {
        listItems.push(trimmedLine.substring(2));
        return;
      }

      flushList();

      if (trimmedLine === '') return;

      if (trimmedLine.startsWith('### ')) {
        blocks.push(
          <h3 key={`h3-${key++}`} className="text-lg font-bold mt-4 mb-2 text-charcoal font-heading">
            {processInlineStyles(trimmedLine.substring(4))}
          </h3>
        );
        return;
      }

      if (trimmedLine.startsWith('## ')) {
        blocks.push(
          <h2 key={`h2-${key++}`} className="text-xl font-bold mt-6 mb-3 text-charcoal font-heading">
            {processInlineStyles(trimmedLine.substring(3))}
          </h2>
        );
        return;
      }

      if (trimmedLine.startsWith('# ')) {
        blocks.push(
          <h1 key={`h1-${key++}`} className="text-2xl font-bold mt-8 mb-4 text-charcoal font-heading">
            {processInlineStyles(trimmedLine.substring(2))}
          </h1>
        );
        return;
      }

      blocks.push(
        <p key={`p-${key++}`} className="mb-4 text-text-muted leading-relaxed">
          {processInlineStyles(trimmedLine)}
        </p>
      );
    });

    flushList();

    return blocks;
  };

  return <div className="markdown-content">{parseMarkdown(text)}</div>;
};

export default MarkdownLite;
