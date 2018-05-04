import React, { Component } from 'react';
import { connect } from 'dva';
import Draggable from 'react-draggable';
import { Icon } from 'antd';
import style from './window.less';

function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

export default ({ title }) => (WrappedComponent) => class Window extends Component {
  static displayName = `HOC(${getDisplayName(WrappedComponent)})`

  render() {
    const titleBar = (<div className={style.titleBar}>
            <div className={style.title}>
                {title}
            </div>
            <Icon type='close'/>
        </div>)

    return (<Draggable defaultPosition={{x: 0, y: 0}} >
                <div className={style.window}>
                    {titleBar}
                    <div className={style.content}>
                        <WrappedComponent/>
                    </div>
                </div>
            </Draggable>);
  }
}