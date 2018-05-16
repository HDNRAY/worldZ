import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import Attribute from '../../label/attribute/attribute';
import style from './character.less';
import { is,List } from 'immutable';

class Character extends Component {

	componentDidMount = () => {
		const { dispatch } = this.props;

		dispatch({
			type: 'character/fetch',
		})
	}

	shouldComponentUpdate = (nextProps) => {
		const { window, attributes } = this.props;
		return !is(window, nextProps.window) || is(attributes, nextProps.attributes);
	}


	render = () => {
		const { dispatch, attributes, window, name } = this.props;

		const attributesDisplay = List(attributes.get('basic')).map((item, index) => {
			console.log(item)
			return (<Attribute key={'attribute' + index} attribute={item[0]} value={item[1]} />)
		})

		console.log(attributesDisplay);

		return (
			<Window title={name} id={1} position={{x:90,y:90}} window={window}
				onClose={() =>
					dispatch({
						type: 'game/switchWindow',
						payload: {
							name: 'character'
						}
					})}>

				<div className={style.attributes}>
					{attributesDisplay}
				</div>)
			</Window>)
	}
}

const mapStateToProps = (state, props) => {

	return {
		window: state.game.getIn(['windows', 'character']),
		name: state.character.get('name'),
		id: state.character.get('id'),
		attributes: state.character.get('current'),
		...props
	}
}

export default connect(mapStateToProps)(Character);