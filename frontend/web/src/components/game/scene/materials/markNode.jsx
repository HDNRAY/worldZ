import { Component } from 'react';
import { RegularPolygon } from 'react-konva'
import { metrics } from '../constant'

class MarkNode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hovered: false
        }
    }

    onMouseLeave = (e) => {
        // this.setState({
        //     hovered: false
        // })
        const { onHover } = this.props

        !!onHover && onHover({})
    }

    onMouseEnter = (e) => {
        // this.setState({
        //     hovered: true
        // })

        const { coordinateX, coordinateY, onHover } = this.props

        !!onHover && onHover({ x: coordinateX, y: coordinateY })
    }

    onClick = (e) => {
        // console.log('click', e.target.attrs)
        const { coordinateX, coordinateY, onClick } = this.props

        !!onClick && onClick({ x: coordinateX, y: coordinateY })
    }

    render = () => {

        const { x, y, color } = this.props
        console.log('rendring', x, y)
        // const fill = this.state.hovered ? color + '80' : color + '20'
        const fill = color + '20'

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
