import React, { useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { useStore } from './store/useStore';
import { Layout, LayoutGrid, Timer } from 'lucide-react';

function App() {
  const { addWidget } = useStore();

  useEffect(() => {
    // Initialize default widgets with unique IDs
    addWidget({
      id: 'tasks-widget-1',
      type: 'tasks',
      title: 'Task Management',
      x: 0,
      y: 0,
      w: 6,
      h: 8,
    });
    
    addWidget({
      id: 'pomodoro-widget-1',
      type: 'pomodoro',
      title: 'Pomodoro Timer',
      x: 6,
      y: 0,
      w: 4,
      h: 6,
    });
  }, [addWidget]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <LayoutGrid className="w-8 h-8 text-indigo-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">Lofiteria</h1>
            </div>
            <nav className="flex space-x-4">
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700">
                <Layout className="w-4 h-4 mr-2" />
                Layouts
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700">
                <Timer className="w-4 h-4 mr-2" />
                Focus Mode
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;