import React from 'react';
import { Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Layout } from 'antd';
// import styles from './game.css';
import Game from './game/game';
import style from './index.less';


const { Header, Footer, Content } = Layout;

function Index() {
  return (<Layout className={style.layout}>
          <Header className={style.header}>worldz</Header>
          <Content className={style.content} >
              <Switch>
                  <Route path='/game' exact component={Game} />
              </Switch>
          </Content>
          <Footer className={style.footer}>footer</Footer>
      </Layout>);
}

Index.propTypes = {};

export default connect()(Index);