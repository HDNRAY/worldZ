import React from 'react';
import { Router, Route } from 'dva/router';
import Index from './routes/index';

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Route component={Index} />
        </Router>
    );
}

export default RouterConfig;