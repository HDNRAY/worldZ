import React from 'react';
import { connect } from 'dva';
import Window from '../window/window';
import Clickable from '../../shared/clickable/clickable'


class Basic extends React.Component {
    render = () => {
        const { dispatch } = this.props;

        return (<Window title='Basic'>
            basic
            
            <Clickable text='Inventory' onClick={() => {
                dispatch({
                    type: 'game/switchInventory',
                })
            }} />
        </Window>)
    }
}


const mapStateToProps = ({ state, props }) => {
    return {
        ...props
    }
}

export default connect(mapStateToProps)(Basic);