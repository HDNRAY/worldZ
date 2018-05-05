import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import Item from '../../shared/item/item';


class Inventory extends Component {
    render=()=> {
        const {dispatch} = this.props;

        return (<Window title='Inventory' onClose={() => {
            console.log('closing Inventory')
            dispatch({
                type:'game/switchInventory'
            })
        }}>
            <Item name='一瓶大红' tips={(<div>就是一瓶大红</div>)} quality={Item.qualities.NORMAL}/>
            <Item name='Gorn Nova' tips={(<div>光之剑</div>)} quality={Item.qualities.LEGEND}/>
        </Window>)
    }
}

const mapStateToProps = ({ state, props }) => {
    return {
        ...props
    }
}

export default connect(mapStateToProps)(Inventory);