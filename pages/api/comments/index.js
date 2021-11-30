export default async function handler(req, res) {
  const { subreddit, postId, fetchPost, limit } = req.query;
  console.log("comments query = " + JSON.stringify(req.query));

  const requestUrl = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json?limit=${limit}`;
  let jsonResult;
  let status;
  try {
    const response = await fetch(requestUrl);
    const { status: statusResult } = response;
    status = statusResult;
    jsonResult = await response.json();
  } catch (err) {
    console.error(err);
    res.status(500).send(`Unable to fetch comments for ${postId}`);
  }

  switch (status) {
    case 404:
      res.status(status).json(`${postId} does not exist`);
    case 500:
      res.status(status).json(`Unable to fetch comments for ${postId}`);
    case 200:
      let post = null;
      if (fetchPost === "true") {
        post = jsonResult[0].data.children[0].data;
      }
      const comments = jsonResult[1];

      res.status(status).json({
        comments,
        post,
      });
  }
}
