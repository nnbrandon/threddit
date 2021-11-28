/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from "react";
import Link from "next/link";
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
        <h3>{title}</h3>
        <div className={styles.previewWrapper}>
          <img
            className={styles.previewImg}
            src={url}
            height={height}
            width={width}
            alt=""
            loading="eager"
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
            loading="eager"
          />
          <h3 className={styles.thumbnailTitle}>{title}</h3>
        </div>
      </Fragment>
    );
  } else {
    postContent = <h3>{title}</h3>;
  }

  const subredditSection = isHome ? post.subreddit_name_prefixed : undefined;

  return (
    <article className={styles.post} onClick={onClickPost}>
      <Link href={commentsPath}>
        <a className={styles.link}>
          <div>
            {subredditSection} Posted by {prefixedAuthor} {date}
          </div>
          {postContent}
          <div>
            {score} score | {num_comments} comments
          </div>
        </a>
      </Link>
    </article>
  );
}

export default Post;
