import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import Gear from '../../label/gear/gear';
import Spendable from '../../label/spendable/spendable';
import style from './inventory.less';


class Inventory extends Component {
	render = () => {
		const { window, items, wearings } = this.props

		// 已装备的装备不显示
		const itemsNotWearing = items.filter(item => !wearings.includes(item.get('id')))
		
		// 渲染物品
		const displayItems = itemsNotWearing.map((item, index) => {
			
			if (item.get('itemType') === 'gear') {
				return <Gear key={item.get('name') + index} where='inventory' gear={item} />
			} else if (item.get('itemType') === 'spendable') {
				return <Spendable key={item.get('name') + index} spendable={item} />
			}
			return null
		})

		return (<Window title='包裹' id={4} position={{ x: 320, y: 0 }} window={window} nameToClose='inventory'>
			<div className={style.list}>
				{displayItems}
			</div>
		</Window>)
	}
}

const mapStateToProps = (state) => {
	return {
		window: state.game.getIn(['windows', 'inventory']),
		items: state.inventory.get('items'),
		wearings: state.gear.get('wearings')
	}
}

export default connect(mapStateToProps)(Inventory);