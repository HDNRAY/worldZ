import { PureComponent } from 'react'
import { connect } from 'dva'
import { Layer } from 'react-konva'
import { metrics } from '../constant'
import { getXYByCoorinate } from '../util/util'
import MarkNode from '../../scene/materials/markNode'

class CharacterLayer extends PureComponent {

    render = () => {
        const { character, dispatch, paths, sideLength } = this.props
        const radius = metrics.MAP_NODE_RADIUS
        const { coordinate } = character
        const { x, y } = getXYByCoorinate({
            ...coordinate,
            radius,
            distance: metrics.MAP_NODE_DISTANCE,
            sideLength
        })

        const nodeProps = {
            coordinateX: coordinate.x,
            coordinateY: coordinate.y,
            key: 'character' + coordinate.x + '' + coordinate.y,
            radius, x, y,
            color: '#ffffff20',
            onClick: ({ x, y }) => {
                console.log('character clicked', x, y)
                dispatch({
                    type: 'scene/showMoveables',
                })
            }
        }

        return (<Layer>
            {!paths.length ? <MarkNode {...nodeProps} /> : null}
        </Layer>)
    }
}

const mapStateToProps = (state, props) => {
    return {
        character: state.scene.get('character'),
        paths: state.scene.get('paths'),
        sideLength: state.scene.get('sideLength'),
        ...props
    }
}

export default connect(mapStateToProps)(CharacterLayer)
