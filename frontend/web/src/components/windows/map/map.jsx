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
		console.log(currentMaps)


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
								{currentMaps.map((item) => {
									return (
										<Item><span onClick={()=>{
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
								{currentMaps[currentMaps.length - 1].children.map((item)=>{
									return (<div onClick={()=>dispatch({
											type:'map/change',
											payload:{
												map:item
											}
										})}>{item.name}</div>)
								})}
								{currentMaps[currentMaps.length - 1].npcs.map((item)=>{
									return (<Character {...item}/>)
								})}
							</div>
						</div>
						) :<div></div>}




			</Window>)
	}
}


const mapStateToProps = (state, props) => {
	return {
		window: state.game.get('windows').toJSON().map,
		currentMaps: state.map.currentMaps,
		...props
	}
}

export default connect(mapStateToProps)(MapWindow);