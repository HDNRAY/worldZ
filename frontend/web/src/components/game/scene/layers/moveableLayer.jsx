import { PureComponent } from 'react'
import { connect } from 'dva'
import { Layer } from 'react-konva'
import { metrics } from '../constant'
import { getXYByCoorinate } from '../util/util'
import MarkNode from '../materials/markNode'


class MoveableLayer extends PureComponent {

    onHover = ({ x, y }) => {
        console.log('moveable hovered', x, y)
        this.props.dispatch({
            type: 'scene/showPath',
            payload: {
                x, y
            }
        })
    }

    render = () => {
        const radius = metrics.MARK_NODE_RADIUS
        const { moveables, dispatch, sideLength, paths } = this.props
        // console.log('moveables', moveables)
        if (moveables.size === 0) return null

        const nodes = Object.keys(moveables).reduce((result, moveableString) => {

            const moveable = JSON.parse(moveableString)
            const { x, y } = getXYByCoorinate({
                ...moveable,
                radius,
                distance: metrics.MAP_NODE_DISTANCE,
                sideLength
            })

            const color = '#00ff00' + (paths.some(path => JSON.stringify(path) === moveableString) ? '80' : '20')

            const nodeProps = {
                coordinateX: moveable.x,
                coordinateY: moveable.y,
                key: 'moveable' + moveable.x + '' + moveable.y,
                radius, x, y, color,
                onHover: this.onHover
            }

            result.push(<MarkNode {...nodeProps} />)

            return result
        }, [])
        return (
            <Layer>
                {nodes}
            </Layer>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        moveables: state.scene.get('moveables'),
        sideLength: state.scene.get('sideLength'),
        paths: state.scene.get('paths'),
        ...props
    }
}

export default connect(mapStateToProps)(MoveableLayer)
