import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
// import styles from './game.css';
import GameArea from '../components/gameArea/gameArea'

const { Header, Footer, Content } = Layout;

function Game() {
  return (<Layout>
          <Header>worldz</Header>
          <Content>
              <GameArea />
          </Content>
          <Footer>footer</Footer>
      </Layout>);
}

Game.propTypes = {};

export default connect()(Game);