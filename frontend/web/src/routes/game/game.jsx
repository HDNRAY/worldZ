import React from 'react';
import { connect } from 'dva';
import style from './game.less';
import Basic from '../../components/windows/basic/basic';
import Inventory from '../../components/windows/inventory/inventory';
import Character from '../../components/windows/character/character';


class Game extends React.Component {

	render() {
		const { showInventory, shownCharacters, showMyCharacter } = this.props;

		const characterWindows = shownCharacters.reduce((result, item, index) => {
			return [...result, (<Character key={'character' + index} characterId={item.data.id} />)];
		}, [])

		return (
			<div id='area' className={style.area}>
		      	<Basic />
		      	{showInventory ? <Inventory /> : null}
		      	{showMyCharacter ? <Character characterId={0}/> : null}
		      	{characterWindows}
		    </div>);
	}

}

Game.propTypes = {};

const mapStateToProps = (state, props) => {

	return {
		showInventory: state.game.showInventory,
		shownCharacters: state.character.shownCharacters,
		showMyCharacter: state.game.showMyCharacter,
		...props
	}
}

export default connect(mapStateToProps)(Game);