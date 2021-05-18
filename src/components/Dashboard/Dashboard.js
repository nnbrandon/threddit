import React from 'react';
import DashboardRouter from './DashboardRouter';
import styles from './Dashboard.module.scss';

function Dashboard() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <DashboardRouter />
      </div>
    </main>
  );
}

export default Dashboard;
