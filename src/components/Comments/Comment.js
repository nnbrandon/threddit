import React from 'react';
import he from 'he';
import styles from './Comments.module.scss';

function Comment({ comment }) {
  const { score, body_html, id, depth } = comment;
  const prefixedAuthor = comment.getPrefixedAuthor();
  const date = comment.timeSince();

  let text;
  if (body_html) {
    text = he.decode(body_html);
  }

  return (
    <div className={styles.comment} key={id}>
      <div>
        Posted by {prefixedAuthor} {date}
      </div>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <br />
      <div>
        {score} score | Comment depth: {depth}
      </div>
    </div>
  );
}

export default Comment;
