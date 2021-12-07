import React, { useCallback, useState, useRef, useMemo } from "react";
import { Route } from "react-router";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { Virtuoso } from "react-virtuoso";
import useSWRInfinite from "swr/infinite";

import styles from "./PostList.module.scss";

import Post from "../Post/Post";
import Spinner from "../Spinner/Spinner";

import { fetchPosts } from "../../Reddit/RedditPostService";
import CommentListWrapper from "../CommentList_SPA/CommentList_SPA";

function addSubreddit() {}

function removeSubreddit() {}

function isSubscribed() {
  return false;
}

function PostList({
  isHome,
  showNavbar,
  onClickNav,
  subreddit,
  refreshSubreddit,
}) {
  const [selectedPost, setSelectedPost] = useState(undefined);
  const virtuosoRef = useRef(null);

  const getKey = (pageIndex, previousPageData) => {
    // Do not make calls if subreddit is not defined and not on Home page
    if (!isHome && !subreddit) {
      return null;
    }

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
    console.log(posts);
    return posts;
  }, [data]);

  const onLoadMore = () => {
    setSize(size + 2);
  };

  const viewPortHeight = () => {
    if (typeof window !== "undefined") {
      return window.innerHeight;
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

  function onClickPost(post) {
    setSelectedPost(post);
  }

  const RenderedPost = useCallback(
    (index) => {
      const post = redditPosts[index];
      return (
        <div className={styles.postWrapper}>
          <Post
            isHome={isHome}
            key={post.id}
            post={post}
            index={index}
            onClickPost={onClickPost}
          />
        </div>
      );
    },
    [redditPosts, isHome]
  );

  const RenderCommentList = useCallback(
    (props) => {
      return (
        <CommentListWrapper
          {...props}
          selectedPost={selectedPost}
          showNavbar={showNavbar}
          onClickNav={onClickNav}
          isHome={isHome}
        />
      );
    },
    [selectedPost, showNavbar, onClickNav, isHome]
  );

  const subredditText = !subreddit ? <div>Home</div> : <div>{subreddit}</div>;
  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <Route
          path={"/r/:subreddit/comments/:postId"}
          render={RenderCommentList}
        />
        <div className={styles.subredditText}>
          {!showNavbar && (
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
          style={{ height: "97%", width: "100%" }}
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
