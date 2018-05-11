import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './field.less';

class Field extends Component {
	render() {
		const { name, children, invalid } = this.props;

		const invalidStyle = !!invalid ? style.invalid + ' ' : '';

		const center = !!children ?
			(<div className={style.insert}>{children}</div>) :
			(<div className={style.name}>{name}</div>)

		return (
			<div className={ invalidStyle + style.field}>
                <div className={style.lt}></div>
                <div className={style.rt}></div>
                {center}
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