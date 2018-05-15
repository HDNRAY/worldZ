import { Component } from 'react';
// import PropTypes from 'prop-types';
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

Character.attributes = {
	value:{
		health: '生命',
		spirit: '精神',
	},
	basic: {
		strength: '力量',
		agility: '敏捷',
		dexterity: '技巧',
		stamina: '耐力',
		mind: '念力',
		experience: '经验',
		intelligence: '智慧',
	},
	advanced: {
		speed: '速度', //敏捷 耐力 
		movement: '移动',// 力量 敏捷 耐力
		accurancy: '精准',//敏捷 技巧 经验
		dodge: '闪避',//敏捷 力量 经验
		defense: '防御',//力量 耐力 
		damage: '破坏',//力量 敏捷 技巧 经验
		resistance: '阻力',//念力 精神
		bearing: '负重',//力量 耐力
		learning: '学习'//智慧 经验 精神
	},
	power: {
		burnning: '燃烧',//念力 精神 智慧
		voltage: '电压',//念力 精神 智慧
		freeze: '冻结',//念力 精神 智慧
		telekinetic: '念动力'//念力 精神 智慧
	}

}

const mapStateToProps = (state, props) => {

	return {
		window: state.game.get('windows').toJS().character,
		data: state.character.myCharacter.data,
		...props
	}
}

export default connect(mapStateToProps)(Character);