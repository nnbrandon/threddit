import React, { useCallback } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PostsView from '../Posts/PostsView';

function DashboardRouter({ subreddits, fetchSubreddits }) {
  const renderHome = useCallback((props) => {
    return (
      <PostsView {...props} isHome={true} subreddits={subreddits} fetchSubreddits={fetchSubreddits}/>
    );
  }, [subreddits, fetchSubreddits]);

  const renderSubreddit = useCallback((props) => {
    return (
      <PostsView {...props} isHome={false} subreddits={subreddits} fetchSubreddits={fetchSubreddits}/>
    )
  }, [subreddits, fetchSubreddits]);

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route
        path={'/home'}
        render={renderHome}
      />
      <Route
        path={'/r/:subreddit'}
        render={renderSubreddit}
      />
    </Switch>
  );
}

export default DashboardRouter;
