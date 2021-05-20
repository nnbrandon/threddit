import React, { useEffect, useState, useRef } from 'react';
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
  const [comments, setComments] = useState([]);
  const [fetchedPost, setFetchedPost] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { postId, subreddit } = match.params;
  const scrollTopRef = useRef();

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
    async function fetch() {
      const commentsUrlJSON = getCommentsUrlJSON(subreddit, postId);
      setLoading(true);
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

    // Scroll to top after subreddit and postId change
    scrollTopRef.current.scrollTo(0, 0);
    fetch(subreddit, postId);

    return () => {
      setComments([]);
      setFetchedPost(undefined);
    };
  }, [subreddit, postId]);

  const spinner = loading ? (
    <div className={styles.loading}>
      <Spinner />
    </div>
  ) : undefined;

  const hamburger = !showNavBar ? <Hamburger onClick={onCloseNav} /> : <span />;

  return (
    <div className={styles.container} ref={scrollTopRef}>
      <div className={styles.commentsSection}>
        <div className={styles.postSectionHeader}>
          <span className={styles.hamburger}>{hamburger}</span>
          <IoIosClose alt="Close" onClick={onCloseComments} size="40px" />
        </div>
        <PostSection post={post} onCloseComments={onCloseComments} />
        <br />
        {spinner}
        <CommentsList comments={comments} />
      </div>
    </div>
  );
}

export default CommentsOverview;
