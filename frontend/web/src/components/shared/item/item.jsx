import React from 'react';
import Proptypes from 'prop-types';
import style from './item.less';
import Clickable from '../clickable/clickable';
import Tips from '../tips/tips';

class Item extends React.Component {
    render() {
        const { tips, name, quality, operations } = this.props;

        return (
            <Tips content={tips}>
                <Clickable text={name} className={style[quality.className]} onMouseEnter={()=>{
                    console.log('on mouse entered');
                }} onClick={() => {
                    console.log('onclicked')
                    if (operations) console.log('show operations')
                }} />
            </Tips>

        )
    }
}

Item.qualities = {
    LEGEND: { name: 'Legend', className: 'legend' },
    NORMAL: { name: 'Normal', className: 'normal' }
}

Item.propTypes = {
    tips: Proptypes.element.isRequired,
    name: Proptypes.string.isRequired,
    quality: Proptypes.oneOf(Object.values(Item.qualities)).isRequired,
    operations: Proptypes.element
}


export default Item;