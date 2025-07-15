import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Task Manager',
  description: 'A simple task manager app using Next.js and Tailwind',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/home" className="text-xl font-bold hover:underline">
              Task Manager
            </Link>
            <div className="space-x-4">
              <Link href="/home" className="hover:underline">Home</Link>
              <Link href="/create" className="hover:underline">Create Task</Link>
              <Link href="/login" className="hover:underline">Logout</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
