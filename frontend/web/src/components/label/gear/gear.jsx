import { Component } from 'react';
import Proptypes from 'prop-types';
// import style from './gear.less';
import Item from '../../shared/item/item';
import itemStyle from '../../shared/item/item.less';
import GearTips from '../../tips/gear/gear';

class Gear extends Component {
	render() {
		const { data } = this.props;

		const name = data.name;

		const quality = Item.qualities[data.quality.toUpperCase()];

		const actions = [{
			name: '装备',
			action: () => {
				console.log('equiped')
			}
		}, {
			name: '丢弃',
			confirm: '确认丢弃吗',
			action: () => {
				console.log('deleted')
			}
		}]

		const tips = GearTips({
			...data,
			qualityStyle: itemStyle[quality.className],
		})


		return (
			<Item name={name}
            tips={tips}
            quality={quality}
            operations={actions}/>
		)
	}
}


Gear.propTypes = {
	data: Proptypes.object.isRequired
}


export default Gear;