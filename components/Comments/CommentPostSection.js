import React from "react";
import Image from "next/image";
import he from "he";

import styles from "./Comment.module.scss";

function PostSection({ post }) {
  if (!post) {
    return <div></div>;
  }

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
    <div className={styles.previewImageWrapper}>
      <Image
        objectFit="contain"
        layout="fill"
        src={previewSource.url}
        alt=""
        loading="eager"
        quality="100"
      />
      {/* <Image
        height={previewSource.height}
        width={previewSource.width}
        src={previewSource.url}
        alt=""
        loading="eager"
      /> */}
    </div>
  ) : undefined;

  return (
    <div className={styles.postSection}>
      <div>
        r/{post.subreddit} Posted by {prefixedAuthor} {date}
      </div>
      <h3>{he.decode(title)}</h3>
      {url}
      <br />
      <div
        className={styles.textHtml}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <div className={styles.postSectionPreview}>{preview}</div>
      <br />
      <div>
        {score} score | {num_comments} comments
      </div>
    </div>
  );
}

export default PostSection;
