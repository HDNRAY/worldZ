import React from 'react';
import PropTypes from 'prop-types';
import style from './tips.less';
import { Popover } from 'antd';


class Tips extends React.Component {
	render() {
		const { children, content, onClick } = this.props;

		return (
			<Popover content={content}
                onClick={onClick}
                arrowPointAtCenter={true}
                overlayClassName={style.tips}>
                {children}
            </Popover>
		)
	}
}


Tips.propTypes = {
	children: PropTypes.element.isRequired,
	content: PropTypes.element.isRequired,
	onClick: PropTypes.func
}


export default Tips;