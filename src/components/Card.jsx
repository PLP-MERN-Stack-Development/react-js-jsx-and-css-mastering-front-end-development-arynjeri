// src/components/Card.jsx
export default function Card({ title, content, className }) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded p-4 ${className}`}>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p>{content}</p>
    </div>
  );
}
