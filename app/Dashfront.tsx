import React from 'react';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <nav className="w-1/5 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        <ul>
          <li className="mb-2">
            <Link href="/" className="hover:text-gray-300">Stats</Link>
          </li>
          <li className="mb-2">
            <Link href="/active" className="hover:text-gray-300">Active Users</Link>
          </li>
          <li className="mb-2">
            <Link href="/github" className="hover:text-gray-300">Repos</Link>
          </li>
        </ul>
      </nav>
      <main className="w-4/5 p-4 bg-white rounded-lg shadow-md">{children}</main>
    </div>
  );
};

export default Layout;
