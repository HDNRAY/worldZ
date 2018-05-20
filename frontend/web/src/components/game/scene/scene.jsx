import { Component } from 'react'
import { connect } from 'dva'
import SceneWrapper from './wrapper'
import { Stage, Layer } from 'react-konva'
import MapNode from './materials/mapNode'
import MarkNode from './materials/markNode'
import { metrics } from './constant'

const sqt3 = Math.sqrt(3)

class Scene extends Component {

    getXYByCoorinate = (coordinateX, coordinateY) => {
        const radius = metrics.MAP_NODE_RADIUS
        const distance = metrics.MAP_NODE_DISTANCE
        const { sideLength } = this.props
        console.log(coordinateX,coordinateY)
        const x = 2 * coordinateX * distance + (1 - ((sideLength % 2) + (coordinateY % 2)) % 2) * distance + distance  
        const y = radius * (1 + (2 - sqt3) * (sideLength * 2 - 1 - 1) / 2) + sqt3 * distance * coordinateY
        return { x, y }
    }

    renderReachable = () => {
        const radius = metrics.MARK_NODE_RADIUS
        const { reacables, dispatch } = this.props

        console.log(reacables)
        const nodes = reacables.map((reachable) => {
            const coordinateX = reachable.get('x')
            const coordinateY = reachable.get('y')
            const { x, y } = this.getXYByCoorinate(coordinateX, coordinateY)

            const nodeProps = {
                coordinateX,
                coordinateY,
                key: coordinateX + '' + coordinateY,
                radius, x, y,
                color: '#ff0000',

            }

            return (<MarkNode {...nodeProps} />)
        })

        return (<Layer>
            {nodes}
        </Layer>)
    }

    renderMap = () => {
        const radius = metrics.MAP_NODE_RADIUS
        const distance = metrics.MAP_NODE_DISTANCE
        const { sideLength, dispatch } = this.props
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
                    key: x + y,
                    radius, x, y,
                    onClick: ({ coordinateX, coordinateY }) => {
                        console.log(coordinateX, coordinateY)
                        dispatch({
                            type: 'scene/clickOnMap',
                            payload: {
                                x: coordinateX,
                                y: coordinateY
                            }
                        })
                    }
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
        const { sideLength, distance } = this.props
        // console.log(new Date().getTime())
        const mapLayer = this.renderMap();
        const reacableLayer = this.renderReachable();
        // console.log(new Date().getTime())
        const width = 2 * (sideLength * 2 - 1) * distance
        const height = 2 * (sideLength * 2 - 1) * distance

        return (<SceneWrapper>
            <Stage container='#scene' listening={true} width={width} height={height}>
                {mapLayer}
                {reacableLayer}
            </Stage>

        </SceneWrapper>)
    }
}

Scene.defaultProps = {
    radius: 30,
    distance: 28,
    sideLength: 7
}

const mapStateToProps = (state, props) => {
    return {
        reacables: state.scene.get('reachables'),
        ...props
    }
}

export default connect(mapStateToProps)(Scene);