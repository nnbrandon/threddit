import React, { useCallback, useEffect, useState } from 'react';
import DashboardRouter from './DashboardRouter';
import styles from './Dashboard.module.scss';

import { fetchSubreddits } from '../../Reddit/subreddits';

function Dashboard() {
  const [subreddits, setSubreddits] = useState([]);
  
  const fetch = useCallback(() => {
    const subreddits = fetchSubreddits();
    setSubreddits(subreddits);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <DashboardRouter subreddits={subreddits} fetchSubreddits={fetch}/>
      </div>
    </main>
  );
}

export default Dashboard;
