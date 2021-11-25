import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import styles from "./Posts.module.scss";

function Post({ isHome, post, onClickPost }) {
  const { title, score, num_comments } = post;
  const prefixedAuthor = post.getPrefixedAuthor();
  const date = post.timeSince();
  const commentsPath = isHome
    ? `/home/r/${post.subreddit}/comments/${post.id}`
    : `/r/${post.subreddit}/comments/${post.id}`;

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
          <img src={url} width={width} height={height} alt="" loading="eager" />
          <h3 className={styles.thumbnailTitle}>{title}</h3>
        </div>
      </Fragment>
    );
  } else {
    postContent = <h3>{title}</h3>;
  }

  const subredditSection = isHome ? post.subreddit_name_prefixed : undefined;

  return (
    <article className={styles.post} onClick={() => onClickPost(post)}>
      <Link className={styles.link} to={commentsPath}>
        <div>
          {subredditSection} Posted by {prefixedAuthor} {date}
        </div>
        {postContent}
        <div style={{ marginTop: "auto" }}>
          {score} score | {num_comments} comments
        </div>
      </Link>
    </article>
  );
}

export default Post;
