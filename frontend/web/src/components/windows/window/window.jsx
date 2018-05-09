import { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { Icon } from 'antd';
import windowStyle from './window.less';


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

	render = () => {
		const { onClose, title, children, style, loading, show, position, dispatch, id, topWindowId } = this.props;
		console.log('window render title', title);
		console.log('window render show', show);
		const titleBar = (<div id='titleBar' className={windowStyle.titleBar}>
			<div className={windowStyle.title}>
				{title}
			</div>
			{!!loading ? <Icon type="loading-3-quarters" spin={true} /> : null}
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
			display: !!show ? 'inherit' : 'none',
			zIndex: zIndex
		}

		return (
			<Draggable {...draggableProps} onMouseDown={() => {
				dispatch({
					type: 'game/topWindow',
					payload: {
						id: id
					}
				})
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
	window: PropTypes.object
}


const mapStateToProps = (state, props) => {

	return {
		topWindowId: state.game.get('topWindowId'),
		...props
	}
}

export default connect(mapStateToProps)(Window);