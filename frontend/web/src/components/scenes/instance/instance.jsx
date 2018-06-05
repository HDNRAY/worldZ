import { Component } from 'react'
import { connect } from 'dva'
import { Stage } from 'react-konva'
import { metrics } from './constant'
import MapLayer from './layers/mapLayer'
import CharacterLayer from './layers/characterLayer'
import ReachableLayer from './layers/reachableLayer'

class Instance extends Component {

    render = () => {
        console.log('rendering map')
        const { sideLength } = this.props
        const distance = metrics.MAP_NODE_DISTANCE
        const width = 2 * (sideLength * 2 - 1) * distance
        const height = 2 * (sideLength * 2 - 1) * distance

        return (<Stage container='#scene' listening={true} width={width} height={height}>
                <MapLayer />
                <CharacterLayer />
                <ReachableLayer />
            </Stage>)
    }
}


const mapStateToProps = (state, props) => {
    return {
        sideLength: state.instance.get('sideLength'),
        ...props
    }
}

export default connect(mapStateToProps)(Instance);