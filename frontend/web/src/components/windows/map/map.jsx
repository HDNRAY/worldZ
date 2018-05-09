import React from 'react';
import { connect } from 'dva';
import Window from '../window/window';
import Character from '../../label/character/character';


class MapWindow extends React.Component {
	render = () => {
		const { dispatch, window } = this.props;

		return (
			<Window title='地图'
				{...window}
				style={{ width: '600px', height: '400px' }}
				onClose={() => dispatch({
					type: 'game/switchWindow',
					payload: {
						name: 'map'
					}
				})}>

				<Character data={{ name: '杨过' }} />

			</Window>)
	}
}


const mapStateToProps = (state, props) => {
	return {
		window: state.game.get('windows').toJSON().map,
		...props
	}
}

export default connect(mapStateToProps)(MapWindow);