import { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import Window from '../window/window';
import Attribute from '../../label/attribute/attribute';
import style from './character.less';
import { is } from 'immutable';

class Character extends Component {

	componentDidMount = () => {
		const { dispatch } = this.props;

		dispatch({
			type: 'character/fetch',
		})
	}

	shouldComponentUpdate = (nextProps) => {
		const { window, attributes } = this.props;
		return !is(window, nextProps.window) || !is(attributes, nextProps.attributes);
	}


	render = () => {
		const { attributes, window, name } = this.props;

		const basicAttributes = attributes.get('basic').reduce((result, value, attribute) => {
			result.push(<Attribute key={'attribute' + result.length} attribute={attribute} value={value} />)
			return result;
		}, [])

		const powerAttributes = attributes.get('power').reduce((result,value,attribute)=>{
			result.push(<Attribute key={'attribute' + result.length} attribute={attribute} value={value} />)
			return result;
		},[])

		const advancedAttributes = attributes.get('advanced').reduce((result, value, attribute) => {
			result.push(<Attribute key={'attribute' + result.length} attribute={attribute} value={value} />)
			return result;
		},[])

		return (
			<Window title={name} id={1} position={{ x: 90, y: 90 }} window={window}
				nameToClose='character'>
				<div className={style.attributes}>
					<div className={style.basicAttributes}>
						<div className={style.subTitle}>
							基础属性
						</div>
						{basicAttributes}
					</div>
					<div className={style.powerAttributes}>
						<div className={style.subTitle}>
							念能属性
						</div>
						{powerAttributes}
					</div>
					<div className={style.advancedAttributes}>
						<div className={style.subTitle}>
							进阶属性
						</div>
						{advancedAttributes}
					</div>


				</div>
				
			</Window>)
	}
}

const mapStateToProps = (state, props) => {

	return {
		window: state.game.getIn(['windows', 'character']),
		name: state.character.get('name'),
		id: state.character.get('id'),
		attributes: state.character.get('current'),
		...props
	}
}

export default connect(mapStateToProps)(Character);