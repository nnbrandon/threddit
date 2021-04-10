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
  const [showComments, setShowComments] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setShowComments(false);
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
    setShowComments(true);
  }

  function onCloseComments(event) {
    if (event.keyCode === 27 || event.type === 'click') {
      setSelectedPost(undefined);
      setShowComments(false);

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

  let commentsOverview;
  if (selectedPost && showComments) {
    const id = selectedPost.id;
    commentsOverview = (
      <div className={styles.comments}>
        <Route path="/r/:subreddit/comments/:postId">
          <CommentsOverview
            subreddit={selectedPost.getLowerCasedSubreddit()}
            postId={id}
            selectedPost={selectedPost}
            onCloseComments={onCloseComments}
          />
        </Route>
      </div>
    );
  }

  const spinner = loading ? 'Loading...' : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <div>{subreddit}</div>
        <br />
        {renderedPosts}
        {spinner}
      </div>
      {commentsOverview}
    </div>
  );
}

export default PostsView;
