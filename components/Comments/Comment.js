import React from "react";
import he from "he";
import styles from "./Comment.module.scss";

function Comment({ comment }) {
  const { score, body_html, id, depth } = comment;
  const prefixedAuthor = comment.getPrefixedAuthor();
  const date = comment.timeSince();

  let text;
  if (body_html) {
    text = he.decode(body_html);
  }

  const isMobile = window.screen.width >= 320 && window.screen.width <= 480;
  const marginLeft = isMobile ? `${depth * 3.5 + 0}%` : `${depth * 0.8 + 0}%`;

  return (
    <div className={styles.comment} key={id} style={{ marginLeft }}>
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
