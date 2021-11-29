import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PostList from "../../../components/PostList/PostList";

function SubredditPostsPage({ showNavbar, updateIsHome, onClickNav }) {
  const router = useRouter();
  const { subreddit } = router.query;

  useEffect(() => {
    updateIsHome(false);
  }, []);

  return (
    <div id="subreddit">
      <PostList
        isHome={false}
        subreddit={subreddit}
        showNavbar={showNavbar}
        onClickNav={onClickNav}
      />
    </div>
  );
}

export default SubredditPostsPage;
