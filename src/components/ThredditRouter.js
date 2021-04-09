import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';

function ThredditRouter() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="*" component={Dashboard} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default ThredditRouter;
