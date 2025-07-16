import './globals.css';
import Navbar from '../components/Navbar';

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
    <html lang="en" className="w-full h-full p-0 m-0">
      <body className="w-full h-full p-0 m-0 bg-gray-100">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
