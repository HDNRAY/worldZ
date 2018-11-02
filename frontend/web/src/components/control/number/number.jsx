import React, { PureComponent } from 'react'

import styles from './number.less'

class Number extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value || 0
        }
    }

    componentWillReceiveProps = (props) => {
        this.setState({
            value: props.value || this.state.value || 0
        })
    }

    onUpperClick = () => {
        this.setState({
            value: this.state.value + 1
        }, () => this.onChange(1))
    }

    onLowerClick = () => {
        this.setState({
            value: this.state.value - 1
        }, () => this.onChange(-1))
    }

    onChange = (value) => {
        const { onChange } = this.props
        onChange && onChange(value)
    }

    render = () => {
        const { max, min } = this.props
        const { value } = this.state

        return (<div className={styles.numberWrapper}>
            <div >
                {!max || value < max ? <div className={styles.upper} onClick={this.onUpperClick}></div> : null}
            </div>
            <div className={styles.theValue}>{value}</div>
            <div>
                {!min || value > min ? <div className={styles.lower} onClick={this.onLowerClick}></div> : null}
            </div>
        </div>)
    }
}

export default Number