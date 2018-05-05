import React from 'react';
import { connect } from 'dva';
import Proptypes from 'prop-types';
import style from './clickable.less';


class Clickable extends React.Component {
    render() {
        const { onClick, text } = this.props;

        return (<div onClick={onClick} className={style.clickable}>
            {text}
        </div>)
    }
}

Clickable.propTypes = {
    onClick: Proptypes.func,
    text: Proptypes.string
}

const mapStateToProps = ({state,props})=>{
    return {
        ...props
    }
}


export default connect(mapStateToProps)(Clickable);