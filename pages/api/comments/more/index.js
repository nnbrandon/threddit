export default async function handler(req, res) {
  const { postId, limit_children, children, parent_id } = req.query;
  console.log("more comments query = " + JSON.stringify(req.query));

  const requestUrl = !parent_id
    ? `https://api.reddit.com/api/morechildren.json?api_type=json&children=${children}&limit_children=${limit_children}&link_id=${postId}`
    : `https://api.reddit.com/api/morechildren.json?api_type=json&children=${children}&limit_children=${limit_children}&link_id=${postId}&id=${parent_id}`;
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

  console.log(jsonResult);

  switch (status) {
    case 404:
      res.status(status).json(`${postId} does not exist`);
    case 500:
      res.status(status).json(`Unable to fetch comments for ${postId}`);
    case 200:
      if (jsonResult.json && jsonResult.json.errors.length) {
        res.status(500).json(`Unable to fetch more comments for ${postId}`);
        break;
      }

      let comments = [];
      if (
        jsonResult.json &&
        jsonResult.json.data &&
        jsonResult.json.data.things
      ) {
        comments = jsonResult.json.data.things;
      }

      res.status(status).json({
        comments,
      });
  }
}
