import React from 'react';
import { connect } from 'dva';
import window from '../window/window';

function Basic() {
  return (<div>
        basic
    </div>)
}

export default connect()(window({ title: 'basic', closable: false })(Basic));