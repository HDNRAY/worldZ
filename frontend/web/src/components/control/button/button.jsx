import React, { PureComponent } from 'react'

import styles from './button.less'

class Button extends PureComponent {
    render = () => {
        const { onClick, text, isLoading, message } = this.props

        const content = isLoading ? <span>Loading</span> : <span>{text}</span>

        return (<button className={styles.wrapper} >
            <div className={styles.message}>{message}</div>
            <div className={styles.button} onClick={onClick}>
                {content}
            </div>
        </button>)
    }
}

export default Button