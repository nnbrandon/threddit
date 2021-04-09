export class Post {
  constructor(data) {
    this.author = data.author;
    this.created_utc = data.created_utc;
    this.id = data.id;
    this.postId = data.name;
    this.is_video = data.is_video;
    this.score = data.score;
    this.subreddit = data.subreddit;
    this.subreddit_id = data.subreddit_id;
    this.subreddit_name_prefixed = data.subreddit_name_prefixed;
    this.title = data.title;
    this.commentsUrl = data.url;
    this.num_comments = data.num_comments;
    this.text = data.selftext;
    this.text_html = data.selftext_html;

    this.thumbnail =
      data.thumbnail_height && data.thumbnail_width
        ? {
            url: data.thumbnail,
            height: data.thumbnail_height,
            width: data.thumbnail_width,
          }
        : undefined;
  }

  getPrefixedAuthor() {
    return `u/${this.author}`;
  }

  getCommentsUrlJSON() {
    return `https://www.reddit.com/${this.subreddit_name_prefixed}/comments/${this.id}.json`;
  }

  timeSince() {
    const datePosted = new Date(this.created_utc * 1000);

    var seconds = Math.floor((new Date() - datePosted) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + ' years ago';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' months ago';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' days ago';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' hours ago';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutes ago';
    }
    return Math.floor(seconds) + ' seconds ago';
  }
}
