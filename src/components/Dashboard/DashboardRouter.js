import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PostsView from '../Posts/PostsView';

function DashboardRouter() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route
        path={'/home'}
        render={(props) => <PostsView {...props} isHome={true} />}
      />
      <Route
        path={'/r/:subreddit'}
        render={(props) => <PostsView {...props} isHome={false} />}
      />
    </Switch>
  );
}

export default DashboardRouter;
