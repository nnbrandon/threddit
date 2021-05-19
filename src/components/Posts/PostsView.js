import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router';

import styles from './Posts.module.scss';
import Navbar from '../Navbar/Navbar';
import CommentsOverview from '../Comments/CommentsOverview';
import InfiniteScroll from './InfiniteScroll';

import { fetchPosts } from '../../Reddit/posts';

function mockNavData() {
  return [
    {
      path: '/home',
      text: 'Home',
    },
    {
      path: '/r/technology',
      text: '/r/technology',
    },
    {
      path: '/r/javascript',
      text: '/r/javascript',
    },
    {
      path: '/r/JSdev',
      text: '/r/JSdev',
    },
    {
      path: '/r/Frontend',
      text: '/r/Frontend',
    },
    {
      path: '/r/reactjs',
      text: '/r/reactjs',
    },
    {
      path: '/r/angular',
      text: '/r/angular',
    },
    {
      path: '/r/Angular2',
      text: '/r/Angular2',
    },
    {
      path: '/r/webdev',
      text: '/r/webdev',
    },
    {
      path: '/r/wildrift',
      text: '/r/wildrift',
    },
    {
      path: '/r/leagueoflegends',
      text: '/r/leagueoflegends',
    },
    {
      path: '/r/ffxiv',
      text: '/r/ffxiv',
    },
    {
      path: '/r/wallstreetbets',
      text: '/r/wallstreetbets',
    },
    {
      path: '/r/stocks',
      text: '/r/stocks',
    },
    {
      path: '/r/GME',
      text: '/r/GME',
    },
    {
      path: '/r/amcstock',
      text: '/r/amcstock',
    },
    {
      path: '/r/dogecoin',
      text: '/r/dogecoin',
    },
    {
      path: '/r/abmlstock',
      text: '/r/abmlstock',
    },
  ];
}

function PostsView({ match, isHome }) {
  const { subreddit } = match.params;
  const [postList, setPostList] = useState([]);
  const [after, setAfter] = useState('');
  const [selectedPost, setSelectedPost] = useState(undefined);
  const history = useHistory();

  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);

  function _loadNextPage(...args) {
    async function loadMore(subreddit, after) {
      try {
        const { posts, nextAfter } = await fetchPosts(subreddit, after);
        setPostList((prevPostList) => [...prevPostList, ...posts]);
        setAfter(nextAfter);

        if (!nextAfter) {
          setHasNextPage(false);
        } else {
          setHasNextPage(true);
        }

        setIsNextPageLoading(false);
        console.log(postList);
      } catch (err) {
        console.error(err);
      }
    }
    console.log('_loadNextPage', ...args);
    setIsNextPageLoading(true);
    loadMore(subreddit, after);
  }

  const commentsPath = isHome
    ? '/home/r/:subreddit/comments/:postId'
    : '/r/:subreddit/comments/:postId';

  useEffect(() => {
    return () => {
      setSelectedPost(undefined);
      setPostList([]);
      setAfter('');
      setIsNextPageLoading(false);
      setHasNextPage(true);
      console.log('subreddit changed in postsview');
    };
  }, [subreddit]);

  function onClickPost(post) {
    console.log(post);
    setSelectedPost(post);
  }

  function onCloseComments(event) {
    if (event.keyCode === 27 || event.type === 'click') {
      setSelectedPost(undefined);
      if (isHome) {
        history.push('/home');
      } else {
        history.push(`/r/${subreddit}`);
      }
    }
  }

  const subredditText = isHome ? <div>Home</div> : <div>r/{subreddit}</div>;
  return (
    <div className={styles.container}>
      <Navbar navData={mockNavData()} />
      <div className={styles.posts}>
        <Route
          path={commentsPath}
          render={(props) => (
            <CommentsOverview
              {...props}
              selectedPost={selectedPost}
              onCloseComments={onCloseComments}
            />
          )}
        />
        <br />
        {subredditText}
        <br />
        <InfiniteScroll
          subreddit={subreddit}
          isHome={isHome}
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          postList={postList}
          loadNextPage={_loadNextPage}
          onClickPost={onClickPost}
        />
      </div>
    </div>
  );
}

export default PostsView;
