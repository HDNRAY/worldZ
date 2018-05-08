import React from 'react';
import { connect } from 'dva';
import Window from '../window/window';
import Character from '../../label/character/character';


class MapWindow extends React.Component {
	render = () => {
		const { dispatch, show } = this.props;

		return (
			<Window title='地图'
                show={show}
				windowId={4}
                isLoading={false}
                position={{x:100,y:50}}
                style={{width:'800px',height:'500px'}}
                onClose={() => dispatch({
					type: 'game/switchWindow',
                    payload:{
                        name:'map'
                    }
				})}>

    			<Character data={{name:'杨过'}}/>

            </Window>)
	}
}


const mapStateToProps = ({ state, props }) => {
	return {
		...props
	}
}

export default connect(mapStateToProps)(MapWindow);