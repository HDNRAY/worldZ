import { Component } from 'react'
import { connect } from 'dva'
import Draggable from 'react-draggable';
import style from './scene.less'
import Instance from '../../scenes/instance/instance'

class Scene extends Component {

    render = () => {
        // const { children } = this.props

        const draggableProps = {
            defaultPosition: {
                x: 0,
                y: 0,
            },
            handle: '#scene'
        }

        const currentScene = null// (<Instance />)

        return (<div id="sceneWrapper" className={style.sceneWrapper}>
            <Draggable {...draggableProps}>
                <div id='scene' className={style.scene}>
                    {currentScene}
                </div>
            </Draggable>
        </div>)
    }

}


const mapStateToProps = (state, props) => {
    return {
        ...props
    }
}

export default connect(mapStateToProps)(Scene);