import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Posts.module.scss';

function Post({ isHome, post, onClickPost }) {
  const { title, score, num_comments } = post;
  const prefixedAuthor = post.getPrefixedAuthor();
  const date = post.timeSince();
  const commentsPath = isHome
    ? `/home/r/${post.subreddit}/comments/${post.id}`
    : `/r/${post.subreddit}/comments/${post.id}`;

  let thumbnail;
  if (post.thumbnail) {
    const { url, height, width } = post.thumbnail;
    thumbnail = (
      <div className={styles.thumbnail}>
        <img src={url} width={width} height={height} alt={title} />
      </div>
    );
  }

  const subredditSection = isHome ? post.subreddit_name_prefixed : undefined;

  return (
    <article className={styles.post} onClick={() => onClickPost(post)}>
      <Link className={styles.link} to={commentsPath}>
        <div>
          {subredditSection} Posted by {prefixedAuthor} {date}
        </div>
        <h3>{title}</h3>
        {thumbnail}
        <div>
          {score} score | {num_comments} comments
        </div>
      </Link>
    </article>
  );
}

export default Post;
