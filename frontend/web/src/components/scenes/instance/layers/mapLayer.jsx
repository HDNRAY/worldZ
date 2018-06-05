import { PureComponent } from 'react'
import { connect } from 'dva'
import { Layer } from 'react-konva'
import { metrics } from '../constant'
import MapNode from '../materials/mapNode'

class MapLayer extends PureComponent {

    render = () => {
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
            const y = radius * (1 + (2 - metrics.sqrt3) * (vertical - 1) / 2) + metrics.sqrt3 * distance * i
            //这一排的起点
            //（总个数 - 这一排个数）* 直径 / 2
            const offsetX = distance * 2 * (2 * sideLength - 1 - horizontal) / 2

            //遍历列
            for (let j = 0; j < horizontal; j++) {
                //这一个的x坐标
                const x = offsetX + 2 * distance * j + distance

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

        return (
            <Layer>
                {nodes}
            </Layer>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        sideLength: state.instance.get('sideLength'),
        ...props
    }
}

export default connect(mapStateToProps)(MapLayer)
