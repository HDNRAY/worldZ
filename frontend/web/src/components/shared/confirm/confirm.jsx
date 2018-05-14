import React from 'react';
import PropTypes from 'prop-types';
import style from './confirm.less';
import { Popconfirm } from 'antd';


class Confirm extends React.Component {
    render = () => {
        const { children, title, onConfirm } = this.props;

        return (
            <Popconfirm okText='确定' overlayClassName={style.confirm} cancelText='取消' title={title} onConfirm={onConfirm}>
                {children}
            </Popconfirm>
        )
    }
}


Confirm.propTypes = {
    children: PropTypes.element.isRequired,
    onConfirm: PropTypes.func,
    title: PropTypes.string.isRequired
}


export default Confirm;