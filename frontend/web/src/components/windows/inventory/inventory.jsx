import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import Gear from '../../label/gear/gear';
import Spendable from '../../label/spendable/spendable';


class Inventory extends Component {
	render = () => {
		const { dispatch } = this.props;

		return (<Window title='包裹' onClose={() => {
            dispatch({
                type: 'game/switchInventory'
            })
        }}>
            <Spendable data={{name:'面包',quantity:5,quality:'normal'}} />
            <Gear data={{ name: '光之剑',quality:'legend' }} />
        </Window>)
	}
}

const mapStateToProps = (state, props) => {
	return {
		...props
	}
}

export default connect(mapStateToProps)(Inventory);