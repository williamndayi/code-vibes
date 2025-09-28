'use client';

import Editor from '@monaco-editor/react';
import { FileNode } from '@/types';

interface CodeEditorProps {
  file: FileNode | null;
  onChange: (value: string) => void;
  className?: string;
}

export default function CodeEditor({ file, onChange, className = '' }: CodeEditorProps) {
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  if (!file) {
    return (
      <div className={`flex items-center justify-center text-gray-500 ${className}`}>
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Welcome to Code Vibes</h3>
          <p>Select a file to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center">
        <span className="text-sm font-medium text-gray-700">{file.name}</span>
      </div>
      <Editor
        height="calc(100% - 40px)"
        language={file.language || 'javascript'}
        value={file.content || ''}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          theme: 'vs-light',
        }}
      />
    </div>
  );
}