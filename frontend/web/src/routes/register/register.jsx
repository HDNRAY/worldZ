import React from 'react';
import { connect } from 'dva';

import './register.less'

class Register extends React.PureComponent {

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

    doLogin = ()=>{
        this.props.loginAction(this.state)
    }

    render() {

        return (<div className='login-panel'>
            <div>
                <label>
                    <input onChange={this.onUsernameChange} type='text' placeholder='用户名' />
                </label>
                <span></span>
            </div>
            <div>
                <label>
                    <input onChange={this.onPasswordChange} type='text' placeholder='密码' />
                </label>
            </div>
            <div>
                <button onClick={this.doLogin}>登录</button>
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

export default connect(mapStateToProps)(Register)