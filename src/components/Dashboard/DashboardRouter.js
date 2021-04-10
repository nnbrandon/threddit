import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PostsView from '../Posts/PostsView';
import CommentsOverview from '../Comments/CommentsOverview';

function DashboardRouter({ subreddit }) {
  return (
    <Switch>
      <Route
        path={['/', '/r/:subreddit']}
        render={() => <PostsView subreddit={subreddit} />}
      />
    </Switch>
  );
}

export default DashboardRouter;
