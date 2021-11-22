import React, { useEffect, useState, useCallback } from 'react';
import { IoIosArrowBack, IoIosClose } from 'react-icons/io';
import { Virtuoso } from 'react-virtuoso'

import styles from './Comments.module.scss';
import PostSection from './PostSection';
import Spinner from '../Icons/Spinner';
import Hamburger from '../Icons/Hamburger';
import Comment from './Comment';

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
    }

    fetch(subreddit, postId);

    return () => {
      setComments([]);
      setPost(undefined);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const RenderedPostHeader = useCallback(() => {
    return (
      <div className={styles.postSectionWrapper}>
        <PostSection post={post} onCloseComments={onCloseComments} />
      </div>
    );
  }, [post, onCloseComments]);

  // Render a Comment
  const RenderedComment = useCallback((index) => {
    const comment = comments[index]
    return (
      <div className={styles.commentWrapper}>
        <Comment
          key={comment.id}
          comment={comment}
        />
      </div>
    );
  }, [comments]);

  const LoadingFooter = useCallback(() => {
    const spinner = (
      <div className={styles.loading}>
        <Spinner />
      </div>
    )
    return spinner;
  }, []);

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
          <Virtuoso 
            style={{height: "100vh", width: "100%"}}
            data={comments}
            itemContent={RenderedComment}
            components={{
              Header: RenderedPostHeader,
              Footer: LoadingFooter
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CommentsOverview;
