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
			<Gear data={{ name: '光之剑', quality: 'legend' }} />
		</Window>)
	}
}

const mapStateToProps = (state, props) => {
	return {
		window: state.game.windows.inventory,
		...props
	}
}

export default connect(mapStateToProps)(Inventory);