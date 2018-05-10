import style from './gear.less';
// import itemStyle from '../../shared/item/item.less';

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
                <div>{position}</div>
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