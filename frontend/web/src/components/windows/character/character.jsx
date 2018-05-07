import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import Attribute from '../../label/attribute/attribute';

class Character extends Component {

	componentDidMount = () => {
		const { dispatch, characterId } = this.props;

		dispatch({
			type: 'character/get',
			payload: {
				id: characterId
			}
		})
	}

	render = () => {
		const { dispatch, characterId, isLoading, data } = this.props;

		return (
			<Window title='角色' isLoading={isLoading} onClose={() => {
                dispatch({
                    type: 'character/hideCharacter',
                    payload:{
                        id:characterId
                    }
                })
            }}>
					{data.name}
					<Attribute name='生命' value={data.health} detail='到0就死'/>

            </Window>)
	}
}

Character.propTypes = {
	characterId: PropTypes.number.isRequired
}

const mapStateToProps = (state, props) => {

	const index = state.character.shownCharacters.findIndex((item, index) => {
		return item.data.id === props.characterId;
	})

	return {
		isLoading: state.character.shownCharacters[index].isLoading,
		data: state.character.shownCharacters[index].data,
		...props
	}
}

export default connect(mapStateToProps)(Character);