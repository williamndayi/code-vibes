import { FileNode, Template } from '@/types';

export const defaultTemplates: Template[] = [
  {
    id: 'basic-html',
    name: 'Basic Website',
    description: 'A simple HTML, CSS, and JavaScript website',
    preview: '/templates/basic-html.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    files: [
      {
        id: 'index.html',
        name: 'index.html',
        type: 'file',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Awesome Website</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Welcome to Code Vibes</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Build Amazing Things</h2>
            <p>Start creating your web projects with our intuitive editor!</p>
            <button id="cta-button">Get Started</button>
        </section>
        
        <section id="about">
            <h2>About Code Vibes</h2>
            <p>A modern web development environment for creating websites and applications.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Code Vibes. Made with ❤️</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`
      },
      {
        id: 'style.css',
        name: 'style.css',
        type: 'file',
        language: 'css',
        content: `/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

/* Header */
header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    z-index: 100;
}

header h1 {
    color: #4a90e2;
    margin-bottom: 0.5rem;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 2rem;
}

nav a {
    text-decoration: none;
    color: #666;
    font-weight: 500;
    transition: color 0.3s ease;
}

nav a:hover {
    color: #4a90e2;
}

/* Main content */
main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
}

section {
    background: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 2rem;
}

p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    line-height: 1.8;
}

#cta-button {
    background: linear-gradient(45deg, #4a90e2, #63b3ed);
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

#cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.3);
}

/* Footer */
footer {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    text-align: center;
    padding: 2rem;
}

/* Responsive design */
@media (max-width: 768px) {
    nav ul {
        flex-direction: column;
        gap: 1rem;
    }
    
    main {
        padding: 2rem 1rem;
    }
    
    section {
        padding: 1.5rem;
    }
    
    h2 {
        font-size: 1.5rem;
    }
}`
      },
      {
        id: 'script.js',
        name: 'script.js',
        type: 'file',
        language: 'javascript',
        content: `// Welcome to Code Vibes!
// Add your JavaScript functionality here

document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.getElementById('cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Add some interactive functionality
            this.textContent = 'Welcome to Code Vibes! 🎉';
            this.style.background = 'linear-gradient(45deg, #ff6b6b, #feca57)';
            
            // Create some visual effects
            createParticles();
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add some welcome animation
    animateOnLoad();
});

function createParticles() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = \`
            position: fixed;
            width: 10px;
            height: 10px;
            background: #4a90e2;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: \${Math.random() * window.innerWidth}px;
            top: \${Math.random() * window.innerHeight}px;
            animation: float 3s ease-in-out forwards;
        \`;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, 3000);
    }
}

function animateOnLoad() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = \`
@keyframes float {
    0% { transform: translateY(0px) scale(1); opacity: 1; }
    50% { transform: translateY(-100px) scale(1.2); opacity: 0.8; }
    100% { transform: translateY(-200px) scale(0.8); opacity: 0; }
}
\`;
document.head.appendChild(style);

console.log('🎉 Welcome to Code Vibes! Start building amazing things!');`
      }
    ]
  },
  {
    id: 'react-starter',
    name: 'React App',
    description: 'A basic React application with components',
    preview: '/templates/react-starter.png',
    tags: ['React', 'JavaScript', 'Components'],
    files: [
      {
        id: 'index.html',
        name: 'index.html',
        type: 'file',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App - Code Vibes</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" src="app.js"></script>
</body>
</html>`
      },
      {
        id: 'app.js',
        name: 'app.js',
        type: 'file',
        language: 'javascript',
        content: `// React App Component
const { useState, useEffect } = React;

function App() {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const addTodo = () => {
        if (inputValue.trim()) {
            setTodos([...todos, {
                id: Date.now(),
                text: inputValue,
                completed: false
            }]);
            setInputValue('');
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>🚀 Code Vibes React App</h1>
                <p>Build amazing React applications!</p>
            </header>

            <main className="main-content">
                <section className="counter-section">
                    <h2>Counter Example</h2>
                    <div className="counter">
                        <button onClick={() => setCount(count - 1)}>-</button>
                        <span className="count">{count}</span>
                        <button onClick={() => setCount(count + 1)}>+</button>
                    </div>
                </section>

                <section className="todo-section">
                    <h2>Todo List</h2>
                    <div className="todo-input">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                            placeholder="Add a new todo..."
                        />
                        <button onClick={addTodo}>Add</button>
                    </div>
                    
                    <ul className="todo-list">
                        {todos.map(todo => (
                            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                />
                                <span>{todo.text}</span>
                                <button onClick={() => removeTodo(todo.id)}>×</button>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

// Render the App
ReactDOM.render(<App />, document.getElementById('root'));`
      },
      {
        id: 'style.css',
        name: 'style.css',
        type: 'file',
        language: 'css',
        content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    min-height: 100vh;
    color: #333;
}

.app {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.app-header {
    text-align: center;
    color: white;
    margin-bottom: 3rem;
}

.app-header h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.app-header p {
    font-size: 1.2rem;
    opacity: 0.9;
}

.main-content {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .main-content {
        grid-template-columns: 1fr 1fr;
    }
}

.counter-section, .todo-section {
    background: rgba(255, 255, 255, 0.95);
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.counter-section h2, .todo-section h2 {
    margin-bottom: 1.5rem;
    color: #2d3436;
    text-align: center;
}

.counter {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.counter button {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: #0984e3;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.counter button:hover {
    background: #2d3436;
    transform: scale(1.1);
}

.count {
    font-size: 2rem;
    font-weight: bold;
    min-width: 60px;
    text-align: center;
    color: #2d3436;
}

.todo-input {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.todo-input input {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
}

.todo-input input:focus {
    outline: none;
    border-color: #0984e3;
}

.todo-input button {
    padding: 0.75rem 1.5rem;
    background: #00b894;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;
}

.todo-input button:hover {
    background: #00a085;
}

.todo-list {
    list-style: none;
}

.todo-list li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.todo-list li:hover {
    background: #e9ecef;
}

.todo-list li.completed {
    opacity: 0.6;
    text-decoration: line-through;
}

.todo-list li input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
}

.todo-list li span {
    flex: 1;
}

.todo-list li button {
    width: 2rem;
    height: 2rem;
    border: none;
    background: #e17055;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    transition: background 0.3s ease;
}

.todo-list li button:hover {
    background: #d63031;
}`
      }
    ]
  }
];

export const createProject = (name: string, template: Template): any => {
  return {
    id: Date.now().toString(),
    name,
    description: template.description,
    template: template.id,
    files: [...template.files],
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export const getLanguageFromFileName = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  const languageMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'json': 'json',
    'md': 'markdown',
    'py': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'php': 'php',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'vue': 'vue',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml'
  };
  
  return languageMap[extension || ''] || 'plaintext';
};

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};