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
		const { where, dispatch, gear, position } = this.props;

		const switchHand = {
			name: '换手',
			action: () => {
				dispatch({
					type: 'inventory/switchHand',
				})
				this.info({
					content: 'switched'
				})
			}
		}

		const actionEquip = {
			name: '装备',
			action: () => {
				dispatch({
					type: 'inventory/equip',
					payload: {
						gear: gear
					}
				})
				this.info({
					content: 'equiped'
				})
			}
		}

		const actionUnequip = {
			name: '卸下',
			action: () => {
				dispatch({
					type: 'inventory/unequip',
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
				if (gear.position.size > 0) actions.push(switchHand);
				actions.push(actionUnequip);
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
		const { name, quality, types, position, description, effects, weight, damage } = gear;

		const qualityStyle = itemStyle[Item.qualities[quality.toUpperCase()].className];

		const displayPosition = position.map(item => Gear.positions[item]).join(',');

		const displayTypes = types.reduce((result, item) => {
			const displayType = Gear.displayTypes[item];
			if (!!displayType) {
				result.push(displayType);
			}
			return result;
		}, []).join(',');

		const gearEffects = effects.map((item, index) => {
			return (
				<div key={index}>{item.description}</div>
			)
		})

		return (
			<div className={style.tip}>
				<div className={qualityStyle + ' ' + style.name}>{name}</div>
				<div className={style.type}>
					<div>{displayPosition}</div>
					<div>{displayTypes}</div>
				</div>
				{!!damage ? <div className={style.damage}>伤害:{damage}</div> : null}
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
		const { gear, compareGears, where } = this.props;
		return (<div className={style.tips}>
			{this.gearTip(gear)}
			{where !== 'equiped' ? compareGears.map((item, index) => {
				return !!item ? (<div key={index}>
					<div className={style.equiped}>穿戴中的装备</div>
					{this.gearTip(item)}
				</div>) : null
			}) : null}
		</div>)
	}

	render() {
		const { gear } = this.props;

		const name = gear.name;

		const quality = Item.qualities[gear.quality.toUpperCase()];

		const actions = this.actions()

		const tips = this.gearTips()

		return (
			<Item name={name}
				tips={tips}
				quality={quality}
				operations={actions} />
		)
	}
}


Gear.propTypes = {
	gear: PropTypes.object.isRequired,
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
	// twoHand: '双手',
	// oneHand: '单手',
	fingers: '戒指',
}

Gear.displayTypes = {
	twoHand: '双手',
	sword: '剑',
	dagger: '匕首'
}

const mapStateToProps = (state, props) => {
	const wearings = state.inventory.get('wearings').toJS();

	const comparePositions = props.gear.types.includes('twoHand') ? ['firstHand', 'offHand'] : props.gear.position;

	const compareGears = comparePositions.reduce((result, item) => {
		if (!!wearings[item]) {
			result.push(wearings[item]);
		}
		return result;
	}, []);

	return {
		compareGears,
		...props
	}
}

export default connect(mapStateToProps)(Gear);