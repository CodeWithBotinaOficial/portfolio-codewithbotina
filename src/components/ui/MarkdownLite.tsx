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
   * Processes inline markdown syntax (bold, italic, links).
   */
  const processInlineStyles = (text: string) => {
    return text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-charcoal hover:underline font-medium">$1</a>');
  };

  /**
   * Parses markdown into HTML string.
   */
  const parseMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    const htmlLines: string[] = [];
    let inList = false;

    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      // Handle Lists
      if (trimmedLine.startsWith('- ')) {
        if (!inList) {
          htmlLines.push('<ul class="list-disc pl-5 mb-4 space-y-1 text-text-muted">');
          inList = true;
        }
        let content = trimmedLine.substring(2);
        content = processInlineStyles(content);
        htmlLines.push(`<li>${content}</li>`);
      } else {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }

        if (trimmedLine === '') return;

        // Handle Headers
        if (trimmedLine.startsWith('### ')) {
          htmlLines.push(`<h3 class="text-lg font-bold mt-4 mb-2 text-charcoal font-heading">${processInlineStyles(trimmedLine.substring(4))}</h3>`);
        } else if (trimmedLine.startsWith('## ')) {
          htmlLines.push(`<h2 class="text-xl font-bold mt-6 mb-3 text-charcoal font-heading">${processInlineStyles(trimmedLine.substring(3))}</h2>`);
        } else if (trimmedLine.startsWith('# ')) {
          htmlLines.push(`<h1 class="text-2xl font-bold mt-8 mb-4 text-charcoal font-heading">${processInlineStyles(trimmedLine.substring(2))}</h1>`);
        } else {
          // Regular paragraph
          htmlLines.push(`<p class="mb-4 text-text-muted leading-relaxed">${processInlineStyles(trimmedLine)}</p>`);
        }
      }
    });

    if (inList) {
      htmlLines.push('</ul>');
    }

    return { __html: htmlLines.join('') };
  };

  return <div className="markdown-content" dangerouslySetInnerHTML={parseMarkdown(text)} />;
};

export default MarkdownLite;
