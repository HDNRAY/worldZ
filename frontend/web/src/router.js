import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Game from './routes/game';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Game} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;