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
      path: '/r/frontend',
      text: '/r/frontend',
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
  const [subreddit, setSubreddit] = useState('');

  useEffect(() => {
    const navData = mockNavData();
    setNavData(navData);
  }, []);

  function onClickSubreddit(subreddit) {
    setSubreddit(subreddit);
  }

  return (
    <main className={styles.container}>
      <Navbar navData={navData} onClickSubreddit={onClickSubreddit} />
      <div className={styles.content}>
        <Header />
        <DashboardRouter subreddit={subreddit} />
      </div>
    </main>
  );
}

export default Dashboard;
