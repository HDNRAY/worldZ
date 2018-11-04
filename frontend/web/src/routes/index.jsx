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
// import { loginStates } from '../models/user';

class Index extends PureComponent {

    // componentDidMount = ()=>{
    //     const {loginState,dispatch}=this.props
    //     if(loginState === loginStates.NOT_DECIDED){
    //         dispatch({
    //             type:'user/info'
    //         })
    //     }
    // }

    // componentWillReceiveProps = (props)=>{
    //     const {loginState, history} = this.props
    //     if(props.loginState === loginStates.LOGGED_IN && loginState === loginStates.NOT_DECIDED){

    //     }
    // }

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
    return {
        loginState:state.user.get('loginState')
    }
}

export default connect(mapStateToProps)(Index);