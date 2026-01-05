import React from 'react';

interface MarkdownLiteProps {
  text: string;
}

const MarkdownLite: React.FC<MarkdownLiteProps> = ({ text }) => {
  const parseMarkdown = (markdown: string) => {
    let html = markdown;

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');

    // Unordered lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = `<ul>${html}</ul>`.replace(/<\/li>(\n)?<ul>/g, '</li><ul>');

    // Links
    html = html.replace(/\\\[(.*?)\\\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Paragraphs
    html = html.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('');

    return { __html: html };
  };

  return <div dangerouslySetInnerHTML={parseMarkdown(text)} />;
};

export default MarkdownLite;
