import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import GearField from './gearField';
import style from './gear.less';

class GearWindow extends Component {
	render = () => {

		const { dispatch, window, gears } = this.props;

		const gearFields = Object.keys(gears).reduce((result, key) => {
			const gear = gears[key];
			if (key === 'fingers') {
				// return result;
			} else if (key === 'twoHand') {
				// return result;
			} else if (key === 'offHand' && !!gears.twoHand) {
				result.push(<GearField key={key} invalid style={style[key]} position={key} insert={gears.twoHand} />)
			} else if (key === 'firstHand' && !!gears.twoHand) {
				result.push(<GearField key={key} style={style[key]} position={key} insert={gears.twoHand} />)
			} else {
				result.push(<GearField key={key} style={style[key]} position={key} insert={gear} />);
			}


			return result;
		}, [])

		return (
			<Window title='装备' {...window}
				onClose={() => dispatch({
	                type: 'game/switchWindow',
					payload:{
						name:'gear'
					}
	            })
	        }>
				{gearFields}
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