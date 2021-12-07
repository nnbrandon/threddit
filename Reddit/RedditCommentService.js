import axios from "axios";
import { RedditComment, RedditCommentMore } from "./RedditComment";
import { RedditPost } from "./RedditPost";

export async function fetchComments(url) {
  let result;
  try {
    result = await axios.get(url);
    if (result.status !== 200) {
      throw new Error("Unable to fetch comments");
    }
  } catch (err) {
    throw new Error("Unable to fetch comments");
  }

  if (result && result.data) {
    const { post, comments: commentsObject } = result.data;
    if (!commentsObject) {
      throw new Error("Unable to fetch comments");
    }
    const { data } = commentsObject;
    if (!data) {
      throw new Error("Unable to fetch comments");
    }

    const { children } = data;
    const comments = flattenComments(children);

    let infiniteMore;
    if (comments.length) {
      const lastElement = comments[comments.length - 1];
      if (lastElement.kind === "more" && lastElement.depth === 0) {
        infiniteMore = comments.pop();
      }
    }

    return {
      post: post ? new RedditPost(post) : null,
      comments,
      infiniteMore,
    };
  }
}

export async function fetchMoreChildren(url) {
  let result;
  try {
    result = await axios.get(url);
    if (result.status !== 200) {
      throw new Error("Unable to fetch comments");
    }
  } catch (err) {
    throw new Error("Unable to fetch comments");
  }

  if (result && result.data) {
    const { comments: children } = result.data;

    const comments = flattenComments(children);
    return {
      comments,
    };
  }
}

function flattenComments(childrenArr) {
  return childrenArr.reduce((accum, current) => {
    const { kind, data } = current;
    let comment;
    if (kind === "more") {
      comment = new RedditCommentMore(kind, data);
    } else {
      comment = new RedditComment(kind, data);
    }

    if (data.replies) {
      const { children } = data.replies.data;
      const flattenedReplies = flattenComments(children);
      accum.push(comment);
      accum = [...accum, ...flattenedReplies];
    } else {
      accum.push(comment);
    }

    return accum;
  }, []);
}
