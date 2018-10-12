import React, { PureComponent } from 'react'

import styles from './input.less'

class Input extends PureComponent {
    render = () => {
        const { message, value, onClear, placeholder, type, onChange, onBlur } = this.props

        const messageDisplay = message
            ? <div className={styles.message}>{message}</div>
            : null

        const clearButtonDisplay = value
            ? <span className={styles.clearIcon} onClick={onClear}>X</span>
            : null

        return (<div className={styles.wrapper}>
            <div className={styles.input}>
                <input value={value} type={type} onBlur={onBlur} onChange={onChange} placeholder={placeholder} />
                {clearButtonDisplay}
            </div>
            {messageDisplay}
        </div>)
    }
}

export default Input