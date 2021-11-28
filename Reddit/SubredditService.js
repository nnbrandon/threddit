export function fetchSubreddits() {
  const localStorageSubreddits = Object.keys(localStorage).map((key) => {
    return {
      path: localStorage.getItem(key),
      text: key,
    };
  });
  const sortedSubreddits = localStorageSubreddits.sort((a, b) => {
    const lowercasedA = a.text.toLowerCase();
    const lowercasedB = b.text.toLowerCase();

    if (lowercasedA < lowercasedB) {
      return -1;
    }

    if (lowercasedA > lowercasedB) {
      return 1;
    }

    return 0;
  });

  return [
    {
      path: "/r/amcstock",
      text: "amcstock",
    },
    {
      path: "/r/ffxiv",
      text: "ffxiv",
    },
    {
      path: "/r/leagueoflegends",
      text: "leagueoflegends",
    },
  ];
  // return sortedSubreddits;
}

export function addSubreddit(subreddit) {
  if (!localStorage.getItem(subreddit)) {
    localStorage.setItem(subreddit, "/r/" + subreddit);
  }
}

export function removeSubreddit(subreddit) {
  localStorage.removeItem(subreddit);
}

export function isSubscribed(subreddit) {
  if (!localStorage.getItem(subreddit)) {
    return false;
  }

  return true;
}
