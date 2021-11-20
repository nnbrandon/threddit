import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PostsView from '../Posts/PostsView';

function DashboardRouter({ subreddits, fetchSubreddits }) {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route
        path={'/home'}
        render={(props) => (
          <PostsView {...props} isHome={true} subreddits={subreddits} fetchSubreddits={fetchSubreddits}/>
        )}
      />
      <Route
        path={'/r/:subreddit'}
        render={(props) => (
          <PostsView {...props} isHome={false} subreddits={subreddits} fetchSubreddits={fetchSubreddits}/>
        )}
      />
    </Switch>
  );
}

export default DashboardRouter;
