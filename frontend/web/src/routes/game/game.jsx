import React from 'react';
import { connect } from 'dva';
import style from './game.less';
import Basic from './windows/basic/basic';
import Inventory from './windows/inventory/inventory';
import Character from './windows/character/character';
// import MapWindow from './windows/map/map';
import Gear from './windows/gear/gear';
import Information from './information/information';
// import Scene from '../../components/game/scene/scene';
import Menu from './menu/menu'
import Ability from './windows/ability/ability'

class Game extends React.PureComponent {

    componentDidMount = () => {
        const { id, dispatch, history } = this.props
        console.log(id)
        if (id) {
            dispatch({
                type: 'character/load',
                payload: {
                    id
                }
            })
        } else {
            history.push('/chacater/select')
        }
    }

    render() {

        return (
            <div id='area' className={style.area}>
                {/* <Scene /> */}
                <Basic />
                <Inventory />
                <Character />
                <Gear />
                <Ability />
                <Information />
                <Menu />
            </div>);
    }

}

// Game.propTypes = {};

const mapStateToProps = (state, props) => {

    return {
        id: state.character.get('_id'),
        loginState:state.user.get('loginState'),
        ...props
    }
}

export default connect(mapStateToProps)(Game)