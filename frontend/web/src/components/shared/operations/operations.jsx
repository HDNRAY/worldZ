import React from 'react';
import PropTypes from 'prop-types';
// import style from './operations.less';
import { connect } from 'dva';


class Operations extends React.Component {

    render = () => {
        const { children, operations, dispatch } = this.props;

        const onClick = (e) => {
            dispatch({
                type: 'menu/show',
                payload: {
                    operations,
                    position: {
                        x: e.clientX,
                        y: e.clientY
                    }
                }
            })
        }

        return React.cloneElement(children, {
            onClick: onClick
        })
    }
}


Operations.propTypes = {
    children: PropTypes.element.isRequired,
    operations: PropTypes.array.isRequired
}

const mapStateToProps = (state, props) => {
    return {
        ...props
    }
}


export default connect(mapStateToProps)(Operations);