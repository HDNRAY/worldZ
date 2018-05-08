import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';


class Battle extends Component {
	render = () => {
		const { dispatch } = this.props;

		return (<Window title='包裹' windowId={1} onClose={() => {
            dispatch({
                type: 'game/hideBattle'
            })
        }}>

        </Window>)
	}
}

const mapStateToProps = (state, props) => {
	return {
		...props
	}
}

export default connect(mapStateToProps)(Battle);