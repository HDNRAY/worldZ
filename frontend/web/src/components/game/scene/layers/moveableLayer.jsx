import { PureComponent } from 'react'
import { connect } from 'dva'
import { Layer } from 'react-konva'
import { metrics } from '../constant'
import { getXYByCoorinate } from '../util/util'

class MoveableLayer extends PureComponent {

    render = () => {
        const radius = metrics.MARK_NODE_RADIUS
        const { moveables, dispatch } = this.props
        // console.log('moveables', moveables)
        if (moveables.size === 0) return null
        const nodes = []

        Object.keys(moveables).forEach((moveableString) => {
            const moveable = JSON.parse(moveableString)
            const { x, y } = this.getXYByCoorinate(moveable)

            const nodeProps = {
                coordinateX: moveable.x,
                coordinateY: moveable.y,
                key: 'moveable' + moveable.x + '' + moveable.y,
                radius, x, y,
                color: '#00ff00',
                onHover: ({ x, y }) => {
                    console.log('moveable hovered', x, y)
                    dispatch({
                        type: 'scene/showPath',
                        payload: {
                            x, y
                        }
                    })
                }
            }

            nodes.push(<MarkNode {...nodeProps} />)
        })
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
        ...props
    }
}

export default connect(mapStateToProps)(MoveableLayer)
