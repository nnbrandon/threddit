import React from 'react';

import Search from './Search';
import styles from './Header.module.scss';

function Header({ onClickHamburger }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={onClickHamburger}>
        threddit
      </div>
      <Search />
    </header>
  );
}

export default Header;
