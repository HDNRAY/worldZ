import React, { PureComponent } from 'react'
import { connect } from 'dva'


class CharacterCreate extends PureComponent {

    render = () => {
        return (<div></div>);
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(CharacterCreate);