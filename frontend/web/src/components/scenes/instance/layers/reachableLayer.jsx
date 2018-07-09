import { PureComponent } from 'react'
import { connect } from 'dva'
import { Layer } from 'react-konva'
import { metrics } from '../constant'
import { getXYByCoorinate } from '../util/util'
import { logTypes } from '../../../game/information/constant'
import MarkNode from '../materials/markNode'


class ReachableLayer extends PureComponent {

    onMoveableHover = ({ coordinate, position }) => {
        // console.log('moveable hovered', coordinate)
        this.props.dispatch({
            type: 'instance/showPath',
            payload: { coordinate }
        })
    }

    onMoveableClick = ({ coordinate, position }) => {
        console.log('moveable clicked', coordinate, position)
        this.props.dispatch({
            type: 'instance/move',
            payload: { coordinate }
        })
        // this.props.dispatch({
        //     type: 'menu/show',
        //     payload: {
        //         position
        //     }
        // })
    }

    renderMoveables = () => {
        const radius = metrics.MARK_NODE_RADIUS
        const { moveables, sideLength, paths } = this.props

        if (moveables.size === 0) return null

        return Object.keys(moveables).reduce((result, moveableString) => {

            const moveable = JSON.parse(moveableString)
            const { x, y } = getXYByCoorinate({
                ...moveable,
                radius,
                distance: metrics.MAP_NODE_DISTANCE,
                sideLength
            })
            // console.log('render moveable moeablestring', moveableString)
            // console.log('render moveable path', paths)
            const color = '#00ff00' + (paths.some(path => JSON.stringify(path) === moveableString) ? '80' : '20')

            const nodeProps = {
                coordinate: moveable,
                key: 'moveable' + moveable.x + '' + moveable.y,
                radius, x, y, color,
                onHover: this.onMoveableHover,
                onClick: this.onMoveableClick
            }

            result.push(<MarkNode {...nodeProps} />)

            return result
        }, [])
    }

    onAttackableHover = ({ coordinate, position }) => {
        // console.log('on attackable hover', coordinate)
        this.props.dispatch({
            type: 'instance/showEffectables',
            payload: { coordinate }

        })
    }

    onEffectableClick = ({ coordinate, position }) => {
        const { dispatch, enemies, effectables } = this.props
        const enemyCoordinateStringArray = enemies.map(enemy => JSON.stringify(enemy.coordinate))
        const tempSet = new Set([...enemyCoordinateStringArray, ...effectables])
        if (tempSet.size < enemyCoordinateStringArray.length + effectables.length) {
            // if (enemies.some(enemy => JSON.stringify(enemy.coordinate) === JSON.stringify(coordinate))) {
            dispatch({
                type: 'information/add',
                payload: {
                    content: '攻击成功',
                    type: logTypes.BENEFIT
                }
            })
            dispatch({
                type: 'menu/hide'
            })
            dispatch({
                type: 'instance/cancel'
            })
        } else {
            dispatch({
                type: 'information/add',
                payload: {
                    content: '必须指定一名敌人',
                    type: logTypes.ALERT
                }
            })
        }
    }

    renderAttackalbles = () => {
        const radius = metrics.MARK_NODE_RADIUS
        const { attackables, sideLength, effectables } = this.props
        // console.log('moveables', moveables)
        if (attackables.size === 0) return null

        return attackables.reduce((result, positionString) => {

            const onHover = effectables.includes(positionString) ? null : this.onAttackableHover

            const attackable = JSON.parse(positionString)
            const { x, y } = getXYByCoorinate({
                ...attackable,
                radius,
                distance: metrics.MAP_NODE_DISTANCE,
                sideLength
            })

            const color = '#ff000020'

            const nodeProps = {
                coordinate: attackable,
                key: 'attackable' + attackable.x + '' + attackable.y,
                radius, x, y, color, onHover,
                onClick: null
            }

            result.push(<MarkNode {...nodeProps} />)

            return result
        }, [])
    }

    onEffectableHover = ({ coordinate, position }) => {
        const { attackables } = this.props
        // console.log('onEffectablesHover', attackables)
        let newCoordinate = null
        if (attackables.some(attackable => attackable === JSON.stringify(coordinate))) {
            newCoordinate = coordinate
        }
        this.props.dispatch({
            type: 'instance/showEffectables',
            payload: {
                coordinate: newCoordinate
            }
        })
    }

    renderEffectables = () => {
        const radius = metrics.MARK_NODE_RADIUS
        const { sideLength, effectables } = this.props
        // console.log('moveables', moveables)
        if (effectables.size === 0) return null

        return effectables.map((positionString) => {

            const effectable = JSON.parse(positionString)
            const { x, y } = getXYByCoorinate({
                ...effectable,
                radius,
                distance: metrics.MAP_NODE_DISTANCE,
                sideLength
            })

            const color = '#ff000080'

            const nodeProps = {
                coordinate: effectable,
                key: 'effectable' + effectable.x + '' + effectable.y,
                radius, x, y, color,
                onHover: this.onEffectableHover,
                onClick: this.onEffectableClick
            }

            return (<MarkNode {...nodeProps} />)
        })
    }

    render = () => {
        const moveableNodes = this.renderMoveables()
        const attackableNodes = this.renderAttackalbles()
        const effectableNodes = this.renderEffectables()


        return (
            <Layer>
                {moveableNodes}
                {attackableNodes}
                {effectableNodes}
            </Layer>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        moveables: state.instance.get('moveables'),
        attackables: state.instance.get('attackables'),
        effectables: state.instance.get('effectables'),
        enemies: state.instance.get('enemies'),
        sideLength: state.instance.get('sideLength'),
        paths: state.instance.get('paths'),
        ...props
    }
}

export default connect(mapStateToProps)(ReachableLayer)
