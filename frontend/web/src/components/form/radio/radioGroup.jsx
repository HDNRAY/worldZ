import React, { PureComponent } from 'react'

import styles from './radioGroup.less'

class RadioGroup extends PureComponent {
    onChange = (event) => {
        console.log(event)
        this.props.onChange && this.props.onChange(event.currentTarget.value)
    }
    render = () => {
        const { value, defaultValue, options } = this.props

        const currentValue = value || defaultValue

        const radios = options.map((option, index) => {
            return (<label key={option.label + index}>
                <input type='radio' name='needASameName' onChange={this.onChange} value={option.value} checked={option.value === currentValue ? 'checked' : ''} />
                <span>{option.label}</span>
            </label>)
        })

        return (<div className={styles.wrapper}>
            {radios}
        </div>)
    }
}

export default RadioGroup