import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { Icon } from 'antd';
import windowStyle from './window.less';

 
class Window extends Component {

    render=()=> {
        const {onClose,title,children,style} = this.props;

        const titleBar = (<div id='titleBar' className={windowStyle.titleBar}>
            <div className={windowStyle.title}>
                {title}
            </div>
            {!!onClose ? <Icon type='close' onClick={onClose} /> : null}
        </div>)

        const draggableProps = {
            defaultPosition: { x: 10, y: 10 },
            bounds: 'parent',
            handle: '#titleBar'
        }

        const finalStyle = {
            height:'200px',
            width:'300px',
            ...style
        }

        return (<Draggable {...draggableProps} >
            <div style={finalStyle} className={windowStyle.window}>
                {titleBar}
                <div className={windowStyle.content}>
                    {children}
                </div>
            </div>
        </Draggable>);
    }
}

export default Window;