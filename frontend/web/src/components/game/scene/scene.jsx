import { Component } from 'react';
import { connect } from 'dva';
// import Clickable from '../../shared/clickable/clickable';
// import Character from '../../label/character/character';
import style from './scene.less';


class Scene extends Component {
    render = () => {

        const scene = (<div className={style.scene}></div>)

        return (<div className={style.sceneWrapper}>
            {scene}
        </div>)
    }
}


const mapStateToProps = (state, props) => {
    return {
        ...props
    }
}

export default connect(mapStateToProps)(Scene);