import { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Posts from './components/Posts';
import TaskManager from './components/TaskManager';

function App() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false); // toggle dark/light

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col`}>
      
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">PLP Task Manager</h1>
          {/* Dark/Light mode toggle */}
          <Button
            variant="secondary"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8 flex-1">
        
        {/* Counter section with progress bar */}
        <div className={`overflow-hidden shadow rounded-lg p-6 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
          <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-xl font-bold mb-2">Task Counter</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-center">
              Track the number of tasks you are managing
            </p>

            {/* Counter buttons */}
            <div className="flex items-center gap-4 my-4">
              <Button variant="danger" onClick={() => setCount((c) => Math.max(0, c - 1))}>-</Button>
              <span className="text-2xl font-bold">{count}</span>
              <Button variant="success" onClick={() => setCount((c) => Math.min(100, c + 1))}>+</Button>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden mt-4">
              <div
                className="bg-blue-600 h-4 transition-all duration-300"
                style={{ width: `${count}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">{count} / 100 tasks completed</p>
          </div>
        </div>

        {/* TaskManager */}
        <TaskManager />

        {/* Posts (API Data) */}
        <Posts />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} PLP Task Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
