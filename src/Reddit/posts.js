import axios from 'axios';

import { Post } from './post';
import { fetchSubreddits } from './subreddits';

export async function fetchPosts(subreddit, currentAfter) {
  if (!subreddit) {
    const subreddits = fetchSubreddits().filter(subreddit => subreddit.text !== 'Home');

    if (!subreddits.length) {
      subreddit = 'all';  
    } else {
      subreddit = `${subreddits.map(subreddit => subreddit.text + '+')}`;
      subreddit = subreddit.replaceAll(',', "").substring(0, subreddit.length - 1);
    }
  }

  const requestUrl = `https://www.reddit.com/r/${subreddit}.json?after=${currentAfter}&limit=15`
  let result;
  try {
    result = await axios.get(requestUrl);
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
