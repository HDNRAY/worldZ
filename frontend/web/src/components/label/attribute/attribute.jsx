import { Component } from 'react';
import PropTypes from 'prop-types';
import Tips from '../../shared/tips/tips';
import style from './attribute.less';
import {attributes} from './constant';

class Attribute extends Component {

	shouldComponentUpdate(nextProps){
		const { attribute, value } = this.props;
		if(attribute !== nextProps.attribute) return true;
		if(value !== nextProps.value)return true;
		return false
	}

	render() {
		const { attribute, value } = this.props;
		console.log('rendring attribute', attribute)
		const content = (
			<div className={style.tips}>
				<div className={style.oneLine}>{attributes[attribute].name}</div>
				<div className={style.description}>{attributes[attribute].decription}</div>
			</div>
		);

		// const display = `${attributes[attribute].name} ${value}`;

		return (
			<Tips content={content}>
				<div className={style.attribute}>
					<label>{attributes[attribute].name}</label>
					<span>{value}</span>
				</div>
            </Tips>
		)
	}
}


Attribute.propTypes = {
	attribute: PropTypes.string.isRequired,
	value: PropTypes.number,
}

Attribute.attributes = attributes


export default Attribute;