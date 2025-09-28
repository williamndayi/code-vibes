'use client';

import { useState } from 'react';
import { FileNode } from '@/types';
import { File, Folder, FolderOpen, Plus } from 'lucide-react';

interface FileTreeProps {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
  onFileCreate: (parentId: string | null, name: string, type: 'file' | 'folder') => void;
  activeFileId: string | null;
  className?: string;
}

export default function FileTree({ 
  files, 
  onFileSelect, 
  onFileCreate, 
  activeFileId, 
  className = '' 
}: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [showCreateInput, setShowCreateInput] = useState<{ parentId: string | null; type: 'file' | 'folder' } | null>(null);
  const [newItemName, setNewItemName] = useState('');

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCreateItem = (parentId: string | null, type: 'file' | 'folder') => {
    setShowCreateInput({ parentId, type });
    setNewItemName('');
  };

  const handleCreateSubmit = () => {
    if (newItemName.trim() && showCreateInput) {
      onFileCreate(showCreateInput.parentId, newItemName.trim(), showCreateInput.type);
      setShowCreateInput(null);
      setNewItemName('');
    }
  };

  const renderFileNode = (node: FileNode, level = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    const isActive = node.id === activeFileId;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm ${
            isActive ? 'bg-blue-100 text-blue-900' : 'text-gray-700'
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id);
            } else {
              onFileSelect(node);
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              {isExpanded ? <FolderOpen className="w-4 h-4 mr-1" /> : <Folder className="w-4 h-4 mr-1" />}
              <span>{node.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateItem(node.id, 'file');
                }}
                className="ml-auto opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
                title="Add file"
              >
                <Plus className="w-3 h-3" />
              </button>
            </>
          ) : (
            <>
              <File className="w-4 h-4 mr-1" />
              <span>{node.name}</span>
            </>
          )}
        </div>
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderFileNode(child, level + 1))}
          </div>
        )}
        {showCreateInput?.parentId === node.id && node.type === 'folder' && (
          <div style={{ paddingLeft: `${(level + 1) * 16 + 8}px` }} className="px-2 py-1">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateSubmit();
                if (e.key === 'Escape') setShowCreateInput(null);
              }}
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
              placeholder={`New ${showCreateInput.type}...`}
              autoFocus
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`file-tree ${className}`}>
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Files</h3>
        <div className="flex gap-1">
          <button
            onClick={() => handleCreateItem(null, 'file')}
            className="p-1 hover:bg-gray-200 rounded"
            title="New file"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleCreateItem(null, 'folder')}
            className="p-1 hover:bg-gray-200 rounded"
            title="New folder"
          >
            <Folder className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        {files.map(file => renderFileNode(file))}
        {showCreateInput?.parentId === null && (
          <div className="px-2 py-1">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateSubmit();
                if (e.key === 'Escape') setShowCreateInput(null);
              }}
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
              placeholder={`New ${showCreateInput.type}...`}
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}