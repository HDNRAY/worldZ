import React from 'react';
import PropTypes from 'prop-types';
import style from './clickable.less';


class Clickable extends React.Component {
	render() {
		const { onClick, text, className, onMouseEnter, onMouseLeave } = this.props;

		return (<div onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={(e)=>{
                e.preventDefault();
                onClick(e);
            }}
            className={className + ' ' + style.clickable}>
            {text}
        </div>)
	}
}

Clickable.defaultProps = {
	className: '',
}

Clickable.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string,
	className: PropTypes.string,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func
}


export default Clickable;