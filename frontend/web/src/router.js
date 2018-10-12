import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Index from './routes/index';

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Index />
        </Router>
    );
}

export default RouterConfig;