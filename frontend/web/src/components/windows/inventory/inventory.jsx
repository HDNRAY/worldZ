import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import window from '../window/window';


class Inventory extends Component {
    render() {
        return (<div>
            Inventory
        </div>)
    }
}


const windowParams = {
    title: 'Inventory',
    onClose: ()=>{
        console.log('closing Inventory')

    },
}

const mapStateToProps = ({ state, props }) => {
    return {
        ...props
    }
}

export default window(windowParams)(connect(mapStateToProps)(Inventory));