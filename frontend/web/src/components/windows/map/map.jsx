import React from 'react';
import { connect } from 'dva';
import Window from '../window/window';
import Character from '../../label/character/character';
import {Breadcrumb} from 'antd';


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

				<Breadcrumb>
					<Breadcrumb.Item>世界</Breadcrumb.Item>
					<Breadcrumb.Item>中原</Breadcrumb.Item>
					<Breadcrumb.Item>荆州</Breadcrumb.Item>
					<Breadcrumb.Item>汉口</Breadcrumb.Item>
					<Breadcrumb.Item>牛家村</Breadcrumb.Item>
				</Breadcrumb>
				
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