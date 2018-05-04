import React from 'react';
import { connect } from 'dva';
import style from './game.less';
import Basic from '../basic/basic';


function Game() {
  return (<div className={style.area}>
      <Basic/>
   </div>);
}

Game.propTypes = {};

export default connect()(Game);