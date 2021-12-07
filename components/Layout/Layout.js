import { useState, useCallback, useEffect } from "react";

import styles from "./Layout.module.scss";

import Navbar from "../Navbar/Navbar";
import AddSubreddit from "../AddSubreddit/AddSubreddit";
import { fetchSubreddits } from "../../Reddit/SubredditService";

function Layout({ children, isHome, showNavbar, onClickNav }) {
  const [subreddits, setSubreddits] = useState([]);
  const [showAddSubreddit, setShowAddSubreddit] = useState(false);

  const fetch = useCallback(() => {
    const subreddits = fetchSubreddits();
    setSubreddits(subreddits);
  }, []);

  function onShowAddSubreddit() {
    setShowAddSubreddit(!showAddSubreddit);
  }

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className={styles.container}>
      {showAddSubreddit && (
        <AddSubreddit
          onClose={onShowAddSubreddit}
          fetchSubreddits={fetchSubreddits}
        />
      )}
      {showNavbar && (
        <Navbar
          isHome={isHome}
          navData={subreddits}
          onClickNav={onClickNav}
          onShowAddSubreddit={onShowAddSubreddit}
        />
      )}
      <main className={styles.view}>{children}</main>
    </div>
  );
}

export default Layout;
