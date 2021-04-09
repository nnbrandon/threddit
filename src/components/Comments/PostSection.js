import React from 'react';
import he from 'he';

import styles from './Comments.module.scss';

function PostSection({ post, onCloseComments }) {
  let renderPostSection;
  if (post) {
    const { title, score, num_comments } = post;
    const prefixedAuthor = post.getPrefixedAuthor();
    const date = post.timeSince();
    let text;
    if (post && post.text_html) {
      text = he.decode(post.text_html);
    }

    renderPostSection = (
      <div>
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

  return <React.Fragment>{renderPostSection}</React.Fragment>;
}

export default PostSection;
