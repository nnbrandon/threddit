import { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { BrowserRouter as Router, Route } from "react-router-dom";

import styles from "./index.module.scss";

import PostList from "../../../components/PostList/PostList";

function SubredditPostsPage({ showNavbar, updateIsHome, onClickNav }) {
  const router = useRouter();
  const { subreddit } = router.query;

  useEffect(() => {
    updateIsHome(false);
  }, []);

  const RenderPostList = useCallback(
    (props) => {
      return (
        <div className={styles.postList}>
          <PostList
            {...props}
            id="subreddit"
            isHome={false}
            subreddit={subreddit}
            showNavbar={showNavbar}
            onClickNav={onClickNav}
          />
        </div>
      );
    },
    [showNavbar, onClickNav]
  );

  return (
    <Router>
      <div className={styles.subredditView}>
        <Route path="/" render={RenderPostList} />
        <div className={styles.subredditInfoColumn}>test hi</div>
      </div>
    </Router>
  );
}

export default SubredditPostsPage;
