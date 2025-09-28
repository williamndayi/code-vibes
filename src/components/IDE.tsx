'use client';

import { useState, useCallback } from 'react';
import { FileNode, Project, EditorState } from '@/types';
import CodeEditor from '@/components/CodeEditor';
import FileTree from '@/components/FileTree';
import PreviewPanel from '@/components/PreviewPanel';
import { getLanguageFromFileName, generateId } from '@/lib/templates';

interface IDEProps {
  initialProject: Project;
  onProjectChange?: (project: Project) => void;
}

export default function IDE({ initialProject, onProjectChange }: IDEProps) {
  const [project, setProject] = useState<Project>(initialProject);
  const [editorState, setEditorState] = useState<EditorState>({
    activeFileId: null,
    openFiles: [],
    selectedFile: null,
  });

  const updateProject = useCallback((updatedProject: Project) => {
    setProject(updatedProject);
    onProjectChange?.(updatedProject);
  }, [onProjectChange]);

  const findFileById = (files: FileNode[], id: string): FileNode | null => {
    for (const file of files) {
      if (file.id === id) return file;
      if (file.children) {
        const found = findFileById(file.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const updateFileInTree = (files: FileNode[], updatedFile: FileNode): FileNode[] => {
    return files.map(file => {
      if (file.id === updatedFile.id) {
        return updatedFile;
      }
      if (file.children) {
        return {
          ...file,
          children: updateFileInTree(file.children, updatedFile)
        };
      }
      return file;
    });
  };

  const handleFileSelect = useCallback((file: FileNode) => {
    if (file.type === 'file') {
      setEditorState(prev => ({
        ...prev,
        activeFileId: file.id,
        selectedFile: file,
        openFiles: prev.openFiles.find(f => f.id === file.id) 
          ? prev.openFiles 
          : [...prev.openFiles, file]
      }));
    }
  }, []);

  const handleFileChange = useCallback((content: string) => {
    if (!editorState.selectedFile) return;

    const updatedFile = {
      ...editorState.selectedFile,
      content
    };

    const updatedFiles = updateFileInTree(project.files, updatedFile);
    
    const updatedProject = {
      ...project,
      files: updatedFiles,
      updatedAt: new Date()
    };

    updateProject(updatedProject);
    
    setEditorState(prev => ({
      ...prev,
      selectedFile: updatedFile,
      openFiles: prev.openFiles.map(f => f.id === updatedFile.id ? updatedFile : f)
    }));
  }, [editorState.selectedFile, project, updateProject]);

  const addFileToTree = (files: FileNode[], parentId: string | null, newFile: FileNode): FileNode[] => {
    if (parentId === null) {
      return [...files, newFile];
    }

    return files.map(file => {
      if (file.id === parentId && file.type === 'folder') {
        return {
          ...file,
          children: [...(file.children || []), newFile]
        };
      }
      if (file.children) {
        return {
          ...file,
          children: addFileToTree(file.children, parentId, newFile)
        };
      }
      return file;
    });
  };

  const handleFileCreate = useCallback((parentId: string | null, name: string, type: 'file' | 'folder') => {
    const newFile: FileNode = {
      id: generateId(),
      name,
      type,
      parentId: parentId || undefined,
      ...(type === 'file' && {
        content: type === 'file' ? getDefaultContent(name) : undefined,
        language: getLanguageFromFileName(name)
      }),
      ...(type === 'folder' && {
        children: []
      })
    };

    const updatedFiles = addFileToTree(project.files, parentId, newFile);
    
    const updatedProject = {
      ...project,
      files: updatedFiles,
      updatedAt: new Date()
    };

    updateProject(updatedProject);

    // Auto-select new files
    if (type === 'file') {
      handleFileSelect(newFile);
    }
  }, [project, updateProject, handleFileSelect]);

  const getDefaultContent = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    const defaults: Record<string, string> = {
      'html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
      'css': `/* Add your styles here */
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 20px;
}`,
      'js': `// Add your JavaScript here
console.log('Hello, Code Vibes!');`,
      'jsx': `import React from 'react';

function Component() {
    return (
        <div>
            <h1>Hello, React!</h1>
        </div>
    );
}

export default Component;`,
      'ts': `// Add your TypeScript here
console.log('Hello, Code Vibes!');`,
      'tsx': `import React from 'react';

interface Props {
    title: string;
}

function Component({ title }: Props) {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
}

export default Component;`,
      'json': `{
    "name": "my-project",
    "version": "1.0.0"
}`,
      'md': `# ${fileName.replace('.md', '')}

Add your markdown content here.`
    };

    return defaults[extension || ''] || `// ${fileName}\n\n`;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* File Tree */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <FileTree
          files={project.files}
          onFileSelect={handleFileSelect}
          onFileCreate={handleFileCreate}
          activeFileId={editorState.activeFileId}
          className="h-full"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <CodeEditor
            file={editorState.selectedFile}
            onChange={handleFileChange}
            className="h-full"
          />
        </div>

        {/* Preview Panel */}
        <div className="w-96 bg-white border-l border-gray-200 flex-shrink-0">
          <PreviewPanel
            files={project.files.filter(f => f.type === 'file')}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}