import React from 'react';
import Proptypes from 'prop-types';
import style from './gear.less';
import Item from '../../shared/item/item';
import itemStyle from '../../shared/item/item.less'

class Gear extends React.Component {
    render() {
        const { data} = this.props;

        const name = data.name;

        const quality = Item.qualities[data.quality.toUpperCase()];

        const actions = [{
            name: '装备',
            action: () => {
                console.log('equiped')
            }
        }, {
            name: '丢弃',
            confirm: '确认丢弃吗',
            action: () => {
                console.log('deleted')
            }
        }]

        const tips = (<div className={style.tips}>
            <div className={itemStyle[quality.className] + ' '+ style.name}>{data.name}</div>
            <div className={style.type}>
                <div>双手</div>
                <div>剑</div>
            </div>
            <div className={style.damage}>伤害:100</div>
            <div className={style.effects}>
                <div>可对灵体造成伤害</div>
                <div>可附着魔法，提高斩击威力</div>
            </div>
            <div className={style.description}>
                格伦诺瓦
            </div>
        </div>)

        return (
            <Item name={name} 
            tips={tips}
            quality={quality}  
            operations={actions}/>
        )
    }
}


Gear.propTypes = {
    data:Proptypes.object.isRequired
}


export default Gear;