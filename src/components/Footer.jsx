// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 p-4 text-center text-sm">
      &copy; {new Date().getFullYear()} My App. All rights reserved.
    </footer>
  );
}
