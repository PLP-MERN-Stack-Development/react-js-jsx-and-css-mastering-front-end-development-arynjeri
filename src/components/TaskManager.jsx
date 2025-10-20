import { useEffect, useState } from 'react';
import Button from './Button';

const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (!text.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text, completed: false, createdAt: new Date().toISOString() },
    ]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const editTask = (id, text) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return { tasks, addTask, toggleTask, editTask, deleteTask };
};

const TaskManager = () => {
  const { tasks, addTask, toggleTask, editTask, deleteTask } = useTasks();
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    addTask(input);
    setInput('');
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (editText.trim()) editTask(editingId, editText);
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>

      {/* Add Task */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          className="flex-grow border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />
        <Button type="submit" variant="primary" disabled={!input.trim()}>Add</Button>
      </form>

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.length === 0 && <li className="text-gray-500 text-center">No tasks yet</li>}
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between border p-3 rounded dark:border-gray-700">
            <div className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-5 w-5 text-blue-600 rounded"
              />
              {editingId === task.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={saveEdit}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                  autoFocus
                  className="flex-1 border-b border-blue-400 bg-transparent dark:text-gray-100"
                />
              ) : (
                <span
                  onDoubleClick={() => startEditing(task)}
                  className={`${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''} flex-1`}
                >
                  {task.text}
                </span>
              )}
            </div>

            <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
