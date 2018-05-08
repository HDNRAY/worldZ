import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';

class GearWindow extends Component {
	render = () => {
		console.log('gear render');
		const { dispatch, window } = this.props;

		return (<Window title='装备' {...window} onClose={() => {
            dispatch({
                type: 'game/switchWindow',
				payload:{
					name:'gear'
				}
            })
        }}>

        </Window>)
	}
}


const mapStateToProps = (state, props) => {
	return {
		window:state.game.windows.gear,
		...props
	}
}

export default connect(mapStateToProps)(GearWindow);