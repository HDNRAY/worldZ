import React from 'react';
import Proptypes from 'prop-types';
import Tips from '../../shared/tips/tips';


class Attribute extends React.Component {
	render() {
		const { name, value, detail } = this.props;

		const content = (
			<div>属性介绍</div>
		);



		return (
			<Tips content={content}>
                <div>{name} {value}</div>
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