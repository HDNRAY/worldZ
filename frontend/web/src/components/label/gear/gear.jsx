import { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import style from './gear.less';
import Item from '../../shared/item/item';
import itemStyle from '../../shared/item/item.less';
// import GearTips from '../../tips/gear/gear';
import { types, positions } from './constant.js';
import { menuTypes } from '../../game/menu/constant'
import ImmmutablePropTypes from 'react-immutable-proptypes';
import { is } from 'immutable';

class Gear extends Component {

	shouldComponentUpdate(nextProps) {
		const { position, gear } = this.props;
		return !is(gear, nextProps.gear) || position !== nextProps.position;
	}

	info = (payload) => {
		this.props.dispatch({
			type: 'information/add',
			payload: payload
		})
	}

	actions = () => {

		const { where, dispatch, gear, position } = this.props;
		console.log('rendring gear', gear)

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
			type: menuTypes.CONFIRM,
			confirm: '确认丢弃吗',
			action: () => {
				dispatch({
					type: 'inventory/remove',
					payload: {
						type: 'gear',
						gear: gear
					}
				})
				this.info({
					content: 'deleted'
				})
			}
		}

		let actions = []

		switch (where) {
			case 'equiped':
				if (gear.get('position').size > 1) actions.push(switchHand);
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

		const qualityStyle = itemStyle[Item.qualities[gear.get('quality').toUpperCase()].className];

		const displayPosition = gear.get('position').map(item => positions[item]).join(',');

		const displayTypes = gear.get('types').reduce((result, item) => {
			const displayType = types[item];
			if (!!displayType) {
				result.push(displayType);
			}
			return result;
		}, []).join(',');

		const gearEffects = gear.get('effects').map((item, index) => {
			return (
				<div key={index}>{item.description}</div>
			)
		})

		return (
			<div className={style.tip}>
				<div className={qualityStyle + ' ' + style.name}>{gear.get('name')}</div>
				<div className={style.type}>
					<div>{displayPosition}</div>
					<div>{displayTypes}</div>
				</div>
				{!!gear.get('damage') ? <div className={style.damage}>伤害:{gear.get('damage')}</div> : null}
				<div className={style.weight}>重量:{gear.get('weight')}kg</div>
				<div className={style.effects}>
					{gearEffects}
				</div>
				<div className={style.description}>
					{gear.get('description')}
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

		const name = gear.get('name');

		const quality = Item.qualities[gear.get('quality').toUpperCase()];

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
	gear: ImmmutablePropTypes.map,
	where: PropTypes.string.isRequired
}

Gear.types = types;
Gear.positions = positions

const mapStateToProps = (state, props) => {
	const wearings = state.gear.get('wearings');

	const comparePositions = props.gear.get('types').includes('twoHand') ? ['firstHand', 'offHand'] : props.gear.get('position');

	const compareGears = comparePositions.reduce((result, item) => {
		if (!!wearings.get(item)) {
			result.push(wearings.get(item));
		}
		return result;
	}, []);

	return {
		compareGears,
		...props
	}
}

export default connect(mapStateToProps)(Gear);