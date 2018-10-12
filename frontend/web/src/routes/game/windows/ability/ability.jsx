import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../../../../components/window/window'
import style from './ability.less';


class Ability extends Component {
    onAbilityNameClick = (id) => {
        this.props.dispatch({
            type: 'ability/showDetail',
            payload: {
                id
            }
        })
    }
    render = () => {
        const { window, abilities, showId } = this.props;

        let showAbility

        const abilityList = abilities.map(ability => {
            const detail = ability.ability
            let abilityClassName = style.abilityItem
            if (detail.id === showId) {
                abilityClassName = style.selectedAbilityItem
                showAbility = ability
            }

            return <div className={abilityClassName} key={'ability' + detail.id} onClick={() => this.onAbilityNameClick(detail.id)}>{detail.name}</div>
        })

        const detail = (<div>
            <div>{showAbility.ability.name}</div>
            <div>{showAbility.ability.description}</div>
            <div>{showAbility.proficiencies}</div>
            <div>{showAbility.ability.difficulty}</div>
        </div>)

        return (<Window title='能力' id={5} position={{ x: 320, y: 300 }} window={window} nameToClose='ability'>
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
        showId: state.ability.get('showId'),
        ...props
    }
}

export default connect(mapStateToProps)(Ability);