import React from 'react';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div>threddit</div>
      <input type="search" />
    </header>
  );
}

export default Header;
