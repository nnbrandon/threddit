import React from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import PostsView from '../Posts/PostsView';
import styles from './Dashboard.module.scss';

function Dashboard() {
  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <Header />
        <PostsView subreddit="frontend" />
      </div>
    </main>
  );
}

export default Dashboard;
