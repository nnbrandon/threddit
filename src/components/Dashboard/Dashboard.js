import React, { useEffect, useState } from 'react';
import DashboardRouter from './DashboardRouter';
import styles from './Dashboard.module.scss';

import { fetchSubreddits } from '../../Reddit/subreddits';

function Dashboard() {
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    const subreddits = fetchSubreddits(); // using mock data at the moment
    setSubreddits(subreddits);
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <DashboardRouter subreddits={subreddits} />
      </div>
    </main>
  );
}

export default Dashboard;
