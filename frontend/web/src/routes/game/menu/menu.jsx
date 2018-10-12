import React from 'react';
import { connect } from 'dva';
import style from './menu.less'
import { menuTypes } from './constant'


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

    renderOperation = () => {
        const { operations, dispatch } = this.props

        return operations.map((item, index) => {

            let onClick

            if (item.type) {
                if (item.type === menuTypes.CONFIRM) {
                    onClick = () => dispatch({
                        type: 'menu/push',
                        payload: {
                            type: menuTypes.CONFIRM,
                            confirm: item.confirm,
                            onConfirm: item.action
                        }
                    })
                } else {
                    onClick = () => dispatch({
                        type: 'menu/push',
                        payload: {
                            type: item.type
                        }
                    })
                }

            } else {
                onClick = this.actionAndHideMenu(item.action)
            }

            return (<div className={style.action} key={'action' + index} onClick={onClick}>
                {item.name}
            </div>)
        })
    }

    actionAndHideMenu = (action) => {
        return () => {
            this.hideMenu()
            action()
        }
    }

    hideMenu = () => {
        this.props.dispatch({
            type: 'menu/hide'
        })
    }

    renderConfirm = () => {
        const { confirm, onConfirm } = this.props
        return (<div className={style.menuConfirm}>
            <div>{confirm}</div>
            <div onClick={onConfirm}>确定</div>
        </div>)
    }

    renderAbility = () => {
        return null
    }

    renderSpendables = () => {
        return null
    }

    renderer = {
        'operations': this.renderOperation,
        'confirm': this.renderConfirm,
        'abilities': this.renderAbility,
        'spendables': this.renderSpendables
    }

    render = () => {
        const { show, menus, dispatch } = this.props
        console.log('show', show)
        if (!show) return null

        const type = menus[0]
        const { x, y } = this.optimizePosition()
        console.log(menus)

        const actionbar = menus.length > 1 ? (<div className={style.actionBar}>
            <div className={style.back} onClick={() => dispatch({
                type: 'menu/back',
            })
            }>返回</div>
        </div>) : null

        const content = this.renderer[type]()

        return (<div className={style.menuWrapper}>
            <div onClick={this.hideMenu} className={style.menuCover}></div>
            <div className={style.menu + ' ' + type} style={{ left: x, top: y }}>
                {actionbar}
                {content}
            </div>
        </div>

        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        show: state.menu.get('show'),
        operations: state.menu.get('operations'),
        confirm: state.menu.get('confirm'),
        menus: state.menu.get('menus'),
        position: state.menu.get('position'),
        abilities: state.ability.get('abilities'),
        spendables: state.inventory.get('spendables'),
        ...props
    }
}

export default connect(mapStateToProps)(Menu);