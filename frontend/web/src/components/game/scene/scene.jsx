import { Component } from 'react'
import { connect } from 'dva'
import SceneWrapper from './wrapper'
import { Stage } from 'react-konva'
import { metrics } from './constant'
import MapLayer from './layers/mapLayer'
import CharacterLayer from './layers/characterLayer'
import MoveableLayer from './layers/moveableLayer'
// import PathLayer from './layers/pathsLayer'

class Scene extends Component {

    render = () => {
        console.log('rendering map')
        const { sideLength } = this.props
        const distance = metrics.MAP_NODE_DISTANCE
        const width = 2 * (sideLength * 2 - 1) * distance
        const height = 2 * (sideLength * 2 - 1) * distance
        // console.log(mapLayer)
        return (<SceneWrapper>
            <Stage container='#scene' listening={true} width={width} height={height}>
                <MapLayer />
                <CharacterLayer />
                <MoveableLayer />
            </Stage>
        </SceneWrapper>)
    }
}


const mapStateToProps = (state, props) => {
    return {
        sideLength: state.scene.get('sideLength'),
        ...props
    }
}

export default connect(mapStateToProps)(Scene);