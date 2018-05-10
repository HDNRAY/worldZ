import React from 'react';
import { connect } from 'dva';
import Window from '../window/window';
import Character from '../../label/character/character';
import { Breadcrumb } from 'antd';
import style from './map.less';
const { Item } = Breadcrumb;


class MapWindow extends React.Component {

	render = () => {
		const { dispatch, window, currentMaps } = this.props;
		// console.log(currentMaps)

		return (
			<Window title='地图'
				{...window}
				style={{ width: '600px', height: '400px' }}
				onClose={() => dispatch({
					type: 'game/switchWindow',
					payload: {
						name: 'map'
					}
				})}>

					{!!currentMaps ? (<div>
							<Breadcrumb>
								{currentMaps.map((item,index) => {
									return (
										<Item key={item.name + index}><span onClick={()=>{
											dispatch({
												type:'map/change',
												payload:{
													map:item
												}
											})
										}}>{item.name}</span></Item>
									)
								})}
							</Breadcrumb>
							<div>
								{currentMaps[currentMaps.length - 1].children.map((item,index)=>{
									return (<div key={item.name + index} onClick={()=>dispatch({
											type:'map/change',
											payload:{
												map:item
											}
										})}>{item.name}</div>)
								})}
								{currentMaps[currentMaps.length - 1].npcs.map((item,index)=>{
									return (<Character key={item.name + index} {...item}/>)
								})}
							</div>
						</div>
						) :<div></div>}




			</Window>)
	}
}


const mapStateToProps = (state, props) => {
	return {
		window: state.game.get('windows').toJS().map,
		currentMaps: state.map.currentMaps,
		...props
	}
}

export default connect(mapStateToProps)(MapWindow);