import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import DashboardRouter from './DashboardRouter';
import styles from './Dashboard.module.scss';

function mockNavData() {
  return [
    {
      path: '/home',
      text: 'Home',
    },
    {
      path: '/r/technology',
      text: '/r/technology',
    },
    {
      path: '/r/javascript',
      text: '/r/javascript',
    },
    {
      path: '/r/JSdev',
      text: '/r/JSdev',
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
      path: '/r/angular',
      text: '/r/angular',
    },
    {
      path: '/r/Angular2',
      text: '/r/Angular2',
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
      path: '/r/ffxiv',
      text: '/r/ffxiv',
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
      path: '/r/GME',
      text: '/r/GME',
    },
    {
      path: '/r/amcstock',
      text: '/r/amcstock',
    },
    {
      path: '/r/dogecoin',
      text: '/r/dogecoin',
    },
    {
      path: '/r/abmlstock',
      text: '/r/abmlstock',
    },
  ];
}

function Dashboard() {
  const [showNavBar, setShowNavBar] = useState(true);
  const [navData, setNavData] = useState([]);

  useEffect(() => {
    const navData = mockNavData();
    setNavData(navData);
  }, []);

  function onClickHamburger() {
    setShowNavBar(!showNavBar);
  }

  return (
    <main className={styles.container}>
      {showNavBar && (
        <Navbar navData={navData} onClickHamburger={onClickHamburger} />
      )}
      <div className={styles.content}>
        <Header onClickHamburger={onClickHamburger} />
        <DashboardRouter />
      </div>
    </main>
  );
}

export default Dashboard;
