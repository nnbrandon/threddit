import React, { useCallback, useEffect, useState } from "react";
import { Route, useHistory } from "react-router";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { Virtuoso } from "react-virtuoso";

import styles from "./PostsView.module.scss";

import Post from "../../../components/Post/Post";
import Spinner from "../../../components/Icons/Spinner";
import CommentsView from "./Comments/CommentsView";
import Hamburger from "../../../components/Icons/Hamburger";

import { fetchPosts } from "../../../Reddit/posts";
import {
  addSubreddit,
  removeSubreddit,
  isSubscribed,
} from "../../../Reddit/subreddits";

function PostsView({ match, isHome, fetchSubreddits, onClickNav, showNavBar }) {
  const { subreddit } = match.params;
  const [postList, setPostList] = useState([]);
  const [after, setAfter] = useState("");
  const [selectedPost, setSelectedPost] = useState(undefined);
  const history = useHistory();

  const viewPortHeight = useCallback(() => window.innerHeight, []);

  function _loadNextPage(...args) {
    function loadMore(subreddit, after) {
      try {
        setTimeout(async () => {
          const { posts, nextAfter } = await fetchPosts(subreddit, after);
          setPostList((prevPostList) => [...prevPostList, ...posts]);
          setAfter(nextAfter);
        }, 1000);
      } catch (err) {
        console.error(err);
      }
    }
    loadMore(subreddit, after);
  }

  const commentsPath = isHome
    ? "/home/r/:subreddit/comments/:postId"
    : "/r/:subreddit/comments/:postId";

  useEffect(() => {
    async function fetch(subreddit, after) {
      try {
        const { posts, nextAfter } = await fetchPosts(subreddit, after);
        setPostList(posts);
        setAfter(nextAfter);
      } catch (err) {
        console.error(err);
      }
    }

    fetch(subreddit, "");

    return () => {
      setSelectedPost(undefined);
      setPostList([]);
      setAfter("");
      console.log("subreddit changed in postsview");
    };
  }, [subreddit]);

  const onClickPost = useCallback((post) => {
    setSelectedPost(post);
  }, []);

  function subscribeToSubreddit() {
    addSubreddit(subreddit);
    fetchSubreddits();
  }

  function unsubscribeToSubreddit() {
    removeSubreddit(subreddit);
    fetchSubreddits();
  }

  const onCloseComments = useCallback(
    (event) => {
      if (event.keyCode === 27 || event.type === "click") {
        setSelectedPost(undefined);
        if (isHome) {
          history.push("/home");
        } else {
          history.push(`/r/${subreddit}`);
        }
      }
    },
    [history, isHome, subreddit]
  );

  const RenderedPost = useCallback(
    (index) => {
      const post = postList[index];
      return (
        <div className={styles.postWrapper}>
          <Post
            isHome={isHome}
            key={post.id}
            post={post}
            onClickPost={onClickPost}
          />
        </div>
      );
    },
    [isHome, onClickPost, postList]
  );

  const renderCommentsOverview = useCallback(
    (props) => {
      return (
        <CommentsView
          {...props}
          onCloseNav={onClickNav}
          showNavBar={showNavBar}
          selectedPost={selectedPost}
          onCloseComments={onCloseComments}
        />
      );
    },
    [onClickNav, onCloseComments, showNavBar, selectedPost]
  );

  const subredditText = isHome ? <div>Home</div> : <div>r/{subreddit}</div>;
  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <Route path={commentsPath} render={renderCommentsOverview} />
        <div className={styles.subredditText}>
          {!showNavBar && (
            <span className={styles.hamburger}>
              <Hamburger onClick={onClickNav} />
            </span>
          )}
          <h3>
            <i>{subredditText}</i>
          </h3>
          {!isHome && (
            <span className={styles.heart}>
              {isSubscribed(subreddit) ? (
                <IoHeartSharp
                  size="30px"
                  color="rgb(249, 24, 128)"
                  onClick={unsubscribeToSubreddit}
                />
              ) : (
                <IoHeartOutline size="30px" onClick={subscribeToSubreddit} />
              )}
            </span>
          )}
        </div>
        <Virtuoso
          style={{ height: "93vh", width: "100%" }}
          data={postList}
          endReached={_loadNextPage}
          increaseViewportBy={{
            top: 0,
            bottom: viewPortHeight() * 2,
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

export default PostsView;
