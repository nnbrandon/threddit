import React, { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso'

import Post from './Post';
import Spinner from '../Icons/Spinner';
import styles from './Posts.module.scss';

function InfiniteScroll({
  isHome,

  // Array of items loaded so far.
  postList,

  // Callback function responsible for loading the next page of items.
  loadNextPage,

  onClickPost,
}) {
  // Render a Post
  const RenderedPost = useCallback((index) => {
    const post = postList[index]
    return (
      <div className={styles.postWrapper}>
      <Post
        isHome={isHome}
        key={post.id}
        post={post}
        onClickPost={onClickPost}
      />
    </div>
    );
  }, [isHome, onClickPost, postList]);

  return (
    <Virtuoso
      style={{height: "100vh", width: "100%"}}
      data={postList}
      endReached={loadNextPage}
      itemContent={RenderedPost}
      components={{
        Footer: () => {
          return (
            <div className={`${styles.loading}`}>
              <Spinner />
            </div>
          );
        }
      }}
    />
  );
}

export default InfiniteScroll;
