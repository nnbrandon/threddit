import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import DashboardRouter from './DashboardRouter';
import styles from './Dashboard.module.scss';
import { useLocation } from 'react-router';

function mockNavData() {
  return [
    {
      path: '/home',
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
      path: '/r/leagueoflegends',
      text: '/r/leagueoflegends',
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
      path: '/r/GME',
      text: '/r/GME',
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
