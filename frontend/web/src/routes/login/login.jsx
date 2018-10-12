import React from 'react';
import { connect } from 'dva';

import styles from './login.less'
import Input from '../../components/form/input/input';
import Button from '../../components/form/button/button';

class Login extends React.PureComponent {
    state = {
        username: '',
        password: ''
    }

    onUsernameChange = (event) => {
        this.setState({
            username: event.currentTarget.value
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            password: event.currentTarget.value
        })
    }

    doLogin = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'user/login',
            payload: this.state
        })
    }

    render() {

        const { username, password } = this.state

        return (<div className={styles.page}>
            <div className={styles.loginPanel}>
                <Input value={username} message='sss' type='text' placeholder='用户名' onChange={this.onUsernameChange} />
                <Input value={password} onChange={this.onPasswordChange} type='text' placeholder='密码' />
                <Button text='登录' onClick={this.doLogin} />
            </div>
        </div>)
    }

}

// Game.propTypes = {};

const mapStateToProps = (state, props) => {

    return {
        ...props
    }
}

export default connect(mapStateToProps)(Login)