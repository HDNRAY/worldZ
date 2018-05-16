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
			return <Spendable key={item.get('name') + index} name={item.get('name')} quality={item.get('quality')} quantity={item.get('quantity')} />
		})

		const gears = gear.map((item, index) => {
			return <Gear key={item.get('name') + index} where='inventory' gear={item} />
		})

		return (<Window title='包裹' id={4} position={{x:320,y:0}} style={{ width: '400px', height: '160px' }} window={window} onClose={() => {
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
	const inventory = state.inventory;
	return {
		window: state.game.getIn(['windows', 'inventory']),
		spendable: state.inventory.get('spendable'),
		gear: inventory.get('gear'),
		...props
	}
}

export default connect(mapStateToProps)(Inventory);