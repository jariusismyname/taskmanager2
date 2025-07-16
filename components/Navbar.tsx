'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const hideNavOn = ['/login', '/register', '/forgot-password'];
  if (hideNavOn.includes(pathname)) return null;

  return (
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
  );
}
