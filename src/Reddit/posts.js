import axios from 'axios';

import { Post } from './post';

export async function fetchPosts(subreddit, after) {
  if (!subreddit) {
    subreddit = 'all';
  }
  let result;
  try {
    result = await axios.get(
      `https://www.reddit.com/r/${subreddit}.json?after=${after}&limit=15`,
    );
    console.log(result);
    if (result.status !== 200) {
      throw new Error(`Unable to fetch posts for ${subreddit}`);
    }
  } catch (err) {
    throw new Error(`Unable to fetch posts for ${subreddit}`);
  }

  if (result && result.data && result.data.data) {
    const { children, after } = result.data.data;
    const posts = extractPosts(children);
    return {
      posts,
      nextAfter: after,
    };
  }
}

function extractPosts(children) {
  return children.map((child) => new Post(child.data));
}
