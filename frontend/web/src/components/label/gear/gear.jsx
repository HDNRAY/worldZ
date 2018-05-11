import { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import style from './gear.less';
import Item from '../../shared/item/item';
import itemStyle from '../../shared/item/item.less';
// import GearTips from '../../tips/gear/gear';

class Gear extends Component {
	info = (payload) => {
		this.props.dispatch({
			type: 'information/add',
			payload: payload
		})
	}

	actions = () => {
		const { where, dispatch, data } = this.props;

		const actionEquip = {
			name: '装备',
			action: () => {

				this.info({
					content: 'equiped'
				})
			}
		}

		const actionUnequip = {
			name: '卸下',
			action: () => {
				const position = data.position === 'twoHand' ? 'firstHand' : data.position;
				dispatch({
					type: 'gear/unequip',
					payload: {
						position: position
					}
				})
				this.info({
					content: 'unequiped'
				})
			}
		}

		const actionDrop = {
			name: '丢弃',
			confirm: '确认丢弃吗',
			action: () => this.info({
				content: 'deleted'
			})
		}

		let actions = []

		switch (where) {
			case 'equiped':
				actions = [actionUnequip];
				break;
			case 'inventory':
				actions = [actionEquip, actionDrop];
				break;
			default:
				break;
		}

		return actions;
	}

	gearTip = (gear) => {
		if (!gear) return null;
		const { name, quality, type, position, description, effects, weight, damage } = gear;

		const qualityStyle = itemStyle[Item.qualities[quality.toUpperCase()].className];

		const gearEffects = effects.map((item, index) => {
			return (
				<div key={index}>{item.description}</div>
			)
		})

		return (
			<div className={style.tip}>
				<div className={qualityStyle + ' '+ style.name}>{name}</div>
				<div className={style.type}>
					<div>{Gear.positions[position]}</div>
					<div>{type}</div>
				</div>
				<div className={style.damage}>伤害:{damage}</div>
				<div className={style.weight}>重量:{weight}kg</div>
				<div className={style.effects}>
					{gearEffects}
				</div>
				<div className={style.description}>
					{description}
				</div>
			</div>
		)
	}

	gearTips = () => {
		const { data, compareGears, where } = this.props;
		return (<div className={style.tips}>
			{this.gearTip(data)}
			{where !== 'equiped' ? compareGears.map((item,index)=>{
				return !!item ? (<div key={index}>
					<div className={style.equiped}>穿戴中的装备</div>
					{this.gearTip(item)}
				</div>) : null
			}):null}
		</div>)
	}

	render() {
		const { data } = this.props;

		const name = data.name;

		const quality = Item.qualities[data.quality.toUpperCase()];

		const actions = this.actions()

		const tips = this.gearTips()

		return (
			<Item name={name}
            tips={tips}
            quality={quality}
            operations={actions}/>
		)
	}
}


Gear.propTypes = {
	data: PropTypes.object.isRequired,
	where: PropTypes.string.isRequired
}

Gear.positions = {
	head: '头部',
	neck: '颈部',
	shoulders: '肩部',
	torso: '胸部',
	back: '背部',
	wrists: '腰',
	hands: '手',
	waist: '手臂',
	legs: '腿',
	feets: '脚',
	firstHand: '主手',
	offHand: '副手',
	twoHand: '双手',
	fingers: '戒指',
}

const mapStateToProps = (state, props) => {
	let gears = state.gear.get('gears').toJS();
	let compareGears = [];
	if (props.data.position === 'twoHand') {
		compareGears = [gears.firstHand, gears.offHand]
	} else {
		compareGears = [gears[props.data.position]]
	}

	return {
		compareGears,
		...props
	}
}

export default connect(mapStateToProps)(Gear);