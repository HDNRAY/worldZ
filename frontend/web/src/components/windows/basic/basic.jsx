import React from 'react';
import { connect } from 'dva';
import Window from '../window/window';
import Clickable from '../../shared/clickable/clickable';


class Basic extends React.Component {
	render = () => {
		const { dispatch } = this.props;

		return (<Window title='Basic' isLoading={true} show={true}>

            <Clickable text='包裹' onClick={() => {
                dispatch({
                    type: 'game/switchWindow',
					payload:{
						name:'inventory'
					}
                })
            }} />


            <Clickable text='角色' onClick={() => {
                dispatch({
					type: 'game/switchWindow',
					payload:{
						name:'character'
					}
                })
            }} />

			<Clickable text='地图' onClick={() => {
                dispatch({
					type: 'game/switchWindow',
					payload:{
						name:'map'
					}
                })
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