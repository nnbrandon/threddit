import axios from "axios";

import { RedditPost } from "./RedditPost";

export async function fetchPosts(url) {
  let result;
  try {
    result = await axios.get(url);
    if (result.status !== 200) {
      throw new Error("Unable to fetch posts");
    }
  } catch (err) {
    throw new Error(`Unable to fetch posts for ${subreddit}`);
  }

  if (result && result.data) {
    const { redditPosts, nextAfter } = result.data;
    const posts = extractPosts(redditPosts);
    return {
      posts,
      nextAfter,
    };
  }
}

function extractPosts(children) {
  return children.map((child) => new RedditPost(child.data));
}
