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
				<GearField name='主手' insert={firstHand} />
	        </Window>)
	}
}


const mapStateToProps = (state, props) => {
	return {
		window: state.game.get('windows').toJSON().gear,
		gears: state.gear.gears,
		...props
	}
}

export default connect(mapStateToProps)(GearWindow);