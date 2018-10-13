import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { connect } from 'dva';
// import styles from './game.css';
import Game from './game/game';
import Login from './login/login'
import Register from './register/register'
import Character from './character/character'
import style from './index.less';

import { GAME, LOGIN, REGISTER, CHARACTER } from './routes'

class Index extends PureComponent {

    render = () => {
        return (<div className={style.layout}>
            <div className={style.header}>worldz</div>
            <div className={style.content} >
                <Switch>
                    <Route path={GAME} exact component={Game} />
                    <Route path={LOGIN} exact component={Login} />
                    <Route path={REGISTER} exact component={Register} />
                    <Route path={CHARACTER} component={Character} />
                    <Redirect to={LOGIN} />
                </Switch>
            </div>
            <div className={style.footer}>footer</div>
        </div>);
    }
}

Index.propTypes = {};

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(Index);