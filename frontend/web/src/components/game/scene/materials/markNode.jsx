import { PureComponent } from 'react';
import { RegularPolygon } from 'react-konva'
import { metrics } from '../constant'

class MarkNode extends PureComponent {

    onMouseLeave = (e) => {
        const { onHover } = this.props

        !!onHover && onHover({})
    }

    onMouseEnter = (e) => {
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
