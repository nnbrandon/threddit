import React, { useEffect, useState, useCallback, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  IoIosArrowBack,
  IoIosClose,
  IoIosArrowDropdownCircle as DropdownArray,
} from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { Virtuoso } from "react-virtuoso";

import styles from "./[postId].module.scss";

import Layout from "../../../../components/Layout/Layout";
import CommentPostSection from "../../../../components/Comments/CommentPostSection";
import Comment from "../../../../components/Comments/Comment";
import Spinner from "../../../../components/Spinner/Spinner";

import { fetchComments } from "../../../../Reddit/RedditCommentService";
import { RedditPost } from "../../../../Reddit/RedditPost";

function getCommentsUrlJSON(subreddit, postId, fetchPost, limit) {
  return `/api/comments?subreddit=${subreddit}&postId=${postId}&fetchPost=${fetchPost}&limit=${limit}`;
}

export async function getServerSideProps(context) {
  const { subreddit, postId } = context.params;
  // https://api.reddit.com/r/gaming/api/info/?id=t3_r2ng9l
  const requestUrl = `https://reddit.com/r/${subreddit}/api/info.json?id=t3_${postId}`;
  let selectedPost = null;

  try {
    const response = await fetch(requestUrl);
    const jsonResult = await response.json();
    const { children } = jsonResult.data;
    selectedPost = children[0].data;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      selectedPost,
    }, // will be passed to the page component as props
  };
}

function CommentsOverview({ showNavbar, onClickNav, selectedPost, isHome }) {
  const router = useRouter();
  const { postId, subreddit } = router.query;

  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(
    selectedPost ? new RedditPost(selectedPost) : undefined
  );
  const [loading, setLoading] = useState(false);

  const virtuosoRef = useRef(null);
  const commentIndexRef = useRef({
    startIndex: 0,
    endIndex: 0,
  });
  const currentCommentIndex = useRef(0);
  const didFirstClick = useRef(false);

  const onCloseComments = useCallback(() => {
    if (isHome) {
      router.push("/");
    } else {
      router.push(`/r/${subreddit}`);
    }
  }, [router]);

  const handleKeydown = useCallback(
    (event) => {
      if (event.keyCode == 27) {
        onCloseComments();
      }
    },
    [onCloseComments]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown, router]);

  useEffect(() => {
    async function fetch(subreddit, postId, fetchPost, limit) {
      const commentsUrlJSON = getCommentsUrlJSON(
        subreddit,
        postId,
        fetchPost,
        limit
      );
      setLoading(true);
      try {
        const { post, comments } = await fetchComments(
          commentsUrlJSON,
          fetchPost
        );

        if (post) {
          setPost(new RedditPost(post));
        }
        setComments(comments);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    console.log("will fetch post = " + !selectedPost);
    fetch(subreddit, postId, !selectedPost, 25);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subreddit, postId]);

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
    if (
      currentCommentIndex.current < startIndex ||
      currentCommentIndex.current > endIndex
    ) {
      if (!didFirstClick.current) {
        didFirstClick.current = true;
      }
      currentCommentIndex.current = startIndex;
    }
  }

  const backArrow = showNavbar ? (
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
      <Head>
        <title>{post && post.title}</title>
        <meta
          property="og:title"
          content={`${post && post.title}`}
          key="title"
        />
        <meta
          name="description"
          content={`${post && post.text}`}
          key="description"
        />
      </Head>
      <div className={styles.postSectionHeader}>
        <span className={styles.hamburger}>
          {!showNavbar && (
            <GiHamburgerMenu
              className={styles.clickableIcon}
              size="30px"
              onClick={onClickNav}
            />
          )}
          {backArrow}
        </span>
        <div>
          <IoIosClose
            className={styles.clickableIcon}
            alt="Close"
            size="40px"
            onClick={onCloseComments}
          />
        </div>
      </div>
      <div className={styles.arrowDown}>
        <DropdownArray
          className={styles.clickableIcon}
          alt="Next Comment"
          onClick={scrollToNextComment}
          size="50px"
          color="#4fbcff"
        />
      </div>
      <div className={styles.commentsContainer}>
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
  );
}

export default CommentsOverview;
