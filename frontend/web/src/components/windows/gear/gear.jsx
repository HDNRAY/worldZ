import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import GearField from './gearField';

class GearWindow extends Component {
	render = () => {

		const { dispatch, window, gears } = this.props;

		const { firstHand } = gears;

		return (
			<Window title='装备' {...window}
				onClose={() => dispatch({
	                type: 'game/switchWindow',
					payload:{
						name:'gear'
					}
	            })
	        }>
				<GearField position='head' insert={null} />
				<GearField position='firstHand' insert={firstHand} />
	        </Window>)
	}
}


const mapStateToProps = (state, props) => {
	return {
		window: state.game.get('windows').toJS().gear,
		gears: state.gear.get('gears').toJS(),
		...props
	}
}

export default connect(mapStateToProps)(GearWindow);