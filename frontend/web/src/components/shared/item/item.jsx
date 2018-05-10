import React from 'react';
import PropTypes from 'prop-types';
import style from './item.less';
import Clickable from '../clickable/clickable';
import Tips from '../tips/tips';
import Operations from '../operations/operations';

class Item extends React.Component {
	render() {

		const { tips, name, quality, operations } = this.props;

		return (
			<Operations operations={operations}>
                <Tips content={tips}>
                    <Clickable text={name} className={style[quality.className]} />
                </Tips>
            </Operations>
		)
	}
}

Item.qualities = {
	LEGEND: { name: 'Legend', className: 'legend' }, //unique in the world
	EPIC: { name: 'epic', className: 'epic' }, //with strong soul power enhanced
	MAGIC: { name: 'magic', className: 'magic' }, //with magic enhanced
	NORMAL: { name: 'Normal', className: 'normal' } //crafted with metals
}

Item.defaultProps = {

}

Item.propTypes = {
	tips: PropTypes.element.isRequired,
	name: PropTypes.string.isRequired,
	quality: PropTypes.oneOf(Object.values(Item.qualities)).isRequired,
	operations: PropTypes.array.isRequired
}


export default Item;