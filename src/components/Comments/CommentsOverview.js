import React from 'react';
import he from 'he';

import styles from './Comments.module.scss';

function CommentsOverview({ selectedPost, onCloseComments }) {
  const { title, score, num_comments, commentsUrl } = selectedPost;
  const prefixedAuthor = selectedPost.getPrefixedAuthor();
  const date = selectedPost.timeSince();

  let text;
  if (selectedPost.text_html) {
    text = he.decode(selectedPost.text_html);
  }

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onCloseComments}>
        X
      </button>
      <div>
        Posted by {prefixedAuthor} {date}
      </div>
      <h3>{title}</h3>
      <div
        className={styles.textHtml}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <div>{score}</div>
      <div>{num_comments} comments</div>
    </div>
  );
}

export default CommentsOverview;
