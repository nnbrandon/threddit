import React, { useEffect, useState } from 'react';

import styles from './Posts.module.scss';
import Post from './Post';
import CommentsOverview from '../Comments/CommentsOverview';

import { fetchPosts } from '../../Reddit/posts';

function PostsView({ subreddit }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(undefined);
  const [nextAfter, setNextAfter] = useState('');
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(async () => {
    setLoading(true);
    try {
      const { posts, nextAfter } = await fetchPosts(subreddit, nextAfter);
      setPosts(posts);
      setNextAfter(nextAfter);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  function onClickPost(post) {
    console.log(post);
    setSelectedPost(post);
    setShowComments(true);
  }

  function onCloseComments() {
    setSelectedPost(undefined);
    setShowComments(false);
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
    );
  });

  let commentsOverview;
  if (selectedPost && showComments) {
    commentsOverview = (
      <div className={styles.comments}>
        <CommentsOverview
          selectedPost={selectedPost}
          onCloseComments={onCloseComments}
        />
      </div>
    );
  }

  const spinner = loading ? 'Loading...' : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {spinner}
        {renderedPosts}
      </div>
      {commentsOverview}
    </div>
  );
}

export default PostsView;
