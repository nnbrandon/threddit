import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './Posts.module.scss';
import Post from './Post';
import CommentsOverview from '../Comments/CommentsOverview';

import { fetchPosts } from '../../Reddit/posts';

function getPostId(pathname) {
  const pathArr = pathname.split('/');
  if (pathArr[3]) {
    return pathArr[3];
  }
  return undefined;
}

function getSubreddit(pathname) {
  if (pathname === '/') {
    return 'all';
  }

  const pathArr = pathname.split('/');
  if (pathArr[2]) {
    return pathArr[2];
  }
  return undefined;
}

function PostsView() {
  const location = useLocation();
  const { pathname } = location;
  const subreddit = getSubreddit(pathname);
  const postId = getPostId(pathname);

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(undefined);
  const [nextAfter, setNextAfter] = useState('');
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

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
  if ((selectedPost || postId) && showComments) {
    // TODO: SUPER UGLY HACKAROUND, DOES NOT HAVE POSTID CASE EITHER
    if (
      selectedPost &&
      (selectedPost.subreddit === subreddit || subreddit === 'all')
    ) {
      const id = postId || selectedPost.id;
      commentsOverview = (
        <div className={styles.comments}>
          <CommentsOverview
            subreddit={subreddit}
            postId={id}
            selectedPost={selectedPost}
            onCloseComments={onCloseComments}
          />
        </div>
      );
    }
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
