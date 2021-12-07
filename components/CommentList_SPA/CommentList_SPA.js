import { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Head from "next/head";

import CommentList from "../CommentList/CommentList";

function CommentListWrapper({
  match,
  selectedPost,
  showNavbar,
  onClickNav,
  isHome,
}) {
  const { postId, subreddit } = match.params;
  const history = useHistory();

  function onCloseComments() {
    if (isHome) {
      history.push("/");
    } else {
      history.push(`/r/${subreddit}`);
    }
  }

  return (
    <Fragment>
      <Head>
        <title>{selectedPost && selectedPost.title}</title>
        <meta
          property="og:title"
          content={`${selectedPost && selectedPost.title}`}
          key="title"
        />
        <meta
          name="description"
          content={`${selectedPost && selectedPost.text}`}
          key="description"
        />
      </Head>
      <CommentList
        postId={postId}
        subreddit={subreddit}
        selectedPost={selectedPost}
        onCloseComments={onCloseComments}
        showNavbar={showNavbar}
        onClickNav={onClickNav}
      />
    </Fragment>
  );
}

export default CommentListWrapper;
