import React from 'react';
import { connect } from 'dva';
import style from './game.less';
import Basic from '../../components/windows/basic/basic';
import Inventory from '../../components/windows/inventory/inventory';
import Character from '../../components/windows/character/character';
// import MapWindow from '../../components/windows/map/map';
import Gear from '../../components/windows/gear/gear';
import Information from '../../components/game/information/information';
import Scene from '../../components/game/scene/scene';
import Menu from '../../components/game/menu/menu'
import Ability from '../../components/windows/ability/ability'

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

Game.propTypes = {};

const mapStateToProps = (state, props) => {

	return {
		...props
	}
}

export default connect(mapStateToProps)(Game);