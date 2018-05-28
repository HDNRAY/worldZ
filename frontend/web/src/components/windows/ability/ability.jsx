import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import style from './ability.less';


class Ability extends Component {
    onAbilityNameClick = ()=>{
        this.props.dispatch({
            type:'ability/showDetail',
            payload:{
                id
            }
        })
    }
    render = () => {
        const { window, abilities } = this.props;

        const abilityList = abilities.map(ability=>{
            return <div onClick={this.onAbilityNameClick}>{ability.name}</div>
        })

        const detail = (<div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>)

        return (<Window title='能力' id={5} position={{ x: 320, y: 300 }} windowClassName={style.abilityWindow} window={window} nameToClose='ability'>
            <div className={style.wrapper}>
                <div className={style.abilityList}>
                    {abilityList}
                </div>
                <div className={style.abilityDetail}>
                    {detail}
                </div>
            </div>
        </Window>)
    }
}

const mapStateToProps = (state, props) => {
    return {
        window: state.game.getIn(['windows', 'ability']),
        abilities: state.ability.get('abilities'),
        ...props
    }
}

export default connect(mapStateToProps)(Ability);