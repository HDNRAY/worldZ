import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import Item from '../../shared/item/item';
import Gear from '../../label/gear/gear';


class Inventory extends Component {
  render = () => {
    const { dispatch } = this.props;

    return (<Window title='Inventory' onClose={() => {
            dispatch({
                type: 'game/switchInventory'
            })
        }}>
            <Item name='一瓶大红'
                tips={(<div>就是一瓶大红</div>)}
                operations={[]}
                quality={Item.qualities.NORMAL} />

            <Gear data={{ name: '光之剑',quality:'legend' }} />
        </Window>)
  }
}

const mapStateToProps = ({ state, props }) => {
  return {
    ...props
  }
}

export default connect(mapStateToProps)(Inventory);