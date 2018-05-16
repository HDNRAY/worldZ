import React from 'react';
import { connect } from 'dva';
import style from './game.less';
import Basic from '../../components/windows/basic/basic';
import Inventory from '../../components/windows/inventory/inventory';
import Character from '../../components/windows/character/character';
// import MapWindow from '../../components/windows/map/map';
import Gear from '../../components/windows/gear/gear';
import Information from '../../components/game/information/information';


class Game extends React.Component {

	render() {
		// const { show } = this.props;
		// console.log(show)
		return (
			<div id='area' className={style.area}>
				<Basic />
				<Inventory />
				<Character />
				<Gear />
				<Information />
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