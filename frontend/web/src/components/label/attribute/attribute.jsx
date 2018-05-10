import { Component } from 'react';
import PropTypes from 'prop-types';
import Tips from '../../shared/tips/tips';
import style from './attribute.less';

class Attribute extends Component {
	render() {
		const { name, value, detail } = this.props;

		const content = (
			<div className={style.tips}>
				<div>属性介绍</div>
				<div>{detail}</div>
			</div>

		);

		return (
			<Tips content={content}>
                <div className={style.attribute}>{name} {value}</div>
            </Tips>
		)
	}
}


Attribute.propTypes = {
	name: PropTypes.string.isRequired,
	detail: PropTypes.string,
	value: PropTypes.number,
}


export default Attribute;