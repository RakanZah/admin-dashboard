'use client';

import React, { useEffect, useState } from 'react';
import Layout from './layout';

const StatsPage = () => {
  const [stats, setStats] = useState({ trips: 0, causewayCount: 0, activeUsers: 0 });

  useEffect(() => {
    fetch('/api/stats')
      .then((response) => response.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <Layout>
      <div>
        <h1>Dashboard Stats</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-200 rounded shadow">
            <h2>Trips</h2>
            <p>{stats.trips}</p>
          </div>
          <div className="p-4 bg-gray-200 rounded shadow">
            <h2>Causeway Count</h2>
            <p>{stats.causewayCount}</p>
          </div>
          <div className="p-4 bg-gray-200 rounded shadow">
            <h2>Active Users</h2>
            <p>{stats.activeUsers}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StatsPage;
