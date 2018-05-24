import { PureComponent } from 'react'
import { connect } from 'dva'
import { Layer } from 'react-konva'
import { metrics } from '../constant'
import { getXYByCoorinate } from '../util/util'
import MarkNode from '../../scene/materials/markNode'

class CharacterLayer extends PureComponent {

    onClick = ({ x, y }) => {
        console.log('character clicked', x, y)
        this.props.dispatch({
            type: 'scene/showMoveables',
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
        paths: state.scene.get('paths'),
        sideLength: state.scene.get('sideLength'),
        ...props
    }
}

export default connect(mapStateToProps)(CharacterLayer)
