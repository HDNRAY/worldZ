import React from 'react';
import { connect } from 'dva';
// import { Layout } from 'antd';
import Draggable from 'react-draggable';
import style from './gameArea.less'



function GameArea() {
  return (<div className={style.area}>
      <Draggable defaultPosition={{x: 0, y: 0}} >
          <div>window</div>
      </Draggable>
   </div>);
}

GameArea.propTypes = {};

export default connect()(GameArea);