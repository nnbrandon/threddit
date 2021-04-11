import React, { useEffect, useState } from 'react';

import styles from './Comments.module.scss';
import PostSection from './PostSection';
import CommentsList from './CommentsList';
import { fetchComments } from '../../Reddit/comments';

function getCommentsUrlJSON(subreddit, postId) {
  return `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;
}

function CommentsOverview({ selectedPost, onCloseComments, match }) {
  const [comments, setComments] = useState([]);
  const [fetchedPost, setFetchedPost] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { postId, subreddit } = match.params;
  const getPost =
    !selectedPost || (selectedPost && selectedPost.id !== postId)
      ? true
      : false;
  const post = getPost ? fetchedPost : selectedPost;

  useEffect(() => {
    document.addEventListener('keydown', onCloseComments);
    return () => {
      document.removeEventListener('keydown', onCloseComments);
      setComments([]);
      setFetchedPost(undefined);
    };
  }, []);

  useEffect(() => {
    setComments([]);
    setFetchedPost(undefined);
    setLoading(true);

    async function fetch() {
      const commentsUrlJSON = getCommentsUrlJSON(subreddit, postId);
      try {
        const { post, comments } = await fetchComments(
          commentsUrlJSON,
          getPost,
        );
        setComments(comments);

        if (getPost) {
          setFetchedPost(post);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetch();
  }, [subreddit, postId]);

  const spinner = loading ? 'Loading comments...' : undefined;

  return (
    <div className={styles.container}>
      <PostSection post={post} onCloseComments={onCloseComments} />
      <hr />
      {spinner}
      <CommentsList comments={comments} />
    </div>
  );
}

export default CommentsOverview;
