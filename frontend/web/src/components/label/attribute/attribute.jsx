import { Component } from 'react';
import PropTypes from 'prop-types';
import Tips from '../../shared/tips/tips';
import style from './attribute.less';
import {attributes} from './constant';

class Attribute extends Component {
	render() {
		const { attribute, value, detail } = this.props;
		const content = (
			<div className={style.tips}>
				<div>{attributes[attribute].name}</div>
				<div>{attributes[attribute].decription}</div>
			</div>
		);

		const display = `${attributes[attribute].name} ${value}`;

		return (
			<Tips content={content}>
				<div className={style.attribute}>{display}</div>
            </Tips>
		)
	}
}


Attribute.propTypes = {
	attribute: PropTypes.string.isRequired,
	detail: PropTypes.string,
	value: PropTypes.number,
}

Attribute.attributes = attributes


export default Attribute;