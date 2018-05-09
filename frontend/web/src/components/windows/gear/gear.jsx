import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';

class GearWindow extends Component {
	render = () => {

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
		window: state.game.get('windows').toJSON().gear,
		...props
	}
}

export default connect(mapStateToProps)(GearWindow);