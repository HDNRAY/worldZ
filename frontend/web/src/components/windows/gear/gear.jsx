import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import GearField from './gearField';
import style from './gear.less';

class GearWindow extends Component {
	render = () => {

		const { dispatch, window, wearings } = this.props;

		const gearFields = Object.keys(wearings).reduce((result, key) => {
			const gear = wearings[key];
			if (key === 'fingers') {
				// return result;
			} else if (key === 'offHand' && !!wearings.firstHand && wearings.firstHand.types.includes('twoHand')) {
				result.push(<GearField key={key} invalid style={style[key]} position={key} insert={wearings.firstHand} />)
			}  else {
				result.push(<GearField key={key} style={style[key]} position={key} insert={gear} />);
			}

			return result;
		}, [])

		return (
			<Window title='装备' style={{width:'200px',height:'320px'}} {...window}
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
		wearings: state.inventory.get('wearings').toJS(),
		...props
	}
}

export default connect(mapStateToProps)(GearWindow);