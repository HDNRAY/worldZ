import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import Attribute from '../../label/attribute/attribute';
import style from './character.less';

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
		console.log(data)

		const attributes = !!data.attributes ? (
			<div className={style.attributes}>
				{Object.keys(data.attributes).map((item)=>{
					return (<Attribute name={item} value={data.attributes[item]} detail={item}/>)
				})}
			</div>
			
		) : null

		return (
			<Window title={data.name} isLoading={isLoading} onClose={() => {
                dispatch({
                    type: 'character/hideCharacter',
                    payload:{
                        id:characterId
                    }
                })
            }}>
					{attributes}

            </Window>)
	}
}

Character.propTypes = {
	characterId: PropTypes.number.isRequired
}

const mapStateToProps = (state, props) => {

	const character = state.character.shownCharacters.find((item, index) => {
		return item.data.id === props.characterId;
	})

	return {
		isLoading: character.isLoading,
		data: character.data,
		...props
	}
}

export default connect(mapStateToProps)(Character);