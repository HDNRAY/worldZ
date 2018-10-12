import { Component } from 'react';
import style from './wrapper.less';
import Draggable from 'react-draggable';


class SceneWrapper extends Component {


    render = () => {
        const { children } = this.props

        const draggableProps = {
            defaultPosition: {
                x: 0,
                y: 0,
            },
            handle: '#scene'
        }

        return (<div id="sceneWrapper" className={style.sceneWrapper}>
            <Draggable {...draggableProps}>
                <div id='scene' className={style.scene}>
                    {children}
                </div>
            </Draggable>
        </div>)
    }
}


export default SceneWrapper;