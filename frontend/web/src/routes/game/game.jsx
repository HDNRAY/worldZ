import React from 'react';
// import { connect } from 'dva';
import style from './game.less';
import Basic from './windows/basic/basic';
import Inventory from './windows/inventory/inventory';
import Character from './windows/character/character';
// import MapWindow from './windows/map/map';
import Gear from './windows/gear/gear';
import Information from './information/information';
// import Scene from '../../components/game/scene/scene';
import Menu from './menu/menu'
import Ability from './windows/ability/ability'

class Game extends React.Component {

	render() {

		return (
			<div id='area' className={style.area}>
				{/* <Scene /> */}
				<Basic />
				<Inventory />
				<Character />
				<Gear />
				<Ability />
				<Information />
				<Menu />
			</div>);
	}

}

// Game.propTypes = {};

// const mapStateToProps = (state, props) => {

// 	return {
// 		...props
// 	}
// }

export default Game