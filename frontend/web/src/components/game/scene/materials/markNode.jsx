import { Component } from 'react';
import { RegularPolygon } from 'react-konva'
import { metrics } from '../constant'

class MarkNode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pointed: false
        }
    }

    onMouseLeave = (e) => {
        this.setState({
            pointed: false
        })
    }

    onMouseEnter = (e) => {
        this.setState({
            pointed: true
        })
    }

    onClick = (e) => {
        // console.log('click', e.target.attrs)
        const { coordinateX, coordinateY, onClick } = this.props

        !!onClick && onClick({ coordinateX, coordinateY })
    }

    render = () => {
        // console.log('rendring', new Date().getTime())
        const { x, y, color } = this.props

        const fill = this.state.pointed ? color + '80' : color + '20'

        return (<RegularPolygon
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={this.onClick}
            sides={6}
            radius={metrics.MARK_NODE_RADIUS}
            fill={fill}
            x={x}
            y={y}
        />)
    }
}

export default MarkNode
