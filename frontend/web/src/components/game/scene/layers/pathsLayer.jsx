import { PureComponent } from 'react'
import { connect } from 'dva'
import { Layer } from 'react-konva'
import { metrics } from '../constant'
import { getXYByCoorinate } from '../util/util'
import MarkNode from '../materials/markNode'

class PathLayer extends PureComponent {

    render = () => {
        const radius = metrics.MARK_NODE_RADIUS
        const { paths, dispatch } = this.props
        // console.log('moveables', moveables)
        if (paths.size === 0) return null
        const nodes = []

        paths.forEach((step) => {
            const { x, y } = getXYByCoorinate(step)

            const nodeProps = {
                coordinateX: step.x,
                coordinateY: step.y,
                key: 'step' + step.x + '' + step.y,
                radius, x, y,
                color: '#00ff00',
                onClick: ({ x, y }) => {
                    console.log('step clicked', x, y)
                    dispatch({
                        type: 'scene/move',
                        payload: {
                            x, y
                        }
                    })
                }
            }

            nodes.push(<MarkNode {...nodeProps} />)
        })
        // console.log(nodes)
        return <Layer>
            {nodes}
        </Layer>
    }
}

const mapStateToProps = (state, props) => {
    return {
        moveables: state.scene.get('moveables'),
        paths: state.scene.get('paths'),
        ...props
    }
}

export default connect(mapStateToProps)(PathLayer)
