import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosClose } from 'react-icons/io';

import styles from './Comments.module.scss';
import PostSection from './PostSection';
import CommentsList from './CommentsList';
import Spinner from '../Icons/Spinner';
import Hamburger from '../Icons/Hamburger';

import { fetchComments } from '../../Reddit/comments';

function getCommentsUrlJSON(subreddit, postId) {
  return `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;
}

function CommentsOverview({
  selectedPost,
  onCloseComments,
  match,
  onCloseNav,
  showNavBar,
}) {
  const { postId, subreddit } = match.params;
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(selectedPost);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', onCloseComments);
    return () => {
      document.removeEventListener('keydown', onCloseComments);
      setComments([]);
      setPost(undefined);
    };
  }, [onCloseComments]);

  useEffect(() => {
    async function fetch() {
      const commentsUrlJSON = getCommentsUrlJSON(subreddit, postId);
      setLoading(true);
      try {
        const { post, comments } = await fetchComments(
          commentsUrlJSON,
          !selectedPost,
        );
      
        if (!selectedPost) {
          setPost(post);
        }

        setComments(comments);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    fetch(subreddit, postId);

    return () => {
      setComments([]);
      setPost(undefined);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spinner = loading ? (
    <div className={styles.loading}>
      <Spinner />
    </div>
  ) : undefined;

  const backArrow = showNavBar ? (
    <IoIosArrowBack
      className={styles.backArrow}
      alt="Back"
      onClick={onCloseComments}
      size="30px"
    />
  ) : (
    <span />
  );

  return (
    <div className={styles.container}>
      <div className={styles.postSectionHeader}>
        <span className={styles.hamburger}>
          {!showNavBar && <Hamburger onClick={onCloseNav} />}
          {backArrow}
        </span>
        <div>
          <IoIosClose alt="Close" onClick={onCloseComments} size="40px" />
        </div>
      </div>
      <div className={styles.commentsContainer}>
        <div className={styles.commentsSection}>
          <PostSection post={post} onCloseComments={onCloseComments} />
          <br />
          {spinner}
          <CommentsList comments={comments} />
        </div>
      </div>
    </div>
  );
}

export default CommentsOverview;
