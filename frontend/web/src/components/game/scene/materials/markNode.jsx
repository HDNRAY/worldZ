import { PureComponent } from 'react';
import { RegularPolygon } from 'react-konva'
import { metrics } from '../constant'

class MarkNode extends PureComponent {

    onMouseLeave = (e) => {
        const { onHover } = this.props

        !!onHover && onHover({})
    }

    onMouseEnter = (e) => {
        const { coordinate, onHover } = this.props

        !!onHover && onHover(coordinate)
    }

    onClick = (e) => {
        console.log('click', e)

        const { coordinate, onClick } = this.props
        const position = {
            x: e.evt.clientX,
            y: e.evt.clientY
        }
        !!onClick && onClick({ coordinate, position })
    }

    render = () => {

        const { x, y, color } = this.props

        return (<RegularPolygon
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={this.onClick}
            sides={6}
            radius={metrics.MARK_NODE_RADIUS}
            fill={color}
            x={x}
            y={y}
        />)
    }
}

export default MarkNode
