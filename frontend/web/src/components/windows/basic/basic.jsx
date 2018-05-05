import React from 'react';
import { connect } from 'dva';
import window from '../window/window';
import Clickable from '../../shared/clickable/clickable'


class Basic extends React.Component {
    render = () => {
        const { dispatch } = this.props;

        return (<div>
            basic

            <Clickable text='Inventory' onClick={() => {

                dispatch({
                    type: 'game/switchInventory',
                })
            }} />
        </div>)
    }
}

const windowParams = {
    title: 'Basic',
}

const mapStateToProps = ({ state, props }) => {
    return {
        ...props
    }
}

export default window(windowParams)(connect(mapStateToProps)(Basic));