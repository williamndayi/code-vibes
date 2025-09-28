'use client';

import { useRef, useEffect, useState } from 'react';
import { FileNode } from '@/types';

interface PreviewPanelProps {
  files: FileNode[];
  className?: string;
}

export default function PreviewPanel({ files, className = '' }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updatePreview();
  }, [files]);

  const updatePreview = () => {
    if (!iframeRef.current) return;

    setIsLoading(true);

    // Find HTML, CSS, and JS files
    const htmlFile = files.find(f => f.name.endsWith('.html') || f.name === 'index.html');
    const cssFiles = files.filter(f => f.name.endsWith('.css'));
    const jsFiles = files.filter(f => f.name.endsWith('.js'));

    let html = htmlFile?.content || `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Vibes Preview</title>
</head>
<body>
    <div id="app">
        <h1>Welcome to Code Vibes!</h1>
        <p>Create some files to see your project come to life.</p>
        <p>Try creating an <code>index.html</code> file to get started.</p>
    </div>
</body>
</html>
    `;

    // Inject CSS
    if (cssFiles.length > 0) {
      const cssContent = cssFiles.map(file => file.content || '').join('\n');
      html = html.replace('</head>', `<style>\n${cssContent}\n</style>\n</head>`);
    }

    // Inject JavaScript
    if (jsFiles.length > 0) {
      const jsContent = jsFiles.map(file => file.content || '').join('\n');
      html = html.replace('</body>', `<script>\n${jsContent}\n</script>\n</body>`);
    }

    // Create a blob URL for the iframe
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    iframeRef.current.src = url;

    // Cleanup previous blob URL
    return () => URL.revokeObjectURL(url);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const refreshPreview = () => {
    updatePreview();
  };

  return (
    <div className={`preview-panel ${className}`}>
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Preview</h3>
        <button
          onClick={refreshPreview}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>
      <div className="relative h-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-gray-500">Loading preview...</div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          onLoad={handleLoad}
          sandbox="allow-scripts allow-same-origin allow-forms"
          title="Code Preview"
        />
      </div>
    </div>
  );
}