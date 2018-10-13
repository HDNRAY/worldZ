import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { CHARACTER_SELECT } from '../routes'
import Input from '../../components/form/input/input';
import Button from '../../components/form/button/button';
import { loginStates } from '../../models/user';

import styles from './login.less'
class Login extends PureComponent {
    state = {
        username: '',
        password: ''
    }

    componentDidMount = () => {
        if (this.props.hasLogin) {
            this.goCharacterSelect()
        }
    }

    componentWillReceiveProps = (props) => {
        if (props.hasLogin) {
            this.goCharacterSelect()
        }
    }

    goCharacterSelect = () => {
        console.log(this.props)
        this.props.history.push(CHARACTER_SELECT)
    }

    onUsernameChange = (value) => {
        this.setState({
            username: value
        })
    }

    onPasswordChange = (value) => {
        this.setState({
            password: value
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
        const { message } = this.props
        const { username, password } = this.state

        return (<div className={styles.page}>
            <div className={styles.loginPanel}>
                <Input value={username} type='text' placeholder='用户名' onChange={this.onUsernameChange} />
                <Input value={password} onChange={this.onPasswordChange} type='password' placeholder='密码' />
                <Button message={message} text='登录' onClick={this.doLogin} />
            </div>
        </div>)
    }

}

// Game.propTypes = {};

const mapStateToProps = (state, props) => {
    return {
        message: state.user.get('message'),
        hasLogin: state.user.get('loginState') === loginStates.LOGGED_IN,
        ...props
    }
}

export default connect(mapStateToProps)(Login)