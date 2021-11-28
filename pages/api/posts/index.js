export default async function handler(req, res) {
  const { subreddit, after, limit } = req.query;
  console.log(req.query);

  const requestUrl = !subreddit
    ? `https://www.reddit.com/.json?after=${after}&limit=${limit}`
    : `https://www.reddit.com/r/${subreddit}.json?after=${after}&limit=${limit}`;
  const response = await fetch(requestUrl);
  const { status } = response;
  const jsonResult = await response.json();

  switch (status) {
    case 404:
      res.status(status).json(`${subreddit} does not exist`);
    case 500:
      res.status(status).json(`Unable to fetch posts for ${subreddit}`);
    case 200:
      const { children, after } = jsonResult.data;
      res.status(status).json({
        redditPosts: children,
        nextAfter: after,
      });
  }
}
