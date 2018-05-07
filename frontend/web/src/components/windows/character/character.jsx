import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';


class Character extends Component {
  render = () => {
    const { dispatch } = this.props;

    return (<Window title='Character' onClose={() => {
            dispatch({
                type: 'game/showCharacter'
            })
        }}>

        </Window>)
  }
}

const mapStateToProps = ({ state, props }) => {
  return {
    ...props
  }
}

export default connect(mapStateToProps)(Character);