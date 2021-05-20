import React, { useEffect, useRef } from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import Post from './Post';
import Spinner from '../Icons/Spinner';
import styles from './Posts.module.scss';

const fontFamily =
  "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;";

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
  const widthRef = useRef(null);

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
    if (!isItemLoaded(index)) {
      return 150;
    }

    const post = postList[index];

    const node = document.createElement('div');
    const titleNode = document.createElement('h3');
    const postedNode = document.createElement('div');
    const metadataNode = document.createElement('div');

    titleNode.innerText = post.title;
    postedNode.innerText = `r/${post.subreddit} Posted by ${post.prefixedAuthor} XXX days ago`;
    metadataNode.innerText = `${post.score} score | ${post.num_comments} comments`;

    if (widthRef.current) {
      console.log(widthRef.current);
      const margin = widthRef.current * 0.2;
      const width = widthRef.current - margin;
      console.log('new width ' + width);

      const style = `width:${width}px;${fontFamily};word-wrap:break-word`;
      titleNode.style.cssText = style;
      postedNode.style.cssText = style;
      metadataNode.style.cssText = style;
    }

    node.appendChild(titleNode);
    node.appendChild(postedNode);
    node.appendChild(metadataNode);

    const nodeHeight = getNodeHeight(node);

    const additionalHeight = post.thumbnail ? post.thumbnail.height + 10 : 10;

    return 50 + nodeHeight + additionalHeight;
  };

  // Render an item or a loading indicator.
  const RenderedPost = ({ index, style }) => {
    const post = postList[index];
    let content;
    if (!isItemLoaded(index)) {
      content = (
        <div style={style} className={`${styles.loading}`}>
          <Spinner />
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
      {({ height, width }) => {
        if (width !== widthRef.current) {
          widthRef.current = width;
        }
        return (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
            threshold={8}
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
        );
      }}
    </AutoSizer>
  );
}

export default InfiniteScroll;
