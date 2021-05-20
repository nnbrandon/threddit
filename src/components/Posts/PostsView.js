import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router';

import styles from './Posts.module.scss';
import Navbar from '../Navbar/Navbar';
import CommentsOverview from '../Comments/CommentsOverview';
import InfiniteScroll from './InfiniteScroll';
import Spinner from '../Icons/Spinner';

import { fetchPosts } from '../../Reddit/posts';

function PostsView({ match, isHome, subreddits }) {
  const { subreddit } = match.params;
  const [postList, setPostList] = useState([]);
  const [after, setAfter] = useState('');
  const [selectedPost, setSelectedPost] = useState(undefined);
  const history = useHistory();

  const [hasNextPage, setHasNextPage] = useState(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);

  function _loadNextPage(...args) {
    async function loadMore(subreddit, after) {
      try {
        const { posts, nextAfter } = await fetchPosts(subreddit, after);
        setPostList((prevPostList) => [...prevPostList, ...posts]);
        setAfter(nextAfter);

        if (!nextAfter) {
          setHasNextPage(false);
        } else {
          setHasNextPage(true);
        }

        setIsNextPageLoading(false);
        console.log(postList);
      } catch (err) {
        console.error(err);
      }
    }
    console.log('_loadNextPage', ...args);
    setIsNextPageLoading(true);
    loadMore(subreddit, after);
  }

  const commentsPath = isHome
    ? '/home/r/:subreddit/comments/:postId'
    : '/r/:subreddit/comments/:postId';

  useEffect(() => {
    async function fetch(subreddit, after) {
      try {
        const { posts, nextAfter } = await fetchPosts(subreddit, after);
        setPostList(posts);
        setAfter(nextAfter);
        if (!nextAfter) {
          setHasNextPage(false);
        } else {
          setHasNextPage(true);
        }

        setIsNextPageLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    setIsNextPageLoading(true);
    fetch(subreddit, '');

    return () => {
      setSelectedPost(undefined);
      setPostList([]);
      setAfter('');
      setIsNextPageLoading(false);
      setHasNextPage(false);
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

  const initialLoading =
    after === '' ? (
      <div className={styles.loading}>
        <Spinner />
      </div>
    ) : undefined;

  const subredditText = isHome ? <div>Home</div> : <div>r/{subreddit}</div>;
  return (
    <div className={styles.container}>
      <Navbar navData={subreddits} />
      <div className={styles.posts}>
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
        <br />
        {subredditText}
        <br />
        {initialLoading}
        <InfiniteScroll
          subreddit={subreddit}
          isHome={isHome}
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          postList={postList}
          loadNextPage={_loadNextPage}
          onClickPost={onClickPost}
        />
      </div>
    </div>
  );
}

export default PostsView;
