import React from 'react';
import { connect } from 'dva';
import Window from '../window/window';
import Clickable from '../../shared/clickable/clickable';


class Basic extends React.Component {
	
	switchWindow = (name) => {
		this.props.dispatch({
			type: 'game/switchWindow',
			payload: { name }
		})
	}

	render = () => {
		const { window } = this.props;

		return (<Window title='Basic' id={0} position={{ x: 0, y: 0 }} window={window}>

			<Clickable text='角色' onClick={() => {
				this.switchWindow('character')
			}} />

			<Clickable text='包裹' onClick={() => {
				this.switchWindow('inventory')
			}} />

			<Clickable text='装备' onClick={() => {
				this.switchWindow('gear')
			}} />

			<Clickable text='能力' onClick={() => {
				this.switchWindow('ability')
			}} />

			<Clickable text='副本' onClick={() => {
				this.props.dispatch({
					type:'scene/showInstance'
				})
			}} />
		</Window>)
	}
}


const mapStateToProps = (state, props) => {
	return {
		window: state.game.getIn(['windows', 'basic']),
		...props
	}
}

export default connect(mapStateToProps)(Basic);