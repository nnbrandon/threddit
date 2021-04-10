import React, { useEffect, useState } from 'react';

import styles from './Comments.module.scss';
import PostSection from './PostSection';
import CommentsList from './CommentsList';
import { fetchComments } from '../../Reddit/comments';

function getCommentsUrlJSON(subreddit, postId) {
  return `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;
}

function CommentsOverview({
  // subreddit,
  // postId,
  selectedPost,
  onCloseComments,
  match,
}) {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(undefined);
  const [loading, setLoading] = useState(false);
  console.log(match);
  const { postId, subreddit } = match.params;

  useEffect(() => {
    document.addEventListener('keydown', onCloseComments);
    return () => {
      document.removeEventListener('keydown', onCloseComments);
      setComments([]);
      setPost(undefined);
      console.log('clean');
    };
  }, []);

  // TODO: FIX MEMORY LEAK AROUND subreddit & postId
  useEffect(() => {
    setComments([]);
    setPost(undefined);
    setLoading(true);

    async function fetch() {
      const commentsUrlJSON = getCommentsUrlJSON(subreddit, postId);

      const fetchPost = !selectedPost ? true : false;
      try {
        const { post, comments } = await fetchComments(
          commentsUrlJSON,
          fetchPost,
        );
        setComments(comments);

        if (fetchPost) {
          setPost(post);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetch();
  }, [match]);

  const spinner = loading ? 'Loading comments...' : undefined;

  const p = selectedPost || post;
  return (
    <div className={styles.container}>
      <PostSection post={p} onCloseComments={onCloseComments} />
      <hr />
      {spinner}
      <CommentsList comments={comments} />
    </div>
  );
}

export default CommentsOverview;
