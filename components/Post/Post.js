/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
import he from "he";

import styles from "./Post.module.scss";

function Post({ onClickPost, isHome, post, index }) {
  const { title, score, num_comments } = post;
  const prefixedAuthor = post.getPrefixedAuthor();
  const date = post.timeSince();
  const commentsPath = `/r/${post.subreddit}/comments/${post.id}`;

  let postContent;
  const previewSource = post.getPreviewSource();
  let useThumbnail = false;
  if (previewSource && previewSource.height <= 200) {
    useThumbnail = true;
    post.thumbnail = previewSource;
  }
  if (previewSource && !useThumbnail) {
    const { height, width, url } = previewSource;
    postContent = (
      <Fragment>
        <h3>{he.decode(title)}</h3>
        <div className={styles.previewWrapper}>
          <Image
            width={width}
            height={height}
            src={url}
            quality="5"
            priority={height > 500}
          />
        </div>
      </Fragment>
    );
  } else if (post.thumbnail) {
    const { url, height, width } = post.thumbnail;
    postContent = (
      <Fragment>
        <div className={styles.thumbnail}>
          <img
            className={styles.thumbnailImg}
            src={url}
            width={width}
            height={height}
            alt=""
          />
          <h3 className={styles.thumbnailTitle}>{he.decode(title)}</h3>
        </div>
      </Fragment>
    );
  } else {
    postContent = <h3>{he.decode(title)}</h3>;
  }

  const subredditSection = isHome ? post.subreddit_name_prefixed : undefined;

  return (
    <article
      className={styles.post}
      onClick={() => {
        onClickPost(post);
      }}
    >
      <Link className={styles.link} to={commentsPath}>
        <div>
          {subredditSection} Posted by {prefixedAuthor} {date}
        </div>
        {postContent}
        <div>
          {score} score | {num_comments} comments
        </div>
      </Link>
    </article>
  );
}

export default Post;
