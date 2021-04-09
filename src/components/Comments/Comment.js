import React from 'react';
import he from 'he';

function Comment({ comment }) {
  const { score, body_html, id, depth } = comment;
  const prefixedAuthor = comment.getPrefixedAuthor();
  const date = comment.timeSince();

  let text;
  if (body_html) {
    text = he.decode(body_html);
  }

  return (
    <div key={id}>
      <div>
        Posted by {prefixedAuthor} {date}
      </div>
      <div>{score}</div>
      <div>Comment depth: {depth}</div>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <br />
      <br />
    </div>
  );
}

export default Comment;
