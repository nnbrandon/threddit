import React from 'react';

import Comment from './Comment';

function CommentsList({ comments }) {
  const renderedComments = comments.map((comment, index) => (
    <Comment key={`${comment.id}${index}`} comment={comment} />
  ));

  return (
    <div>
      {renderedComments}
      <br />
      <br />
    </div>
  );
}

export default CommentsList;
