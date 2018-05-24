import { PureComponent } from 'react'
import { connect } from 'dva'
import { Layer } from 'react-konva'
import { metrics } from '../constant'
import { getXYByCoorinate } from '../util/util'
import MarkNode from '../../scene/materials/markNode'

class CharacterLayer extends PureComponent {

    onClick = ({ coordinate, position }) => {
        console.log('character clicked', coordinate)

        const { dispatch, moveables, attackables } = this.props;

        const operations = []

        if (moveables !== {}) operations.push({
            name: '移动',
            action: () => dispatch({ type: 'scene/showMoveables' })
        })

        if (!attackables || !attackables.length) operations.push({
            name: '平A',
            action: () => dispatch({ type: 'scene/showAttackables' })
        })

        operations.push({
            name: '取消',
            action: () => dispatch({ type: 'menu/hide' })
        })

        dispatch({
            type: 'menu/show',
            payload: {
                operations,
                position
            }
        })

    }

    render = () => {
        const { character, paths, sideLength } = this.props
        console.log(character)

        const radius = metrics.MAP_NODE_RADIUS
        const { coordinate } = character
        const key = 'character' + coordinate.x + '|' + coordinate.y
        const { x, y } = getXYByCoorinate({
            ...coordinate,
            radius,
            distance: metrics.MAP_NODE_DISTANCE,
            sideLength
        })



        const nodeProps = {
            coordinateX: coordinate.x,
            coordinateY: coordinate.y,
            key, radius, x, y,
            color: '#ffffff20',
            ref: (node => this[key] = node),
            onClick: this.onClick
        }

        return (<Layer>
            {!paths.length ? <MarkNode {...nodeProps} /> : null}
        </Layer>)
    }
}

const mapStateToProps = (state, props) => {
    return {
        character: state.scene.get('character'),
        moveables: state.scene.get('moveables'),
        attackables: state.scene.get('attackables'),
        paths: state.scene.get('paths'),
        sideLength: state.scene.get('sideLength'),
        ...props
    }
}

export default connect(mapStateToProps)(CharacterLayer)
