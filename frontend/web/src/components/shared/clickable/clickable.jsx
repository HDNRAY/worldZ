import React from 'react';
import Proptypes from 'prop-types';
import style from './clickable.less';


class Clickable extends React.Component {
    render() {
        const { onClick, text, className, onMouseEnter, onMouseLeave } = this.props;

        return (<div onMouseEnter={onMouseEnter}
            onMouseLeave={null}
            onClick={onClick}
            className={className + ' ' + style.clickable}>
            {text}
        </div>)
    }
}

Clickable.defaultProps = {
    className: '',
}

Clickable.propTypes = {
    onClick: Proptypes.func,
    text: Proptypes.string,
    className: Proptypes.string,
    onMouseEnter: Proptypes.func,
    onMouseLeave: Proptypes.func
}


export default Clickable;