import React from 'react';
import { connect } from 'dva';
import style from './game.less';
import Basic from '../../components/windows/basic/basic';
// import Skill from '../../components/skill/skill';
import Inventory from '../../components/windows/inventory/inventory';


class Game extends React.Component {

  render() {
    const { showInventory } = this.props;

    return (<div id='area' className={style.area}>
      <Basic />
      {showInventory ? <Inventory /> : null}
    </div>);
  }

}

Game.propTypes = {};

export default connect((state, props) => {
  return {
    showInventory: state.game.showInventory,
    ...props
  }
})(Game);