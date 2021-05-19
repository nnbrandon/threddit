import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PostsView from '../Posts/PostsView';

function DashboardRouter({ subreddits }) {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route
        path={'/home'}
        render={(props) => (
          <PostsView {...props} isHome={true} subreddits={subreddits} />
        )}
      />
      <Route
        path={'/r/:subreddit'}
        render={(props) => (
          <PostsView {...props} isHome={false} subreddits={subreddits} />
        )}
      />
    </Switch>
  );
}

export default DashboardRouter;
