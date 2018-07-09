import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import GearField from './gearField';
import style from './gear.less';

class Gear extends Component {
	render = () => {

		const { window, wearings } = this.props;

		const gearFields = wearings.reduce((result, gear, key) => {
			if (key === 'fingers') {
				// return result;
			} else if (key === 'offHand' && !!wearings.get('firstHand') && wearings.getIn(['firstHand', 'types']).includes('twoHand')) {
				result.push(<GearField key={key} invalid className={style[key]} position={key} insert={wearings.get('firstHand')} />)
			} else {
				result.push(<GearField key={key} className={style[key]} position={key} insert={gear} />);
			}

			return result;
		}, [])

		return (
			<Window title='装备' id={3} position={{ x: 0, y: 210 }} window={window}
				nameToClose='gear'>
				<div className={style.list}>
					{gearFields}
				</div>
				
			</Window>)
	}
}


const mapStateToProps = (state, props) => {
	return {
		window: state.game.getIn(['windows', 'gear']),
		wearings: state.gear.get('wearings'),
		...props
	}
}

export default connect(mapStateToProps)(Gear);