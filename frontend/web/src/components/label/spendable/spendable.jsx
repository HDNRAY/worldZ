import React from 'react';
import Proptypes from 'prop-types';
import style from './spendable.less';
import Item from '../../shared/item/item';
import itemStyle from '../../shared/item/item.less'

class Spendable extends React.Component {
  render() {
    const { data } = this.props;

    const name = `${data.name}${!!data.quantity ? ('\(' + data.quantity + '\)') : ''}`;

    const quality = Item.qualities[data.quality.toUpperCase()];

    const actions = [{
      name: '使用',
      action: () => {
        console.log('used')
        if (!!data.quantity) console.log('spended')
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
            <div className={style.quantity}>
                数量 {data.quantity}
            </div>
            <div className={style.description}>
                回血用的
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


Spendable.propTypes = {
  data: Proptypes.object.isRequired
}


export default Spendable;