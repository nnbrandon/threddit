import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';

function Navbar({ navData, selectedSubreddit }) {
  const subreddit = selectedSubreddit ? '/r/' + selectedSubreddit : '';
  const renderNavData = navData.map((data, index) => {
    let selectedStyle;
    if (
      subreddit === data.path ||
      (subreddit === '' && data.path === '/home')
    ) {
      selectedStyle = styles.selectedSubreddit;
    }
    return (
      <li key={index}>
        <Link className={selectedStyle} to={data.path}>
          {data.text}
        </Link>
      </li>
    );
  });

  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>{renderNavData}</ul>
      </nav>
      <div className={styles.buttons}>
        {/* Most likely modal open here to add subreddit */}
        <span className={styles.buttonLayout}>
          <button className={styles.button}>Go to Subreddit</button>
        </span>
        <span className={styles.buttonLayout}>
          <button className={styles.button}>Add Subreddit</button>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
