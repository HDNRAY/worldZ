import style from './gear.less';
// import itemStyle from '../../shared/item/item.less';

const positions = {
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

const gearTips = ({ name, qualityStyle, type, position, description, effects, weight, damage }) => {
	const gearEffects = effects.map((item, index) => {
		return (
			<div key={index}>{item.description}</div>
		)
	})

	return (
		<div className={style.tips}>
            <div className={qualityStyle + ' '+ style.name}>{name}</div>
            <div className={style.type}>
                <div>{positions[position]}</div>
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

export default gearTips;