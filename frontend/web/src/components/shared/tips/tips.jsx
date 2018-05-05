import React from 'react';
import Proptypes from 'prop-types';
import style from './tips.less';
import { Popover } from 'antd';


class Tips extends React.Component {
    render() {
        const { children, content } = this.props;

        return (
            <Popover content={content}
                arrowPointAtCenter={true}
                overlayClassName={style.tips}>
                {children}
            </Popover>
        )
    }
}


Tips.propTypes = {
    children: Proptypes.element.isRequired,
    content: Proptypes.element.isRequired
}


export default Tips;