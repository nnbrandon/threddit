import axios from "axios";
import { RedditComment } from "./RedditComment";
import { RedditPost } from "./RedditPost";

export async function fetchComments(url, fetchPost) {
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
    return {
      post: post ? new RedditPost(post) : null,
      comments,
    };
  }
}

function flattenComments(childrenArr) {
  return childrenArr.reduce((accum, current) => {
    const { data } = current;
    const comment = new RedditComment(data);
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
