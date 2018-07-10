import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import GearField from './gearField';
import style from './gear.less';

class Gear extends Component {
	getGearById = (id) => {
		return this.props.gears.find(gear => gear.get('id') === id)
	}
	render = () => {

		const { window, wearings } = this.props;

		const gearFields = wearings.reduce((result, gearId, key) => {
			const gear = this.getGearById(gearId)
			let gearField

			if (key === 'fingers') {
				// return result;
			} else if (key === 'offHand' && wearings.get('firstHand')) {
				// 渲染副手武器时，如果主手有，且主手事双手武器则副手也渲染双手武器
				const firstHandGear = this.getGearById(wearings.get('firstHand'))
				if (firstHandGear.get('types').includes('twoHand')) {
					gearField = (<GearField key={key} invalid className={style[key]} position={key} insert={firstHandGear} />)
				}
			}

			// 如果前面条件均不符合则直接渲染
			if (!gearField) gearField = (<GearField key={key} className={style[key]} position={key} insert={gear} />);

			result.push(gearField)

			return result;
		}, [])

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
		gears: state.inventory.get('items').filter(item => item.get('itemType') === 'gear'),
	}
}

export default connect(mapStateToProps)(Gear);