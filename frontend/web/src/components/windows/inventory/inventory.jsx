import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import Gear from '../../label/gear/gear';
import Spendable from '../../label/spendable/spendable';


class Inventory extends Component {
	render = () => {
		const { dispatch, window } = this.props;

		return (<Window title='包裹' {...window} onClose={() => {
			dispatch({
				type: 'game/switchWindow',
				payload: {
					name: 'inventory'
				}
			})
		}}>
			<Spendable data={{ name: '面包', quantity: 5, quality: 'normal' }} />
			<Gear where='inventory' data={{ name: '光之剑', quality: 'legend',type:'剑',position:'双手',description:'Gorn Nova',damage:100,weight:1.5,effects:[{description:'可对灵体造成伤害'},{description:'可附着魔法，提高斩击威力'}] }} />
		</Window>)
	}
}

const mapStateToProps = (state, props) => {
	return {
		window: state.game.get('windows').toJSON().inventory,
		...props
	}
}

export default connect(mapStateToProps)(Inventory);