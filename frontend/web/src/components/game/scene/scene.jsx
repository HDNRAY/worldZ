import { Component } from 'react'
import { connect } from 'dva'
import SceneWrapper from './wrapper'
import { Stage } from 'react-konva'
import { metrics } from './constant'
import MapLayer from './layers/mapLayer'
import CharacterLayer from './layers/characterLayer'
import MoveableLayer from './layers/moveableLayer'
import PathLayer from './layers/pathsLayer'


// const sqt3 = Math.sqrt(3)

class Scene extends Component {

    // getXYByCoorinate = ({ x, y }) => {
    //     const radius = metrics.MAP_NODE_RADIUS
    //     const distance = metrics.MAP_NODE_DISTANCE
    //     const { sideLength } = this.props

    //     return {
    //         x: 2 * x * distance + (1 - ((sideLength % 2) + (y % 2)) % 2) * distance + distance,
    //         y: radius * (1 + (2 - sqt3) * (sideLength * 2 - 1 - 1) / 2) + sqt3 * distance * y
    //     }
    // }

    // renderCharacter = () => {
    //     const { character, dispatch } = this.props
    //     const radius = metrics.MAP_NODE_RADIUS
    //     const { coordinate } = character
    //     const { x, y } = this.getXYByCoorinate(coordinate)

    //     const nodeProps = {
    //         coordinateX: coordinate.x,
    //         coordinateY: coordinate.y,
    //         key: 'character' + coordinate.x + '' + coordinate.y,
    //         radius, x, y,
    //         color: '#ffffff',
    //         onClick: ({ x, y }) => {
    //             console.log('character clicked', x, y)
    //             dispatch({
    //                 type: 'scene/showMoveables',
    //             })
    //         }
    //     }

    //     return (<MarkNode {...nodeProps} />)
    // }

    // renderPath = () => {
    //     const radius = metrics.MARK_NODE_RADIUS
    //     const { paths, dispatch } = this.props
    //     // console.log('moveables', moveables)
    //     if (paths.size === 0) return null
    //     const nodes = []

    //     paths.forEach((step) => {
    //         const { x, y } = this.getXYByCoorinate(step)

    //         const nodeProps = {
    //             coordinateX: step.x,
    //             coordinateY: step.y,
    //             key: 'step' + step.x + '' + step.y,
    //             radius, x, y,
    //             color: '#00ff00',
    //             onClick: ({ x, y }) => {
    //                 console.log('step clicked', x, y)
    //                 dispatch({
    //                     type: 'scene/move',
    //                     payload: {
    //                         x, y
    //                     }
    //                 })
    //             }
    //         }

    //         nodes.push(<MarkNode {...nodeProps} />)
    //     })
    //     // console.log(nodes)
    //     return nodes
    // }

    // renderMoveables = () => {
    //     const radius = metrics.MARK_NODE_RADIUS
    //     const { moveables, dispatch } = this.props
    //     // console.log('moveables', moveables)
    //     if (moveables.size === 0) return null
    //     const nodes = []

    //     Object.keys(moveables).forEach((moveableString) => {
    //         const moveable = JSON.parse(moveableString)
    //         const { x, y } = this.getXYByCoorinate(moveable)

    //         const nodeProps = {
    //             coordinateX: moveable.x,
    //             coordinateY: moveable.y,
    //             key: 'moveable' + moveable.x + '' + moveable.y,
    //             radius, x, y,
    //             color: '#00ff00',
    //             onHover: ({ x, y }) => {
    //                 console.log('moveable hovered', x, y)
    //                 dispatch({
    //                     type: 'scene/showPath',
    //                     payload: {
    //                         x, y
    //                     }
    //                 })
    //             }
    //         }

    //         nodes.push(<MarkNode {...nodeProps} />)
    //     })
    //     return nodes
    // }

    // renderMap = () => {
    //     const radius = metrics.MAP_NODE_RADIUS
    //     const distance = metrics.MAP_NODE_DISTANCE
    //     const { sideLength } = this.props
    //     const nodes = []

    //     //共几排
    //     const vertical = sideLength * 2 - 1

    //     //遍历排
    //     for (let i = 0; i < vertical; i++) {
    //         //一排几个
    //         const horizontal = i < sideLength ? (sideLength + i) : (vertical - (i + 1 - sideLength))
    //         //这一排的y坐标
    //         const y = radius * (1 + (2 - sqt3) * (vertical - 1) / 2) + sqt3 * distance * i
    //         //这一排的起点
    //         const offsetX = radius * 2 * sideLength - (horizontal + 1) * distance

    //         //遍历列
    //         for (let j = 0; j < horizontal; j++) {
    //             //这一个的x坐标
    //             const x = offsetX + 2 * distance * j

    //             //坐标系里的横坐标
    //             const coordinateX = j + Math.floor((vertical - horizontal) / 2)
    //             //坐标系里的纵坐标
    //             const coordinateY = i

    //             const nodeProps = {
    //                 coordinateX,
    //                 coordinateY,
    //                 key: 'map' + x + y,
    //                 radius, x, y,
    //             }
    //             nodes.push(<MapNode {...nodeProps} />)
    //         }
    //     }

    //     return nodes
    // }


    render = () => {
        console.log('rendering map')
        const { sideLength } = this.props
        const distance = metrics.MAP_NODE_DISTANCE
        // console.log(new Date().getTime())
        // const mapLayer = this.renderMap();
        // const characterLayer = this.renderCharacter()
        // const moveableLayer = this.renderMoveables()
        // const pathLayer = this.renderPath()
        // console.log(new Date().getTime())
        const width = 2 * (sideLength * 2 - 1) * distance
        const height = 2 * (sideLength * 2 - 1) * distance
        // console.log(mapLayer)
        return (<SceneWrapper>
            <Stage container='#scene' listening={true} width={width} height={height}>
                <MapLayer />
                <CharacterLayer />
                <MoveableLayer />
                <PathLayer />
            </Stage>

        </SceneWrapper>)
    }
}


const mapStateToProps = (state, props) => {
    return {
        sideLength: state.scene.get('sideLength'),
        paths: state.scene.get('paths'),
        character: state.scene.get('character'),
        moveables: state.scene.get('moveables'),
        ...props
    }
}

export default connect(mapStateToProps)(Scene);