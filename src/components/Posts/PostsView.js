import React, { useEffect, useState, useRef } from 'react';
import { Route, useHistory } from 'react-router';

import styles from './Posts.module.scss';
import Post from './Post';
import CommentsOverview from '../Comments/CommentsOverview';

import { fetchPosts } from '../../Reddit/posts';

function PostsView({ match, isHome }) {
  const { subreddit } = match.params;
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(undefined);
  const [nextAfter, setNextAfter] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function fetch() {
      try {
        const { posts, nextAfter } = await fetchPosts(subreddit, nextAfter);
        setPosts(posts);
        setNextAfter(nextAfter);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    setSelectedPost(undefined);
    setPosts([]);
    setLoading(true);
    fetch();

    return () => {
      console.log('unmounted postsview');
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

  const renderedPosts = posts.map((post) => {
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
  const commentsPath = isHome
    ? '/home/r/:subreddit/comments/:postId'
    : '/r/:subreddit/comments/:postId';

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <div>{subreddit}</div>
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
