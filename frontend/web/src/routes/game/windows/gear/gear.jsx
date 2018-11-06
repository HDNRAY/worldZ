import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../../../../components/window/window';
import GearField from './gearField';
import style from './gear.less';
import { itemTypes } from '../../../../services/constant/item';
import { gearPositions } from '../../../../services/constant/gear';

class Gear extends Component {
    getGearById = (id) => {
        return this.props.gears.find(gear => gear.get('id') === id)
    }
    render = () => {

        const { window, wearings } = this.props;
        const gearFields = wearings.size > 0 ? wearings.reduce((result, wearing) => {
            const gearId = wearing.get('gear')
            const position = wearing.get('position')

            let gearField

            if (position === gearPositions.FINGERS.value) {
                // return result;
            }

            const gear = this.getGearById(gearId)
            gearField = (<GearField key={position} position={position} insert={gear} />);


            result.push(gearField)

            return result;
        }, []) : (<div>无</div>)

        return (
            <Window title='装备' id={3} position={{ x: 0, y: 210 }} window={window}
                nameToClose='gear'>
                <div className={style.list}>
                    {gearFields}
                </div>

            </Window>)
    }
}


const mapStateToProps = (state) => {
    return {
        window: state.game.getIn(['windows', 'gear']),
        wearings: state.gear.get('wearings'),
        gears: state.inventory.get('items').filter(item => item.get('itemType') === itemTypes.GEAR.value),
    }
}

export default connect(mapStateToProps)(Gear);