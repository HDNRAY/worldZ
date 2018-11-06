import React from 'react';
import PropTypes from 'prop-types';
import style from './item.less';
import Clickable from '../clickable/clickable';
import Tips from '../tips/tips';
import Operations from '../operations/operations';
import { qualities } from '../../../services/constant/item';

class Item extends React.Component {
    render() {

        const { tips, name, quality, operations } = this.props;

        const className = style[qualities.find(q => q.value === quality).className]

        return (
            <Operations operations={operations}>
                <Tips content={tips}>
                    <Clickable text={name} className={className} />
                </Tips>
            </Operations>
        )
    }
}

Item.defaultProps = {

}

Item.propTypes = {
    tips: PropTypes.element.isRequired,
    name: PropTypes.string.isRequired,
    quality: PropTypes.number,
    operations: PropTypes.array.isRequired
}


export default Item;