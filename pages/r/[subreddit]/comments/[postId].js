import React, { useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import CommentList from "../../../../components/CommentList/CommentList";

import { RedditPost } from "../../../../Reddit/RedditPost";

export async function getServerSideProps(context) {
  const { subreddit, postId } = context.params;
  // https://api.reddit.com/r/subreddit/api/info/?id=t3_id
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

function CommentsList({ showNavbar, onClickNav, selectedPost, isHome }) {
  console.log(selectedPost);
  const router = useRouter();
  const { postId, subreddit } = router.query;

  const onCloseComments = useCallback(() => {
    if (isHome) {
      router.push("/");
    } else {
      router.push(`/r/${subreddit}`);
    }
  }, [router]);

  return (
    <React.Fragment>
      <Head>
        <title>{selectedPost && selectedPost.title}</title>
        <meta
          property="og:title"
          content={`${selectedPost && selectedPost.title}`}
          key="title"
        />
        <meta
          name="description"
          content={`${selectedPost && selectedPost.selftext}`}
          key="description"
        />
      </Head>
      <CommentList
        postId={postId}
        subreddit={subreddit}
        selectedPost={selectedPost ? new RedditPost(selectedPost) : undefined}
        onCloseComments={onCloseComments}
        showNavbar={showNavbar}
        onClickNav={onClickNav}
      />
    </React.Fragment>
  );
}

export default CommentsList;
