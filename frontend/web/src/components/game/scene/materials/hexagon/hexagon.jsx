import { Component } from 'react';
import { RegularPolygon } from 'react-konva'

class Hexagon extends Component {

    onMouseEnter = (e) => {
        console.log('mouse enter', e)
    }

    onClick = (e) => {
        console.log('click', e)
    }

    render() {
        const {id,x,y,radius} = this.props

        const stroke = '#666666'

        let fill = 'transparent'

        if(id.indexOf('11') > -1){
            fill = '#ff000020'
        }

        return (<RegularPolygon
            id={id}
            onMouseEnter={this.onMouseEnter}
            onClick={this.onClick}
            sides={6}
            radius={radius}
            fill={fill}
            stroke={stroke}
            strokeWidth={1}
            x={x}
            y={y}
        />)
    }
}


export default Hexagon