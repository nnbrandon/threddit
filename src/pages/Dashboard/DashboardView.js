import React, { useCallback, useEffect, useState } from "react";
import DashboardRouter from "./DashboardRouter";
import styles from "./DashboardView.module.scss";

import Navbar from "../../components/Navbar/Navbar";
import AddSubreddit from "../../components/AddSubreddit/AddSubreddit";

import { fetchSubreddits } from "../../Reddit/subreddits";

function Dashboard() {
  const isMobile = window.screen.width >= 320 && window.screen.width <= 480;

  const [subreddits, setSubreddits] = useState([]);
  const [showNavBar, setShowNavBar] = useState(!isMobile);
  const [showAddSubreddit, setShowAddSubreddit] = useState(false);

  const onClickNav = useCallback(() => {
    setShowNavBar(!showNavBar);
  }, [showNavBar, setShowNavBar]);

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
    <main className={styles.container}>
      {showAddSubreddit && (
        <AddSubreddit
          onClose={onShowAddSubreddit}
          fetchSubreddits={fetchSubreddits}
        />
      )}
      {showNavBar && (
        <Navbar
          navData={subreddits}
          onClickNav={onClickNav}
          onShowAddSubreddit={onShowAddSubreddit}
        />
      )}
      <div className={styles.view}>
        <DashboardRouter
          fetchSubreddits={fetch}
          showNavBar={showNavBar}
          onClickNav={onClickNav}
        />
      </div>
    </main>
  );
}

export default Dashboard;
