import React from 'react';
import { connect } from 'dva';
import style from './game.less';
import Basic from '../../components/basic/basic';
// import Skill from '../../components/skill/skill';
import Inventory from '../../components/inventory/inventory';


class Game extends React.Component {

  render() {

    return (<div id='area' className={style.area}>
      <Basic />
      <Inventory />
    </div>);
  }

}

Game.propTypes = {};

export default connect((state, props) => {
  return {
    ...props
  }
})(Game);