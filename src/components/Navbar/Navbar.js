import React from 'react';
import styles from './Navbar.module.scss';

function Navbar() {
  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="#">/r/Frontend</a>
          </li>
          <li>
            <a href="#">/r/javascript</a>
          </li>
          <li>
            <a href="#">/r/node</a>
          </li>
          <li>
            <a href="#">/r/reactjs</a>
          </li>
          <li>
            <a href="#">/r/webdev</a>
          </li>
          <li>
            <a href="#">/r/all</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
