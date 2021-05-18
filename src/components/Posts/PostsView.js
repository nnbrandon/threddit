import React, { useEffect, useState, useRef } from 'react';
import { Route, useHistory } from 'react-router';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import styles from './Posts.module.scss';
import Post from './Post';
import Navbar from '../Navbar/Navbar';
import CommentsOverview from '../Comments/CommentsOverview';

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
  const [loading, setLoading] = useState(false);
  const [fetchMore, setFetchMore] = useState(false);
  const history = useHistory();
  const postsScrollRef = useRef();

  const commentsPath = isHome
    ? '/home/r/:subreddit/comments/:postId'
    : '/r/:subreddit/comments/:postId';

  useEffect(() => {
    // function scrollHandler() {
    //   // postsScrollRef.current.scrollHeight !== document.scrollingElement.scrollHeight handles making sure
    //   // fetchMore is not set to true when changing subreddits
    //   if (
    //     postsScrollRef.current.scrollTop +
    //       postsScrollRef.current.clientHeight >=
    //       postsScrollRef.current.scrollHeight &&
    //     postsScrollRef.current.scrollHeight !==
    //       document.scrollingElement.scrollHeight
    //   ) {
    //     setFetchMore(true);
    //   }
    // }
    // postsScrollRef.current.addEventListener('scroll', scrollHandler);

    return () => {
      // postsScrollRef.current.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    async function loadMore(subreddit, after) {
      if (!fetchMore) return;
      if (after === null || after === undefined) return;

      setLoading(true);
      try {
        const { posts, nextAfter } = await fetchPosts(subreddit, after);
        setPostList((prevPostList) => [...prevPostList, ...posts]);
        setAfter(nextAfter);
        setLoading(false);
        setFetchMore(false);
      } catch (err) {
        console.error(err);
      }
    }

    loadMore(subreddit, after);
  }, [fetchMore]);

  useEffect(() => {
    async function fetch(subreddit, after) {
      setLoading(true);
      try {
        const { posts, nextAfter } = await fetchPosts(subreddit, after);
        setPostList(posts);
        setAfter(nextAfter);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetch(subreddit, '');

    return () => {
      setSelectedPost(undefined);
      setPostList([]);
      setAfter('');
      setFetchMore(false);
      setLoading(false);
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

  const RenderedPost = ({ index, style }) => {
    const post = postList[index];
    return (
      <Post
        style={style}
        isHome={isHome}
        key={post.id}
        post={post}
        onClickPost={onClickPost}
      />
    );
  };

  const getItemSize = (index) => {
    const post = postList[index];
    if (post.thumbnail) {
      const { height } = post.thumbnail;
      console.log(height);
      return 120 + height;
    }

    return 150;
  };

  const subredditText = isHome ? undefined : <div>r/{subreddit}</div>;
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
        <AutoSizer>
          {({ height, width }) => (
            <List
              itemSize={getItemSize}
              itemCount={postList.length}
              height={height}
              width={width}
            >
              {RenderedPost}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default PostsView;
