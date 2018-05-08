import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import Attribute from '../../label/attribute/attribute';
import style from './character.less';

class Character extends Component {

	componentDidMount = () => {
		const { dispatch } = this.props;

		dispatch({
			type: 'character/getMyCharacter',
		})
	}

	render = () => {
		const { dispatch, data, window } = this.props;

		const attributes = !!data.attributes ? (
			<div className={style.attributes}>
				{Object.keys(data.attributes).map((item, index) => {
					return (<Attribute key={'item' + index} name={item} value={data.attributes[item]} detail={item} />)
				})}
			</div>

		) : null

		return (
			<Window title={data.name} {...window}
				onClose={() =>
					dispatch({
						type: 'game/switchWindow',
						payload: {
							name: 'character'
						}
					})}>
				{attributes}

			</Window>)
	}
}

const mapStateToProps = (state, props) => {

	return {
		window: state.game.windows.character,
		data: state.character.myCharacter.data,
		...props
	}
}

export default connect(mapStateToProps)(Character);