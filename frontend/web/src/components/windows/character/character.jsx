import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import Attribute from '../../label/attribute/attribute';
import style from './character.less';
import { is } from 'immutable';

class Character extends Component {

	componentDidMount = () => {
		const { dispatch } = this.props;

		dispatch({
			type: 'character/fetch',
		})
	}

	shouldComponentUpdate = (nextProps) => {
		const { window, attributes } = this.props;
		return !is(window, nextProps.window) || !is(attributes, nextProps.attributes);
	}


	render = () => {
		const { dispatch, attributes, window, name } = this.props;

		const attributesDisplay = attributes.get('basic').reduce((result, value, attribute) => {
			result.push(<Attribute key={'attribute' + result.length} attribute={attribute} value={value} />)
			return result;
		}, [])

		return (
			<Window title={name} id={1} position={{ x: 90, y: 90 }} window={window}
				onClose={() =>
					dispatch({
						type: 'game/switchWindow',
						payload: {
							name: 'character'
						}
					})}>

				<div className={style.attributes}>
					{attributesDisplay}
				</div>
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