import React from 'react';
import he from 'he';

import styles from './Comments.module.scss';

function PostSection({ post }) {
  let renderPostSection;
  if (post) {
    const { title, score, num_comments } = post;
    const prefixedAuthor = post.getPrefixedAuthor();
    const date = post.timeSince();
    const previewSource = post.getPreviewSource();

    const text = post.text_html ? he.decode(post.text_html) : undefined;
    const url = post.url ? (
      <a href={post.url} target="_blank" rel="noreferrer">
        {post.url}
      </a>
    ) : undefined;
    const preview = previewSource ? (
      <img
        className={styles.previewImg}
        src={previewSource.url}
        alt={`${post.subreddit_name_prefixed} - ${post.title}`}
      />
    ) : undefined;

    renderPostSection = (
      <div className={styles.postSection}>
        <div>
          r/{post.subreddit} Posted by {prefixedAuthor} {date}
        </div>
        <h3>{title}</h3>
        {url}
        <br />
        <div className={styles.postSectionPreview}>{preview}</div>
        <div
          className={styles.textHtml}
          dangerouslySetInnerHTML={{ __html: text }}
        />

        <br />
        <div>
          {score} score | {num_comments} comments
        </div>
      </div>
    );
  }

  return <React.Fragment>{renderPostSection}</React.Fragment>;
}

export default PostSection;
