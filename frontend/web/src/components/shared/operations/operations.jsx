import React from 'react';
import PropTypes from 'prop-types';
import style from './operations.less';
import { Popover } from 'antd';
import Confirm from '../confirm/confirm';


class Operations extends React.Component {
    state = {
        visible: false,
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }

    render = () => {
        const { children, operations } = this.props;

        const content = operations.reduce((result, item, index) => {

            const onClick = () => {
                item.action();
                this.setState({
                    visible: false
                })
            }

            const listItem = !!item.confirm ? (
                <Confirm
                    title={item.confirm}
                    key={'action' + index}
                    onConfirm={onClick}>
                    <div className={style.action}>
                        {item.name}
                    </div>
                </Confirm>
            ) : (
                    <div className={style.action} key={'action' + index} onClick={onClick}>{
                        item.name}
                    </div>
                )

            return [...result, listItem]
        }, [])

        return (
            <Popover content={content}
                arrowPointAtCenter={true}
                visible={this.state.visible}
                trigger='click'
                placement='rightTop'
                onVisibleChange={this.handleVisibleChange}
                overlayClassName={style.operations}>
                {children}
            </Popover>
        )
    }
}


Operations.propTypes = {
    children: PropTypes.element.isRequired,
    operations: PropTypes.array.isRequired
}


export default Operations;