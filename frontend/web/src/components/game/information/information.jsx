import { Component } from 'react';
import { connect } from 'dva';
// import Clickable from '../../shared/clickable/clickable';
// import Character from '../../label/character/character';
import { logTypes } from './constant'
import style from './information.less';


class Information extends Component {
	render = () => {
		const { logs } = this.props;

		const display = logs.map(({ content, type = logTypes.INFO }, index) => {
			return (<div key={index} style={{ color: type.color }}>
				{content}
			</div>)
		})

		return (<div className={style.logs}>
			{display}
		</div>)
	}
}


const mapStateToProps = (state, props) => {
	return {
		logs: state.information.logs,
		...props
	}
}

export default connect(mapStateToProps)(Information);