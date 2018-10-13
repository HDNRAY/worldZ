import React, { PureComponent } from 'react'

import styles from './input.less'

class Input extends PureComponent {
    onBlur = (event) => {
        console.log(event)
    }
    render = () => {
        const { message, value, placeholder, type, onChange } = this.props

        const messageDisplay = message
            ? <div className={styles.message}>{message}</div>
            : null

        const clearButtonDisplay = value
            ? <span className={styles.clearIcon} onClick={() => onChange('')}>X</span>
            : null

        return (<div className={styles.wrapper}>
            <div className={styles.input}>
                <input value={value} type={type} onBlur={this.onBlur} onChange={event => onChange(event.currentTarget.value)} placeholder={placeholder} />
                {clearButtonDisplay}
            </div>
            {messageDisplay}
        </div>)
    }
}

export default Input