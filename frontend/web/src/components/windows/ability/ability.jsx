import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import style from './ability.less';


class Ability extends Component {
    render = () => {
        const { window, skills } = this.props;

        return (<Window title='能力' id={5} position={{ x: 320, y: 300 }} windowClassName={style.abilityWindow} window={window} nameToClose='ability'>
            <div className={style.list}>
                {spendables}
                {gears}
            </div>
        </Window>)
    }
}

const mapStateToProps = (state, props) => {
    return {
        window: state.game.getIn(['windows', 'ability']),
        skills: state.ability.get('skills'),
        ...props
    }
}

export default connect(mapStateToProps)(Ability);