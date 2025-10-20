// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-100 dark:bg-gray-900 p-4 flex justify-between items-center">
      <div className="font-bold text-xl">My App</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/tasks" className="hover:text-blue-500">Tasks</Link>
        <Link to="/posts" className="hover:text-blue-500">Posts</Link>
      </div>
    </nav>
  );
}