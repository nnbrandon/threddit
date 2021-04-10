import React, { useEffect, useState } from 'react';

import styles from './Posts.module.scss';
import Post from './Post';
import CommentsOverview from '../Comments/CommentsOverview';

import { fetchPosts } from '../../Reddit/posts';
import { Route, useHistory } from 'react-router';

function PostsView({ subreddit }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(undefined);
  const [nextAfter, setNextAfter] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setSelectedPost(undefined);
    setPosts([]);
    setLoading(true);

    async function fetch() {
      try {
        const { posts, nextAfter } = await fetchPosts(subreddit, nextAfter);
        setPosts(posts);
        setNextAfter(nextAfter);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetch();
  }, [subreddit]);

  function onClickPost(post) {
    console.log(post);
    setSelectedPost(post);
  }

  function onCloseComments(event) {
    if (event.keyCode === 27 || event.type === 'click') {
      setSelectedPost(undefined);

      if (!subreddit) {
        history.push('/');
      } else {
        history.push(`${subreddit}`);
      }
    }
  }

  const renderedPosts = posts.map((post) => {
    const selected = selectedPost && post.id === selectedPost.id;
    return (
      <Post
        key={post.id}
        post={post}
        selected={selected}
        onClickPost={onClickPost}
      />
      // TODO: Move onClickPost to parent element rather than assigning to each post
    );
  });

  const spinner = loading ? 'Loading...' : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <div>{subreddit}</div>
        <br />
        {renderedPosts}
        {spinner}
      </div>
      <Route
        path="/r/:subreddit/comments/:postId"
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
