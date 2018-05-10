import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './field.less';

class Field extends Component {
	render() {
		const { name, children } = this.props;

		return (
			<div className={style.field}>
                <div className={style.lt}></div>
                <div className={style.rt}></div>
                <div className={style.insert}>
                    {!!children ? children : name}
                </div>
                <div className={style.lb}></div>
                <div className={style.rb}></div>
            </div>
		)
	}
}

Field.propTypes = {
	name: PropTypes.string,
	children: PropTypes.element,
}

export default Field;