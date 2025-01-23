

import React from 'react';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <nav className="w-1/5 bg-gray-800 text-white p-4">
        <ul>
          <li>
            <Link href="/">Stats</Link>
          </li>
          <li>
            <Link href="/active">Active Users</Link>
          </li>
          <li>
            <Link href="/github">Repos</Link>
          </li>
        </ul>
      </nav>
      <main className="w-4/5 p-4">{children}</main>
    </div>
  );
};

export default Layout;
