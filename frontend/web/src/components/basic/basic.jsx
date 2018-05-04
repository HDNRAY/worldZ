import React from 'react';
import { connect } from 'dva';
import window from '../window/window';


class Basic extends React.Component{
    render(){
        return (<div>
            basic
        </div>)
    }
}

const windowParams = { 
    title: 'basic', 
}

export default connect(({state,props})=>{
    return {
        ...props
    }
})(window(windowParams)(Basic));