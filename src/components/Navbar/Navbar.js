import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';

import styles from './Navbar.module.scss';
import Button from '../../shared/Button/Button';

function Navbar({ navData, selectedSubreddit, onCloseNav, onShowGoToSubreddit, onShowAddSubreddit }) {
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
      <span>
        <IoIosClose alt="Close" onClick={onCloseNav} size="50px" />
      </span>
      <nav className={styles.nav}>
        <ul>{renderNavData}</ul>
      </nav>
      <div className={styles.buttons}>
        <span className={styles.buttonLayout}>
          <Button onClickEvent={onShowGoToSubreddit} label="Go to Subreddit"/>
        </span>
        <span className={styles.buttonLayout}>
          <Button onClickEvent={onShowAddSubreddit} label="Add Subreddit"/>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
