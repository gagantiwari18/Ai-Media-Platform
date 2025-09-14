import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Download, Check } from 'lucide-react';
import { toast } from 'react-toastify';

interface TextDisplayProps {
  text: string;
  filename?: string;
  className?: string;
  title?: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ 
  text, 
  filename = 'extracted-text.txt',
  className = '',
  title = 'Extracted Text'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Text copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Text downloaded successfully!');
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
      <div className="p-4 max-h-96 overflow-y-auto">
        <div className="prose prose-sm max-w-none dark:prose-invert text-gray-900 dark:text-white">
          <ReactMarkdown
            components={{
              // Custom styling for code blocks
              code: ({ className, children, ...props }: any) => {
                const inline = !className?.includes('language-');
                return inline ? (
                  <code
                    className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg overflow-x-auto">
                    <code className="font-mono text-sm" {...props}>
                      {children}
                    </code>
                  </pre>
                );
              },
              // Custom styling for headings
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                  {children}
                </h3>
              ),
              // Custom styling for paragraphs
              p: ({ children }) => (
                <p className="mb-3 leading-relaxed text-gray-800 dark:text-gray-200">
                  {children}
                </p>
              ),
              // Custom styling for lists
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-3 space-y-1 text-gray-800 dark:text-gray-200">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-3 space-y-1 text-gray-800 dark:text-gray-200">
                  {children}
                </ol>
              ),
            }}
          >
            {text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default TextDisplay;