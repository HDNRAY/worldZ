import { PureComponent } from 'react';
import { RegularPolygon } from 'react-konva'
import { metrics } from '../constant'

class MapNode extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            pointed: false
        }
    }

    onMouseLeave = (e) => {
        console.log('leave map node')
        this.setState({
            pointed: false
        })
    }

    onMouseEnter = (e) => {
        console.log('enter map node')
        this.setState({
            pointed: true
        })
    }

    onClick = (e) => {
        // console.log('click', e.target.attrs)
        const { coordinateX, coordinateY, onClick } = this.props
        console.log(coordinateX, coordinateY)
        !!onClick && onClick({ coordinateX, coordinateY })
    }

    render = () => {
        // console.log('rendring', new Date().getTime())
        const { x, y } = this.props

        const fill = this.state.pointed ? '#00ffff20' : 'transparent'

        return (<RegularPolygon
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={this.onClick}
            sides={6}
            radius={metrics.MAP_NODE_RADIUS}
            fill={fill}
            stroke={metrics.MAP_NODE_STROKE_COLOR}
            strokeWidth={metrics.MAP_NODE_STROKE_WITH}
            x={x}
            y={y}
        />)
    }
}

export default MapNode
