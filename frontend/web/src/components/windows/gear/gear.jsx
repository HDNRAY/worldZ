import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import GearField from './gearField';
import style from './gear.less';

class Gear extends Component {
	render = () => {

		const { dispatch, window, wearings } = this.props;

		const gearFields = Object.keys(wearings).reduce((result, key) => {
			const gear = wearings.get(key);
			if (key === 'fingers') {
				// return result;
			} else if (key === 'offHand' && !!wearings.get('firstHand') && wearings.getIn(['firstHand','types']).includes('twoHand')) {
				result.push(<GearField key={key} invalid style={style[key]} position={key} insert={wearings.get('firstHand')} />)
			}  else {
				result.push(<GearField key={key} style={style[key]} position={key} insert={gear} />);
			}

			return result;
		}, [])

		return (
			<Window title='装备' id={3} position={{x:0,y:210}} style={{width:'200px',height:'320px'}} window={window}
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
		window: state.game.getIn(['windows','gear']),
		wearings: state.inventory.get('wearings'),
		...props
	}
}

export default connect(mapStateToProps)(Gear);