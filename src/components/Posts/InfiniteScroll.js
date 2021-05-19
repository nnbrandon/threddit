import React from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import Post from './Post';

function InfiniteScroll({
  isHome,
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage,

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading,

  // Array of items loaded so far.
  postList,

  // Callback function responsible for loading the next page of items.
  loadNextPage,

  onClickPost,
}) {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? postList.length + 1 : postList.length;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index) => !hasNextPage || index < postList.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // const getItemSize = (index) => {
  //   if (!postList.length) {
  //     return 0;
  //   }

  //   const post = postList[index];
  //   if (post && post.thumbnail) {
  //     return 250;
  //   }

  //   return 200;
  // };

  // Render an item or a loading indicator.
  const RenderedPost = ({ index, style }) => {
    const post = postList[index];
    let content;
    if (!isItemLoaded(index)) {
      content = <div style={style}>Loading...</div>;
    } else {
      content = (
        <div style={style}>
          <Post
            isHome={isHome}
            key={post.id}
            post={post}
            onClickPost={onClickPost}
          />
        </div>
      );
    }
    return content;
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
          threshold={10}
        >
          {({ onItemsRendered, ref }) => (
            <List
              itemCount={itemCount}
              onItemsRendered={onItemsRendered}
              ref={ref}
              itemSize={250}
              height={height}
              width={width}
            >
              {RenderedPost}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
}

export default InfiniteScroll;
