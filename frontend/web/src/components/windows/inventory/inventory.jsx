import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import Gear from '../../label/gear/gear';
import Spendable from '../../label/spendable/spendable';
import style from './inventory.less';


class Inventory extends Component {
	render = () => {
		const { dispatch, window, spendable, gear } = this.props;

		const spendables = spendable.map((item, index) => {
			return <Spendable key={item.name + index} data={item}/>
		})

		const gears = gear.map((item, index) => {
			return <Gear key={item.name + index} where='inventory' gear={item}/>
		})

		return (<Window title='包裹' {...window} onClose={() => {
			dispatch({
				type: 'game/switchWindow',
				payload: {
					name: 'inventory'
				}
			})
		}}>
			<div className={style.list}>
				{spendables}
				{gears}
			</div>
			</Window>)
	}
}

const mapStateToProps = (state, props) => {
	const inventory = state.inventory.toJS();
	return {
		window: state.game.get('windows').toJS().inventory,
		spendable: inventory.spendable,
		gear: inventory.gear,
		...props
	}
}

export default connect(mapStateToProps)(Inventory);