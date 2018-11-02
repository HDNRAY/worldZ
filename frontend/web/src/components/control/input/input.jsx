import React, { PureComponent } from 'react'

import styles from './input.less'

class Input extends PureComponent {
    onBlur = (event) => {
        this.props.onBlur && this.props.onBlur(event.currentTarget.value)
    }
    onChange = event => {
        this.props.onChange && this.props.onChange(event.currentTarget.value)
    }
    render = () => {
        const { message, value, placeholder, type, onChange } = this.props

        const messageDisplay = message
            ? <div className={styles.message}>{message}</div>
            : null

        const clearButtonDisplay = value
            ? <span className={styles.clearIcon} onClick={onChange ? () => onChange('') : null}>X</span>
            : null

        return (<div className={styles.wrapper}>
            <div className={styles.input}>
                <input value={value} type={type} onBlur={this.onBlur} onChange={this.onChange} placeholder={placeholder} />
                {clearButtonDisplay}
            </div>
            {messageDisplay}
        </div>)
    }
}

export default Input