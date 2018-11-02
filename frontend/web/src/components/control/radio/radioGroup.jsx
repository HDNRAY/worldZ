import React, { PureComponent } from 'react'

import styles from './radioGroup.less'

class RadioGroup extends PureComponent {
    onChange = (event) => {
        this.props.onChange && this.props.onChange(event.currentTarget.value)
    }
    render = () => {
        const { value, options } = this.props

        const radios = options.map((option, index) => {
            return (<label className={styles.radioOption} key={option.label + index}>
                <input type='radio' name='needASameName' onChange={this.onChange} value={option.value}
                    checked={option.value === value ? 'checked' : ''} />
                <div>{option.label}</div>
            </label>)
        })

        return (<div className={styles.radioGroup}>
            {radios}
        </div>)
    }
}

export default RadioGroup