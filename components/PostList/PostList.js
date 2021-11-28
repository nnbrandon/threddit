import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { Virtuoso } from "react-virtuoso";
import useSWRInfinite from "swr/infinite";

import styles from "./PostList.module.scss";

import Post from "../Post/Post";
import Spinner from "../Spinner/Spinner";

import { fetchPosts } from "../../Reddit/RedditPostService";

function addSubreddit() {}

function removeSubreddit() {}

function isSubscribed() {
  return false;
}

function PostList({ isHome, onClickNav, isNavBarShowing, refreshSubreddit }) {
  const router = useRouter();
  const { subreddit: querySubreddit, postId } = router.query; // postId is used to make sure to not fetch posts in comments page
  const path = router.asPath;

  const [subreddit, setSubreddit] = useState(querySubreddit);
  const virtuosoRef = useRef(null);

  const getKey = (pageIndex, previousPageData) => {
    // reached the end
    if (previousPageData && !previousPageData.nextAfter) return null;

    // first page, we don't have `previousPageData`
    if (pageIndex === 0)
      return `/api/posts?subreddit=${isHome ? "" : subreddit}&limit=10`;

    // add the cursor to the API endpoint
    return `/api/posts?subreddit=${isHome ? "" : subreddit}&after=${
      previousPageData.nextAfter
    }&limit=10`;
  };
  const { data, size, setSize } = useSWRInfinite(getKey, fetchPosts, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const redditPosts = useMemo(() => {
    const posts = [];
    if (Array.isArray(data)) {
      for (const response of data) {
        if (response) {
          posts.push(...response.posts);
        }
      }
    }
    return posts;
  }, [data]);

  useEffect(() => {
    // Router query is not ready ...
    if ((!isHome && !querySubreddit) || path === "/r/[subreddit]" || postId)
      return;

    // Subreddit has changed within PostList
    if (querySubreddit !== subreddit) {
      setSubreddit(querySubreddit);
      if (virtuosoRef.current) {
        console.log("scrolling to top");
        virtuosoRef.current.scrollTo({
          top: 0,
        });
      }
    }
  }, [querySubreddit, path, postId, subreddit, isHome]);

  useEffect(() => {
    router.prefetch("/r/[subreddit]/comments/[postId]");
  }, [router]);

  const onLoadMore = () => {
    setSize(size + 2);
  };

  const viewPortHeight = () => {
    if (typeof window !== "undefined") {
      return window.innerHeight / 2;
    }

    return 500;
  };

  function subscribeToSubreddit() {
    addSubreddit(subreddit);
    fetchSubreddits();
  }

  function unsubscribeToSubreddit() {
    removeSubreddit(subreddit);
    fetchSubreddits();
  }

  const RenderedPost = useCallback(
    (index) => {
      const post = redditPosts[index];
      return (
        <div className={styles.postWrapper}>
          <Post isHome={isHome} key={post.id} post={post} index={index} />
        </div>
      );
    },
    [redditPosts, isHome]
  );

  const subredditText = !querySubreddit ? (
    <div>Home</div>
  ) : (
    <div>{querySubreddit}</div>
  );
  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <div className={styles.subredditText}>
          {!isNavBarShowing && (
            <span className={styles.hamburger}>
              <GiHamburgerMenu onClick={onClickNav} size="30px" />
            </span>
          )}
          <h3>
            <i>{subredditText}</i>
          </h3>
        </div>
        <Virtuoso
          ref={virtuosoRef}
          style={{ height: "93vh", width: "100%" }}
          data={redditPosts}
          endReached={onLoadMore}
          increaseViewportBy={{
            top: 0,
            bottom: viewPortHeight(),
          }}
          itemContent={RenderedPost}
          components={{
            Footer: () => {
              return (
                <div className={`${styles.loading}`}>
                  <Spinner />
                </div>
              );
            },
          }}
        />
      </div>
    </div>
  );
}

export default PostList;
