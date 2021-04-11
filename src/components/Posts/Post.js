import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Posts.module.scss';

function Post({ isHome, post, selected, onClickPost }) {
  const { title, score, num_comments, commentsUrl } = post;
  const prefixedAuthor = post.getPrefixedAuthor();
  const date = post.timeSince();
  const commentsPath = isHome
    ? `/home/r/${post.subreddit}/comments/${post.id}`
    : `/r/${post.subreddit}/comments/${post.id}`;

  let thumbnail;
  if (post.thumbnail) {
    const { url, height, width } = post.thumbnail;
    thumbnail = <img alt={title} src={url} />;
  }

  const subredditSection = isHome ? post.subreddit_name_prefixed : undefined;

  const articleStyle = selected
    ? `${styles.post} ${styles.selectedPost}`
    : styles.post;

  return (
    <Link className={styles.link} to={commentsPath}>
      <article className={articleStyle} onClick={() => onClickPost(post)}>
        <div>
          {subredditSection} Posted by {prefixedAuthor} {date}
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
