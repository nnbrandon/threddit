import React, { useCallback } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import PostsView from "./Posts/PostsView";

function DashboardRouter({ fetchSubreddits, showNavBar, onClickNav }) {
  const renderHome = useCallback(
    (props) => {
      return (
        <PostsView
          {...props}
          isHome={true}
          fetchSubreddits={fetchSubreddits}
          showNavBar={showNavBar}
          onClickNav={onClickNav}
        />
      );
    },
    [fetchSubreddits, showNavBar, onClickNav]
  );

  const renderSubreddit = useCallback(
    (props) => {
      return (
        <PostsView
          {...props}
          isHome={false}
          fetchSubreddits={fetchSubreddits}
          showNavBar={showNavBar}
          onClickNav={onClickNav}
        />
      );
    },
    [fetchSubreddits, showNavBar, onClickNav]
  );

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path={"/home"} render={renderHome} />
      <Route path={"/r/:subreddit"} render={renderSubreddit} />
    </Switch>
  );
}

export default DashboardRouter;
