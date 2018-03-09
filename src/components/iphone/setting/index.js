// import preact
import { h, render, Component } from 'preact';
import style from './style';
import back from '../../../assets/icons/back.png';

export default class Setting extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
	}

	// the main render method for the iphone component
	render({clickFunction}) {
			if(!clickFunction){
				clickFunction = () => {
					console.log("passed something as 'clickFunction' that wasn't a function !");
				}
			}
		return (
			// ENTER THE HTML CODE HERE !
			<div class={ style.setting } >

				<div class={ style.header }>
					<img src={back} onClick={ clickFunction }/>
					<h2><u>Setting</u></h2>
				</div>

				<div class={style.body}>
					<div class={style.body_info}>
					<h4>Automatic refresh</h4>
					</div>
					<div class={style.body_info}>
					<h4>Type of Skier</h4>
					<select class={style.unit}>
						<option>Freestyle skiing</option>
						<option>option 2</option>
						<option>option 3</option>
						<option>option 4</option>
						<option>option 5</option>
					</select>
					</div>
						<div class={style.body_info}>
							<h4>Unit of Temp</h4>
							<select class={style.unit}>
								<option>Celsius</option>
								<option>Fahrenheit</option>
							</select>
						</div>
						<div class={style.body_info}>
							<h4>Unit of Depth</h4>
							<div class={style.rightinfo}>
							<select class={style.unit}>
								<option>inches</option>
								<option>meters</option>
							</select>
							</div>
						</div>
						<div class={style.body_info}>
							<h4>Unit of Speed</h4>
							<select class={style.unit}>
								<option>kph</option>
								<option>mph</option>
							</select>
						</div>
						<div class={style.body_info}>
							<h4>Live background</h4>
						</div>
						<div class={style.body_info}>
							<h4>Allow push notifications</h4>
						</div>
						<div class={style.body_info}>
						</div>
				</div>

			</div>
		);
	}
}
