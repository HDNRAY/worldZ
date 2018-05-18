import { Component } from 'react';
import SceneWrapper from './wrapper'
import { Stage, Layer } from 'react-konva'
import Hexagon from './materials/hexagon/hexagon'


class Scene extends Component {

    renderMap = (sideLength, radius) => {

        const nodes = []

        const sqt3 = Math.sqrt(3)

        const distance = radius - 2

        //共几排
        const vertical = sideLength * 2 - 1

        for (let i = 0; i < vertical; i++) {
            //一排几个
            const horizontal = i < sideLength ? (sideLength + i) : (vertical - (i + 1 - sideLength))
            //这一排的y坐标
            const y = radius * (1 + (2 - sqt3) * (vertical - 1) / 2) + sqt3 * distance * i
            //这一排的起点
            const offsetX = radius * 2 * sideLength - horizontal * distance

            for (let j = 0; j < horizontal; j++) {
                const x = offsetX + 2 * distance * j
                nodes.push(<Hexagon id={'hex' + vertical + horizontal} radius={radius} key={x + y} x={x} y={y} />)
            }
        }

        return (<Layer>
            {nodes}
        </Layer>)
    }


    render = () => {
        const { sideLength = 7, radius = 30 } = this.props
        console.log(new Date().getTime())
        const mapLayer = this.renderMap(sideLength, radius);
        console.log(new Date().getTime())
        const width = 2 * (sideLength * 2 - 1) * radius
        const height = 2 * (sideLength * 2 - 1) * radius

        return (<SceneWrapper>
            <Stage container='#scene' listening={true} width={width} height={height}>
                {mapLayer}
            </Stage>

        </SceneWrapper>)
    }
}


export default Scene;