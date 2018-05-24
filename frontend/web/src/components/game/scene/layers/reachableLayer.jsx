import { PureComponent } from 'react'
import { connect } from 'dva'
import { Layer } from 'react-konva'
import { metrics } from '../constant'
import { getXYByCoorinate } from '../util/util'
import MarkNode from '../materials/markNode'


class ReachableLayer extends PureComponent {

    onMoveableHover = ({ x, y }) => {
        console.log('moveable hovered', x, y)
        this.props.dispatch({
            type: 'scene/showPath',
            payload: {
                x, y
            }
        })
    }

    onMoveableClick = ({ x, y }) => {
        console.log('moveable clicked', x, y)
        this.props.dispatch({
            type: 'scene/move',
            payload: {
                x, y
            }
        })
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

            const color = '#00ff00' + (paths.some(path => JSON.stringify(path) === moveableString) ? '80' : '20')

            const nodeProps = {
                coordinateX: moveable.x,
                coordinateY: moveable.y,
                key: 'moveable' + moveable.x + '' + moveable.y,
                radius, x, y, color,
                onHover: this.onMoveableHover,
                onClick: this.onMoveableClick
            }

            result.push(<MarkNode {...nodeProps} />)

            return result
        }, [])
    }

    renderAttackalbles = () =>{
        const radius = metrics.MARK_NODE_RADIUS
        const { attackables, sideLength, paths } = this.props
        // console.log('moveables', moveables)
        if (attackables.size === 0) return null

        return Object.keys(moveables).reduce((result, moveableString) => {

            const moveable = JSON.parse(moveableString)
            const { x, y } = getXYByCoorinate({
                ...moveable,
                radius,
                distance: metrics.MAP_NODE_DISTANCE,
                sideLength
            })

            const color = '#ff0000' + (paths.some(path => JSON.stringify(path) === moveableString) ? '80' : '20')

            const nodeProps = {
                coordinateX: moveable.x,
                coordinateY: moveable.y,
                key: 'moveable' + moveable.x + '' + moveable.y,
                radius, x, y, color,
                onHover: this.onHover,
                onClick: this.onClick
            }

            result.push(<MarkNode {...nodeProps} />)

            return result
        }, [])
    }

    renderEffectables = ()=>{

    }

    render = () => {
        const moveableNodes = this.renderMoveables()
        //const attackableNodes = this.renderAttackalbles()
        //const effectableNodes = this.renderEffectables()


        return (
            <Layer>
                {moveableNodes}
                {/* {attackableNodes}
                {effectableNodes} */}
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

export default connect(mapStateToProps)(ReachableLayer)
