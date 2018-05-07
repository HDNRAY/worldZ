import { Component } from 'react';
import Proptypes from 'prop-types';
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
	name: Proptypes.string.isRequired,
	detail: Proptypes.string,
	value: Proptypes.number,
}


export default Attribute;