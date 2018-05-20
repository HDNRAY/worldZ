import { Component } from 'react'
import { connect } from 'dva'
import SceneWrapper from './wrapper'
import { Stage, Layer } from 'react-konva'
import MapNode from './materials/mapNode'
import MarkNode from './materials/markNode'
import { metrics } from './constant'

const sqt3 = Math.sqrt(3)

class Scene extends Component {

    getXYByCoorinate = ({ x, y }) => {
        const radius = metrics.MAP_NODE_RADIUS
        const distance = metrics.MAP_NODE_DISTANCE
        const { sideLength } = this.props

        return {
            x: 2 * x * distance + (1 - ((sideLength % 2) + (y % 2)) % 2) * distance + distance,
            y: radius * (1 + (2 - sqt3) * (sideLength * 2 - 1 - 1) / 2) + sqt3 * distance * y
        }
    }

    renderCharacter = () => {
        const { character, dispatch } = this.props
        const radius = metrics.MAP_NODE_RADIUS
        const { coordinate } = character
        const { x, y } = this.getXYByCoorinate(coordinate)

        const nodeProps = {
            coordinateX: coordinate.x,
            coordinateY: coordinate.y,
            key: 'character' + coordinate.x + '' + coordinate.y,
            radius, x, y,
            color: '#ffffff',
            // onClick: ({ coordinateX, coordinateY }) => {
            //     console.log('character clicked', coordinateX, coordinateY)
            //     dispatch({
            //         type: 'scene/showMoveables',
            //     })
            // }
        }

        return (<Layer>
            <MarkNode {...nodeProps} />
        </Layer>)
    }

    renderMoveables = () => {
        const radius = metrics.MARK_NODE_RADIUS
        const { moveables } = this.props
        // console.log('moveables', moveables)
        if (moveables.size === 0) return null
        const nodes = []

        moveables.forEach((moveable) => {
            const { x, y } = this.getXYByCoorinate(moveable)

            const nodeProps = {
                coordinateX: moveable.x,
                coordinateY: moveable.y,
                key: 'moveable' + moveable.x + '' + moveable.y,
                radius, x, y,
                color: '#00ff00'
            }

            nodes.push(<MarkNode {...nodeProps} />)
        })
        console.log(nodes)
        return (<Layer>
            {nodes}
        </Layer>)
    }

    renderMap = () => {
        const radius = metrics.MAP_NODE_RADIUS
        const distance = metrics.MAP_NODE_DISTANCE
        const { sideLength } = this.props
        const nodes = []

        //共几排
        const vertical = sideLength * 2 - 1

        //遍历排
        for (let i = 0; i < vertical; i++) {
            //一排几个
            const horizontal = i < sideLength ? (sideLength + i) : (vertical - (i + 1 - sideLength))
            //这一排的y坐标
            const y = radius * (1 + (2 - sqt3) * (vertical - 1) / 2) + sqt3 * distance * i
            //这一排的起点
            const offsetX = radius * 2 * sideLength - (horizontal + 1) * distance

            //遍历列
            for (let j = 0; j < horizontal; j++) {
                //这一个的x坐标
                const x = offsetX + 2 * distance * j

                //坐标系里的横坐标
                const coordinateX = j + Math.floor((vertical - horizontal) / 2)
                //坐标系里的纵坐标
                const coordinateY = i

                const nodeProps = {
                    coordinateX,
                    coordinateY,
                    key: 'map' + x + y,
                    radius, x, y,
                }
                nodes.push(<MapNode {...nodeProps} />)
            }
        }

        return (<Layer>
            {nodes}
        </Layer>)
    }


    render = () => {
        console.log('rendering map')
        const { sideLength } = this.props
        const distance = metrics.MAP_NODE_DISTANCE
        // console.log(new Date().getTime())
        const mapLayer = this.renderMap();
        const characterLayer = this.renderCharacter()
        const moveableLayer = this.renderMoveables()
        // console.log(new Date().getTime())
        const width = 2 * (sideLength * 2 - 1) * distance
        const height = 2 * (sideLength * 2 - 1) * distance
        // console.log(mapLayer)
        return (<SceneWrapper>
            <Stage container='#scene' listening={true} width={width} height={height}>
                {mapLayer}
                {characterLayer}
                {moveableLayer}
            </Stage>

        </SceneWrapper>)
    }
}

Scene.defaultProps = {
    sideLength: 7
}

const mapStateToProps = (state, props) => {
    return {
        character: state.scene.get('character'),
        moveables: state.scene.get('moveables'),
        ...props
    }
}

export default connect(mapStateToProps)(Scene);