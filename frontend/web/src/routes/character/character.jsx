import React, { PureComponent } from 'react'
import { Route, Switch, Redirect } from 'dva/router'
import { connect } from 'dva'
import CharacterSelect from './characterSelect/characterSelect'
import CharacterCreate from './characterCreate/characterCreate'

import { CHARACTER_SELECT, CHARACTER_CREATE } from '../routes'

class Character extends PureComponent {

    render = () => {
        return (
            <Switch>
                <Route path={CHARACTER_SELECT} exact component={CharacterSelect} />
                <Route path={CHARACTER_CREATE} exact component={CharacterCreate} />
                <Redirect to={CHARACTER_SELECT} />
            </Switch>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(Character);