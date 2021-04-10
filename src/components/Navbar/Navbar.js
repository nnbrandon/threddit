import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';

function Navbar({ navData, onClickSubreddit }) {
  const renderNavData = navData.map((data, index) => {
    return (
      <li key={index}>
        <Link to={data.path}>{data.text}</Link>
      </li>
    );
  });

  return (
    <div className={styles.sidebar}>
      <nav
        className={styles.nav}
        onClick={(event) => {
          const subreddit = event.target.getAttribute('href');
          onClickSubreddit(subreddit);
        }}
      >
        <ul>{renderNavData}</ul>
      </nav>
    </div>
  );
}

export default Navbar;
