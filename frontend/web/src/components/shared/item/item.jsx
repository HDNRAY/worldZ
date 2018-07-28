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
	LEGEND: { value: 3, name: 'Legend', className: 'legend' }, //unique in the world
	EPIC: { value: 2, name: 'Epic', className: 'epic' }, //with strong soul power enhanced
	MAGIC: { value: 1, name: 'Magic', className: 'magic' }, //with magic enhanced
	NORMAL: { value: 0, name: 'Normal', className: 'normal' } //crafted with metals
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