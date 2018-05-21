
import { metrics } from '../constant'
/**
 * 
 * @param {x,y,radius,distance,sideLength} 
 */
export const getXYByCoorinate = ({ x, y, radius, distance, sideLength }) => {

    return {
        x: 2 * x * distance + (1 - ((sideLength % 2) + (y % 2)) % 2) * distance + distance,
        y: radius * (1 + (2 - metrics.sqrt3) * (sideLength * 2 - 1 - 1) / 2) + metrics.sqrt3 * distance * y
    }
}