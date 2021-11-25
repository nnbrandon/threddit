import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  IoIosArrowBack,
  IoIosClose,
  IoIosArrowDropdownCircle as DropdownArray,
} from "react-icons/io";
import { Virtuoso } from "react-virtuoso";

import styles from "./CommentsView.module.scss";
import CommentPostSection from "../../../../components/Comments/CommentPostSection";
import Spinner from "../../../../components/Icons/Spinner";
import Hamburger from "../../../../components/Icons/Hamburger";
import Comment from "../../../../components/Comments/Comment";

import { fetchComments } from "../../../../Reddit/comments";

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
  const virtuosoRef = useRef(null);
  const commentIndexRef = useRef({
    startIndex: 0,
    endIndex: 0,
  });
  const currentCommentIndex = useRef(0);
  const didFirstClick = useRef(false);

  useEffect(() => {
    document.addEventListener("keydown", onCloseComments);
    return () => {
      document.removeEventListener("keydown", onCloseComments);
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
          !selectedPost
        );

        if (!selectedPost) {
          setPost(post);
        }

        setComments(comments);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetch(subreddit, postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollToNextComment() {
    if (virtuosoRef.current) {
      const currentIndex = currentCommentIndex.current;
      let nextIndex;
      if (!didFirstClick.current) {
        didFirstClick.current = true;
        nextIndex = currentIndex;
      } else {
        nextIndex = currentIndex + 1;
      }

      for (; nextIndex < comments.length; nextIndex++) {
        if (comments[nextIndex].depth === 0) {
          break;
        }
      }

      currentCommentIndex.current = nextIndex;

      virtuosoRef.current.scrollToIndex({
        index: nextIndex,
        align: "start",
        behavior: "smooth",
      });
    }
  }

  function setCommentsRange(indices) {
    commentIndexRef.current = indices;
    const { startIndex, endIndex } = commentIndexRef.current;
    console.log(commentIndexRef.current);
    if (
      currentCommentIndex.current < startIndex ||
      currentCommentIndex.current > endIndex
    ) {
      console.log("currentCommentIndex is out of range");
      if (!didFirstClick.current) {
        didFirstClick.current = true;
      }
      currentCommentIndex.current = startIndex;
    }
  }

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
        <CommentPostSection post={post} onCloseComments={onCloseComments} />
      </div>
    );
  }, [post, onCloseComments]);

  // Render a Comment
  const RenderedComment = (index) => {
    const comment = comments[index];
    return (
      <div className={styles.commentWrapper}>
        <Comment key={comment.id} comment={comment} />
      </div>
    );
  };

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
      <div className={styles.arrowDown}>
        <DropdownArray
          alt="Next Comment"
          onClick={scrollToNextComment}
          size="50px"
          color="#4fbcff"
        />
      </div>
      <div className={styles.commentsContainer}>
        <div>
          <Virtuoso
            ref={virtuosoRef}
            rangeChanged={setCommentsRange}
            style={{ height: "93vh", width: "100%" }}
            data={comments}
            itemContent={RenderedComment}
            components={{
              Header: RenderedPostHeader,
              Footer: () => {
                const className = loading ? styles.loading : styles.notLoading;
                return (
                  <div className={className}>
                    <Spinner />
                  </div>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CommentsOverview;
