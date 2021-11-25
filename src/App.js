import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import DashboardView from "./pages/Dashboard/DashboardView";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="*" component={DashboardView} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
