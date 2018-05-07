import React from 'react';
import { connect } from 'dva';
import Window from '../window/window';
import Clickable from '../../shared/clickable/clickable'


class Basic extends React.Component {
	render = () => {
		const { dispatch } = this.props;

		return (<Window title='Basic'>

            <Clickable text='包裹' onClick={() => {
                dispatch({
                    type: 'game/switchInventory',
                })
            }} />

            <Clickable text='61f' onClick={() => {
                dispatch({
                    type: 'character/showCharacter',
                    payload:{
                        id:1
                    }
                })
            }} />
        </Window>)
	}
}


const mapStateToProps = ({ state, props }) => {
	return {
		...props
	}
}

export default connect(mapStateToProps)(Basic);