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
            console.log('closing Inventory')
            dispatch({
                type: 'game/switchInventory'
            })
        }}>
            <Item name='一瓶大红'
                tips={(<div>就是一瓶大红</div>)}
                operations={[]}
                quality={Item.qualities.NORMAL} />
            {/* <Item name='Gorn Nova'
                tips={(<div style={{ color: 'white', border: '1px solid grey' }}>光之剑</div>)}
                quality={Item.qualities.LEGEND}
                operations={[{
                    name: '装备',
                    action: () => {
                        console.log('equiped')
                    }
                }, {
                    name: '丢弃',
                    confirm: '确认丢弃吗',
                    action: () => {
                        console.log('deleted')
                    }

                }]}
            /> */}
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