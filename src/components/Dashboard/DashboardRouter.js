import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PostsView from '../Posts/PostsView';

function DashboardRouter() {
  return (
    <Switch>
      <Route
        path={['/', '/r/:subreddit', '/r/:subreddit/:id']}
        component={PostsView}
      />
    </Switch>
  );
}

export default DashboardRouter;
