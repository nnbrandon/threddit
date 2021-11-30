export class RedditComment {
  constructor(kind, data) {
    this.kind = kind;
    this.author = data.author;
    this.created_utc = data.created_utc;
    this.body = data.body;
    this.body_html = data.body_html;
    this.depth = data.depth;
    this.id = data.id;
    this.commentId = data.name;
    this.parent_id = data.parent_id;
    this.score = data.score;
    this.subreddit = data.subreddit;
    this.subreddit_name_prefixed = data.subreddit_name_prefixed;
  }

  getPrefixedAuthor() {
    return `u/${this.author}`;
  }

  timeSince() {
    const datePosted = new Date(this.created_utc * 1000);

    var seconds = Math.floor((new Date() - datePosted) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
}

export class RedditCommentMore {
  constructor(kind, data) {
    this.kind = kind;
    this.count = data.count;
    this.name = data.name;
    this.parent_id = data.parent_id;
    this.children = data.children;
    this.depth = data.depth;
  }
}
