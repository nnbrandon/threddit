import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import DashboardRouter from './DashboardRouter';
import styles from './Dashboard.module.scss';

function mockNavData() {
  return [
    {
      path: '',
      text: 'Home',
    },
    {
      path: '/r/javascript',
      text: '/r/javascript',
    },
    {
      path: '/r/Frontend',
      text: '/r/Frontend',
    },
    {
      path: '/r/reactjs',
      text: '/r/reactjs',
    },
    {
      path: '/r/webdev',
      text: '/r/webdev',
    },
    {
      path: '/r/wildrift',
      text: '/r/wildrift',
    },
    {
      path: '/r/wallstreetbets',
      text: '/r/wallstreetbets',
    },
    {
      path: '/r/stocks',
      text: '/r/stocks',
    },
    {
      path: '/r/wallstreetbets',
      text: '/r/wallstreetbets',
    },
    {
      path: '/r/gme',
      text: '/r/gme',
    },
  ];
}

function Dashboard() {
  const [navData, setNavData] = useState([]);

  useEffect(() => {
    const navData = mockNavData();
    setNavData(navData);
  }, []);

  return (
    <main className={styles.container}>
      <Navbar navData={navData} />
      <div className={styles.content}>
        <Header />
        <DashboardRouter />
      </div>
    </main>
  );
}

export default Dashboard;
