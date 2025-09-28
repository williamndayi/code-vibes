export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: FileNode[];
  parentId?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  template: string;
  files: FileNode[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  files: FileNode[];
  tags: string[];
}

export interface EditorState {
  activeFileId: string | null;
  openFiles: FileNode[];
  selectedFile: FileNode | null;
}