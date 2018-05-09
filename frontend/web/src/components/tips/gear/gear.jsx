import style from './gear.less';
// import itemStyle from '../../shared/item/item.less';

const gearTips = ({ name, qualityStyle, type, position, description }) => {
	return (
		<div className={style.tips}>
            <div className={qualityStyle + ' '+ style.name}>{name}</div>
            <div className={style.type}>
                <div>{position}</div>
                <div>{type}</div>
            </div>
            <div className={style.damage}>伤害:100</div>
            <div className={style.effects}>
                <div>可对灵体造成伤害</div>
                <div>可附着魔法，提高斩击威力</div>
            </div>
            <div className={style.description}>
                {description}
            </div>
        </div>
	)
}

export default gearTips;