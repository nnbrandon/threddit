import axios from "axios";
import { RedditComment } from "./RedditComment";
import { RedditPost } from "./RedditPost";

export async function fetchComments(url, fetchPost) {
  let result;
  try {
    result = await axios.get(`${url}?limit=50`);
    console.log(result);
    if (result.status !== 200) {
      throw new Error("Unable to fetch comments");
    }
  } catch (err) {
    throw new Error("Unable to fetch comments");
  }

  if (result && result.data) {
    let post;
    if (fetchPost) {
      post = new RedditPost(result.data[0].data.children[0].data); // TODO: Fix hack
    }

    const commentsObject = result.data[1];
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
      post,
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
