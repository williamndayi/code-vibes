'use client';

import { useState, useEffect } from 'react';
import { Project, Template } from '@/types';
import { defaultTemplates, createProject } from '@/lib/templates';
import IDE from '@/components/IDE';
import { Code, Sparkles, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);

  // Load project from localStorage on mount
  useEffect(() => {
    const savedProject = localStorage.getItem('current-project');
    if (savedProject) {
      try {
        const project = JSON.parse(savedProject);
        setCurrentProject(project);
      } catch (error) {
        console.error('Failed to load saved project:', error);
      }
    }
  }, []);

  // Save project to localStorage whenever it changes
  const handleProjectChange = (project: Project) => {
    setCurrentProject(project);
    localStorage.setItem('current-project', JSON.stringify(project));
  };

  const handleCreateProject = (template: Template) => {
    const projectName = `My ${template.name} Project`;
    const newProject = createProject(projectName, template);
    handleProjectChange(newProject);
    setShowTemplates(false);
  };

  const handleNewProject = () => {
    setShowTemplates(true);
    setCurrentProject(null);
  };

  if (currentProject && !showTemplates) {
    return (
      <div className="h-screen flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Code className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-xl text-gray-900">Code Vibes</span>
            </div>
            <div className="text-gray-400">|</div>
            <span className="font-medium text-gray-700">{currentProject.name}</span>
          </div>
          <button
            onClick={handleNewProject}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            New Project
          </button>
        </div>
        
        {/* IDE */}
        <IDE
          initialProject={currentProject}
          onProjectChange={handleProjectChange}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-8">
              <div className="relative">
                <Code className="w-16 h-16 text-blue-500" />
                <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-1 -right-1" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Vibes</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Build amazing websites and applications with our intuitive, browser-based development environment.
              No setup required, just pure coding vibes! ✨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowTemplates(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Start Building
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      {!showTemplates && (
        <div className="py-24 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Code Vibes?</h2>
              <p className="text-xl text-gray-600">Everything you need to build modern web applications</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Live Code Editor</h3>
                <p className="text-gray-600">Monaco-powered editor with syntax highlighting and intelligent code completion</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Preview</h3>
                <p className="text-gray-600">See your changes come to life instantly with our live preview panel</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Templates</h3>
                <p className="text-gray-600">Start quickly with professionally designed templates for every project</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Section */}
      {showTemplates && (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Template</h2>
              <p className="text-xl text-gray-600">Start with a professionally designed template</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {defaultTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => handleCreateProject(template)}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                        <div className="flex gap-2 mt-1">
                          {template.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{template.description}</p>
                    
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                      <span className="font-medium">Use Template</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button
                onClick={() => setShowTemplates(false)}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}