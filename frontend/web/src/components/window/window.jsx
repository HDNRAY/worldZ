import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { Icon } from 'antd';
import windowStyle from './window.less';

function getDisplayName(component) {
    return component.displayName || component.name || 'Component';
}

export default ({ title, onClose = null, width = '300px', height = '150px',show }) => (WrappedComponent) => class Window extends Component {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`

    render() {
        const titleBar = (<div id='titleBar' className={windowStyle.titleBar}>
            <div className={windowStyle.title}>
                {title}
            </div>
            {!!onClose ? <Icon type='close' onClick={onClose} /> : null}
        </div>)

        const props = {
            defaultPosition: { x: 10, y: 10 },
            bounds: 'parent',
            handle: '#titleBar'
        }
        console.log(WrappedComponent)
        return (<Draggable {...props} >
            <div style={{ width, height }} className={windowStyle.window}>
                {titleBar}
                <div className={windowStyle.content}>
                    <WrappedComponent />
                </div>
            </div>
        </Draggable>);
    }
}