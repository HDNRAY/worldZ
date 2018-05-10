import { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import style from './character.less';
import Operations from '../../shared/operations/operations';
import Tips from '../../shared/tips/tips';
import Clickable from '../../shared/clickable/clickable';

class Character extends Component {
	info = (payload) => {
		this.props.dispatch({
			type: 'information/add',
			payload: payload
		})
	}

	render() {
		const { name, description } = this.props;

		const actions = [{
			name: '切磋',
			action: () => this.info({
				content: '切磋中(敬请期待)'
			})
		}, {
			name: '决斗',
			confirm: '至死方休？',
			action: () => this.info({
				content: '决斗中(敬请期待)'
			})
		}, {
			name: '交易',
			action: () => this.info({
				content: '交易也在做'
			})
		}]

		const tips = (<div className={style.tips}>
            <div className={style.name}>{name}</div>
            <div className={style.description}>
                {description}
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
	name: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => {
	return {
		...props
	}
}

export default connect(mapStateToProps)(Character);