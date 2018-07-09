import { PureComponent } from 'react'
import { connect } from 'dva'
import { Layer } from 'react-konva'
import { metrics } from '../constant'
import { getXYByCoorinate } from '../util/util'
import MarkNode from '../materials/markNode'

class CharacterLayer extends PureComponent {

    onClick = ({ coordinate, position }) => {
        console.log('character clicked', coordinate)

        const { dispatch, moveables, attackables } = this.props;

        const operations = []

        if (moveables !== {}) operations.push({
            name: '移动',
            action: () => dispatch({ type: 'instance/showMoveables' })
        })

        if (!attackables || !attackables.length) operations.push({
            name: '平A',
            action: () => dispatch({ type: 'instance/showAttackables' })
        })

        operations.push({
            name: '取消',
            action: () => {
                dispatch({ type: 'instance/cancel' })
                dispatch({ type: 'menu/hide' })
            }
        })

        dispatch({
            type: 'menu/show',
            payload: {
                operations,
                position
            }
        })

    }

    renderEnemies = () => {
        const { enemies, sideLength } = this.props

        return enemies.map((enemy, index) => {
            const radius = metrics.MAP_NODE_RADIUS
            const { coordinate } = enemy
            const key = 'enemy' + coordinate.x + '|' + coordinate.y
            const { x, y } = getXYByCoorinate({
                ...coordinate,
                radius,
                distance: metrics.MAP_NODE_DISTANCE,
                sideLength
            })

            const nodeProps = {
                coordinate, key, radius, x, y,
                color: 'purple'
            }

            return <MarkNode {...nodeProps} />
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
            coordinate,
            key, radius, x, y,
            color: '#ffffff20',
            ref: (node => this[key] = node),
            onClick: this.onClick
        }

        return (<Layer>
            {!paths.length ? <MarkNode {...nodeProps} /> : null}
            {this.renderEnemies()}
        </Layer>)
    }
}

const mapStateToProps = (state, props) => {
    return {
        character: state.instance.get('character'),
        moveables: state.instance.get('moveables'),
        attackables: state.instance.get('attackables'),
        paths: state.instance.get('paths'),
        sideLength: state.instance.get('sideLength'),
        enemies: state.instance.get('enemies'),
        ...props
    }
}

export default connect(mapStateToProps)(CharacterLayer)
