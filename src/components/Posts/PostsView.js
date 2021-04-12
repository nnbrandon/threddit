import React, { useEffect, useState, useRef } from 'react';
import { Route, useHistory } from 'react-router';

import styles from './Posts.module.scss';
import Post from './Post';
import CommentsOverview from '../Comments/CommentsOverview';

import { fetchPosts } from '../../Reddit/posts';

function PostsView({ match, isHome }) {
  const { subreddit } = match.params;
  const [postList, setPostList] = useState([]);
  const [after, setAfter] = useState('');
  const [selectedPost, setSelectedPost] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [fetchMore, setFetchMore] = useState(false);
  const history = useHistory();
  const postsScrollRef = useRef();

  const commentsPath = isHome
    ? '/home/r/:subreddit/comments/:postId'
    : '/r/:subreddit/comments/:postId';

  useEffect(() => {
    function scrollHandler() {
      // postsScrollRef.current.scrollHeight !== document.scrollingElement.scrollHeight handles making sure
      // fetchMore is not set to true when changing subreddits
      if (
        postsScrollRef.current.scrollTop +
          postsScrollRef.current.clientHeight >=
          postsScrollRef.current.scrollHeight &&
        postsScrollRef.current.scrollHeight !==
          document.scrollingElement.scrollHeight
      ) {
        setFetchMore(true);
      }
    }
    postsScrollRef.current.addEventListener('scroll', scrollHandler);

    return () => {
      postsScrollRef.current.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    async function loadMore(subreddit, after) {
      if (!fetchMore) return;

      setLoading(true);
      try {
        const { posts, nextAfter } = await fetchPosts(subreddit, after);
        setPostList((prevPostList) => [...prevPostList, ...posts]);
        setAfter(nextAfter);
        setLoading(false);
        setFetchMore(false);
      } catch (err) {
        console.error(err);
      }
    }

    loadMore(subreddit, after);
  }, [fetchMore]);

  useEffect(() => {
    async function fetch(subreddit, after) {
      setLoading(true);
      try {
        const { posts, nextAfter } = await fetchPosts(subreddit, after);
        setPostList(posts);
        setAfter(nextAfter);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetch(subreddit, '');

    return () => {
      setSelectedPost(undefined);
      setPostList([]);
      setAfter('');
      setFetchMore(false);
      setLoading(false);
      console.log('subreddit changed in postsview');
    };
  }, [subreddit]);

  function onClickPost(post) {
    console.log(post);
    setSelectedPost(post);
  }

  function onCloseComments(event) {
    if (event.keyCode === 27 || event.type === 'click') {
      setSelectedPost(undefined);
      if (isHome) {
        history.push('/home');
      } else {
        history.push(`/r/${subreddit}`);
      }
    }
  }

  const renderedPosts = postList.map((post) => {
    const selected = selectedPost && post.id === selectedPost.id;
    return (
      <Post
        isHome={isHome}
        key={post.id}
        post={post}
        selected={selected}
        onClickPost={onClickPost}
      />
      // TODO: Move onClickPost to parent element rather than assigning to each post
    );
  });

  const spinner = loading ? 'Loading...' : undefined;
  const subredditText = isHome ? undefined : <div>r/{subreddit}</div>;
  return (
    <div className={styles.container}>
      <div className={styles.posts} ref={postsScrollRef}>
        {subredditText}
        <br />
        {renderedPosts}
        {spinner}
      </div>
      <Route
        path={commentsPath}
        render={(props) => (
          <CommentsOverview
            {...props}
            selectedPost={selectedPost}
            onCloseComments={onCloseComments}
          />
        )}
      />
    </div>
  );
}

export default PostsView;
