import { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Draggable from 'react-draggable';
import { Icon } from 'antd';
import windowStyle from './window.less';
import {is} from 'immutable';

class Window extends Component {

	componentWillReceiveProps = (nextProps) => {
		const { show, dispatch, id } = this.props
		if (!show && !!nextProps.show) {
			dispatch({
				type: 'game/topWindow',
				payload: {
					id: id
				}
			})
		}
	}

	shouldComponentUpdate =(nextProps)=>{
		const { window, id, topWindowId } = this.props;

		if (!is(window,nextProps.window)) return true;

		if(topWindowId !== nextProps.topWindowId && (nextProps.topWindowId === id || topWindowId === id)) return true;

		return false;
	}

	render = () => {
		
		const { onClose, title, children, style, window, position, dispatch, id, topWindowId } = this.props;
		console.log('rendering window:',id);
		// console.log('window render title', title);
		// console.log('window render style', style);
		const titleBar = (<div id='titleBar' className={windowStyle.titleBar}>
			<div className={windowStyle.title}>
				{title}
			</div>
			{!!window.get('loading') ? <Icon type="loading-3-quarters" spin={true} /> : null}
			{!!onClose ? <Icon type='close' onClick={onClose} /> : null}
		</div>) 

		const draggableProps = {
			defaultPosition: {
				x: 10,
				y: 10,
				...position
			},
			bounds: 'parent',
			handle: '#titleBar'
		}

		const zIndex = id === topWindowId ? '99' : '9'

		const finalStyle = {
			height: '200px',
			width: '300px',
			...style,
			display: !!window.get('show') ? 'flex' : 'none',
			zIndex: zIndex
		}

		return (
			<Draggable {...draggableProps} onMouseDown={() => {
				if(id !== topWindowId){
					dispatch({
						type: 'game/topWindow',
						payload: {
							id: id
						}
					})
				}
				
			}}>
				<div style={finalStyle} className={windowStyle.window}>
					{titleBar}
					<div className={windowStyle.content}>
						{children}
					</div>
				</div>
			</Draggable>);
	}
}

Window.propTypes = {
	onClose: PropTypes.func,
	title: PropTypes.string,
	style: PropTypes.object,
	window: ImmutablePropTypes.map
}


const mapStateToProps = (state, props) => {

	return {
		topWindowId: state.game.get('topWindowId'),
		...props
	}
}

export default connect(mapStateToProps)(Window);