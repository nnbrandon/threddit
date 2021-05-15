import React, { useState } from 'react';
import styles from './Header.module.scss';

function Search() {
  const [showSearchResults, setShowSearchResults] = useState(false);

  function onType(event) {
    if (!event.target.value) {
      setShowSearchResults(false);
    } else {
      setShowSearchResults(true);
    }
  }

  const searchResults = showSearchResults ? (
    <ul className={styles.searchResults}>
      <li>Search posts in "subreddit"</li>
      <li>leagueoflegends</li>
      <li>league</li>
      <li>leagueoftest</li>
    </ul>
  ) : undefined;

  return (
    <div className={styles.search}>
      <input type="search" onChange={onType} />
      {searchResults}
    </div>
  );
}

export default Search;
