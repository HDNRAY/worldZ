import React from 'react';
import { connect } from 'dva';
import Confirm from '../../shared/confirm/confirm'
import style from './menu.less'


class Menu extends React.PureComponent {

    optimizePosition = () => {
        const { operations, position } = this.props

        let mx = position.x
        let my = position.y

        //header height
        my = my - 64

        // margin to mouse
        mx = mx + 10

        // center vertical
        my = my - (operations.length * 26 + 2) / 2

        return { x: mx, y: my }
    }

    render = () => {
        const { show, operations, position } = this.props

        const { x, y } = this.optimizePosition()
        console.log(position)
        const content = operations.map((item, index) => {

            const operation = !!item.confirm ? (
                <Confirm
                    title={item.confirm}
                    key={'action' + index}
                    onConfirm={item.action}>
                    <div className={style.action}>
                        {item.name}
                    </div>
                </Confirm>
            ) : (
                    <div className={style.action} key={'action' + index} onClick={item.action}>{
                        item.name}
                    </div>
                )

            return operation
        })

        return show ? (<div className={style.menu} style={{ left: x, top: y }}>
            {content}
        </div>) : null
    }
}


const mapStateToProps = (state, props) => {
    return {
        show: state.menu.get('show'),
        operations: state.menu.get('operations'),
        position: state.menu.get('position'),
        ...props
    }
}

export default connect(mapStateToProps)(Menu);