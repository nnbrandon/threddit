import React, { useEffect, useRef } from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import Post from './Post';
import styles from './Posts.module.scss';

function getNodeHeight(node) {
  const clone = node.cloneNode(true);
  // hide the meassured (cloned) element
  clone.style.cssText = 'position:fixed; top:-9999px; opacity:0;';
  // add the clone to the DOM
  document.body.appendChild(clone);
  // meassure it
  const height = clone.clientHeight;
  // cleaup
  clone.parentNode.removeChild(clone);
  return height;
}

function InfiniteScroll({
  subreddit,

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

  const listRef = useRef(null);

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  useEffect(() => {
    if (listRef.current) {
      console.log(
        'resetting since subreddit changed and VariableSizedList keeps a cache of dimensions for each index',
      );
      listRef.current.resetAfterIndex(0);
    }
  }, [subreddit]);

  const getItemSize = (index) => {
    if (!postList.length) {
      return 0;
    }

    const post = postList[index];
    if (!post) return 0;

    const node = document.createElement('div');
    const titleNode = document.createElement('h3');
    const postedNode = document.createElement('div');
    const metadataNode = document.createElement('div');

    titleNode.innerText = post.title;
    postedNode.innerText = `${post.subreddit} Posted by ${post.prefixedAuthor}`;
    metadataNode.innerText = `${post.score} score | ${post.num_comments} comments`;

    node.appendChild(titleNode);
    node.appendChild(postedNode);
    node.appendChild(metadataNode);

    const nodeHeight = getNodeHeight(node);

    const thumbnailHeight = post.thumbnail ? post.thumbnail.height + 10 : 0;

    return 50 + nodeHeight + thumbnailHeight;
  };

  // Render an item or a loading indicator.
  const RenderedPost = ({ index, style }) => {
    const post = postList[index];
    let content;
    if (!isItemLoaded(index)) {
      content = (
        <div style={style} className={styles.postWrapper}>
          Loading...
        </div>
      );
    } else {
      content = (
        <div style={style} className={styles.postWrapper}>
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
              ref={(list) => {
                ref(list);
                listRef.current = list;
              }}
              itemSize={getItemSize}
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
