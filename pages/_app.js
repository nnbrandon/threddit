import { useState, useCallback, useEffect, memo, useRef } from "react";
import { useRouter } from "next/router";

import "../styles/globals.scss";
import styles from "../styles/_app.module.scss";

import Navbar from "../components/Navbar/Navbar";
import AddSubreddit from "../components/AddSubreddit/AddSubreddit";

import { fetchSubreddits } from "../Reddit/SubredditService";

const ROUTES_TO_RETAIN = ["/", "/r/[subreddit]"];

function App({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router; // pathname = dynamic route
  const RetainedComponent = useRef(null);

  const [subreddits, setSubreddits] = useState([]);
  const [showNavBar, setShowNavBar] = useState(true);
  const [showAddSubreddit, setShowAddSubreddit] = useState(false);

  const onClickPost = useCallback((subreddit) => {
    console.log(subreddit);
  }, []);

  const onClickNavItem = useCallback((subreddit) => {
    RetainedComponent.current = null;
  }, []);

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

  const isRetainableRoute = ROUTES_TO_RETAIN.includes(pathname);
  // Set component for retainedComponent if we haven't got it already
  if (isRetainableRoute && !RetainedComponent.current) {
    const MemoComponent = memo(Component);
    RetainedComponent.current = (
      <MemoComponent
        {...pageProps}
        onClickPost={onClickPost}
        onClickNav={onClickNav}
        isNavBarShowing={showNavBar}
        refreshSubreddit={fetch}
      />
    );
  }

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
          onClickNavItem={onClickNavItem}
        />
      )}
      <div className={styles.view}>
        {RetainedComponent.current}
        {!isRetainableRoute && (
          <Component
            {...pageProps}
            onClickPost={onClickPost}
            onClickNav={onClickNav}
            isNavBarShowing={showNavBar}
            refreshSubreddit={fetch}
          />
        )}
      </div>
    </main>
  );
}

export default App;
