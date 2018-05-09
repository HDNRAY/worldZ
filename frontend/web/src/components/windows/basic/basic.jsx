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
		// const { dispatch } = this.props;

		return (<Window title='Basic' id={0} loading={false} show={true}>

            <Clickable text='角色' onClick={() => {
                this.switchWindow('character')
            }} />

			<Clickable text='包裹' onClick={() => {
				this.switchWindow('inventory')
            }} />

			<Clickable text='装备' onClick={() => {
				this.switchWindow('gear')
            }} />

			<Clickable text='地图' onClick={() => {
				this.switchWindow('map')
            }} />
        </Window>)
	}
}


const mapStateToProps = (state, props) => {
	return {
		...props
	}
}

export default connect(mapStateToProps)(Basic);