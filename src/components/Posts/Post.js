import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Posts.module.scss';

function Post({ post, selected, onClickPost }) {
  const { title, score, num_comments, commentsUrl } = post;
  const prefixedAuthor = post.getPrefixedAuthor();
  const date = post.timeSince();

  let thumbnail;
  if (post.thumbnail) {
    const { url, height, width } = post.thumbnail;
    thumbnail = <img alt={title} src={url} />;
  }

  const articleStyle = selected
    ? `${styles.post} ${styles.selectedPost}`
    : styles.post;
  return (
    <Link
      className={styles.link}
      to={`/r/${post.subreddit}/comments/${post.id}`}
    >
      <article className={articleStyle} onClick={() => onClickPost(post)}>
        <div>
          Posted by {prefixedAuthor} {date}
        </div>
        <h3>{title}</h3>
        {thumbnail}
        <div>{score}</div>
        <div>{num_comments} comments</div>
      </article>
    </Link>
  );
}

export default Post;
