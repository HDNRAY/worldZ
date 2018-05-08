import { Component } from 'react';
import { connect } from 'dva';
import Proptypes from 'prop-types';
import style from './character.less';
import Operations from '../../shared/operations/operations';
import Tips from '../../shared/tips/tips';
import Clickable from '../../shared/clickable/clickable';

class Character extends Component {
	render() {
		const { data, dispatch } = this.props;

		const name = data.name;

		const actions = [{
			name: '切磋',
			action: () => dispatch({
				type: 'information/add',
				payload: {
					content: '切磋中(敬请期待)'
				}
			})
		}, {
			name: '决斗',
			confirm: '至死方休？',
			action: () => dispatch({
				type: 'information/add',
				payload: {
					content: '决斗中(敬请期待)'
				}
			})

		}, {
			name: '交易',
			action: () => dispatch({
				type: 'information/add',
				payload: {
					content: '交易也在做'
				}
			})

		}]

		const tips = (<div className={style.tips}>
            <div className={style.name}>{data.name}</div>
            <div className={style.description}>
                独臂长衫，背负一把通体深黑的大剑
            </div>
        </div>)

		return (
			<Operations operations={actions}>
                <Tips content={tips}>
                    <Clickable text={name} className={style.label} />
                </Tips>
            </Operations>
		)
	}
}


Character.propTypes = {
	data: Proptypes.object.isRequired
}

const mapStateToProps = (state, props) => {
	return {
		...props
	}
}

export default connect(mapStateToProps)(Character);