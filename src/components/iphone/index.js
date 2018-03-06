// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
import style_button from '../button_img/style_button';
import refresh from '../../assets/icons/refresh.png';
import sbarImg from '../../assets/icons/sidebar.png';
import appname from '../../assets/icons/app.png';
import dash from '../../assets/backgrounds/dashboard.png';
import widImg from '../../assets/icons/weather_icons/snowy_copy.png';
import sunset from '../../assets/icons/weather_icons/sunset.png';
import sunrise from '../../assets/icons/weather_icons/sunrise.png';
import humidity from '../../assets/icons/weather_icons/humidity.png';
import windChill from '../../assets/icons/weather_icons/wind_chill.png';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
//import Bmg from '../button_img';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
	}


	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/d828a5dff7d361e4/conditions/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	// the main render method for the iphone component
	render() {

		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		// display all weather data
		return (
			<div class={ style.container } >

					<div class={ style.header }>
						<img src={sbarImg} class={ style_button.sidebar }/>
						<p>{this.state.locate}</p>
						<img src={refresh} class={ style_button.refresh } onClick={ this.fetchWeatherData }/>
					</div>

					<div class={style.appName}>
					<h3>SkiWe</h3>
					</div>

					<div class={style.body}>
						<div class={style.rect}>
							<div class={style.top_widget }>
								<div class={style.twt}>
									<div class={style.data1}>
									{this.state.temp}<sup><sup>o</sup><u>C</u></sup>
									</div>
									<hr/>
									<div class={style.data2}>
									Feels like {this.state.feels}<sup>o</sup>
									</div>
									</div>
								<div class={style.twm}>
									<img src={ widImg }/>
								</div>
								<div class={style.twb}>
									<div class={style.data1}></div>
									<hr/>
									<div class={style.data2}></div>
								</div>
							</div>
							<div class={style.middle_widget }>
							<div class={style.date}>
							{this.state.date}
							</div>
							<div class={style.time}>
							{this.state.time}
							</div>
							<div class={style.date}>
							{this.state.day}
							</div>
							</div>
							<hr/>
							<div class={style.bottom_widget }>
								<div class={style.bwi}>
								<img src={humidity}/>
								<div>{this.state.humidity}</div>
								</div>
								<div class={style.bwi}>
								<img src={windChill}/>
								<div>{this.state.windchill}<sup>o</sup></div>
								</div>
								<div class={style.bwc}>
								</div>
								<div class={style.bwi}>
								<img src={sunrise}/>
								<div>{this.state.sunrise}</div>
								</div>
								<div class={style.bwi}>
								<img src={sunset}/>
								<div>{this.state.sunset}</div>
								</div>
							</div>
						</div>
						<div class={style.semi}>
						</div>
						<div class={style.body_details}>
							<div class={style.body_info}>
							<div class={style.body_info_1}>
							<h4>Chances of rain/snow</h4>
							</div>
							<hr class={style.body_info_2}/>
							<div class={style.body_info_3}>
							<h4>{this.state.cond}</h4>
							</div>
							</div>
							<div class={style.body_info}>
							<div class={style.body_info_1}>
							<h4>Snow Depth</h4>
							</div>
							<hr class={style.body_info_2}/>
							<div class={style.body_info_3}>
							<h4>{this.state.cond}</h4>
							</div>
							</div>
							<div class={style.body_info}>
							<div class={style.body_info_1}>
							<h4>Recent Snowfall</h4>
							</div>
							<hr class={style.body_info_2}/>
							<div class={style.body_info_3}>
							<h4>{this.state.cond}</h4>
							</div>
							</div>
							<div class={style.body_info}>
							<div class={style.body_info_1}>
							<h4>Ski conditions</h4>
							</div>
							<hr class={style.body_info_2}/>
							<div class={style.body_info_3}>
							<h4>{this.state.cond}</h4>
							</div>
							</div>
							<div class={style.body_info}>
							<div class={style.body_info_1}>
							<h4>Type of snow</h4>
							</div>
							<hr class={style.body_info_2}/>
							<div class={style.body_info_3}>
							<h4>{this.state.cond}</h4>
							</div>
							</div>
						</div>
					</div>

					<div class={ style.footer }>
						<div class={style.footer_head}>
							<h3 class={style.footer_hour}>Hour</h3>
							<hr class={style.dh}/>
							<h3 class={style.footer_day}>Day</h3>
						</div>
						<div class={style.footer_details}>
							<div class={style.footer_info}>
							1
							</div>
							<div class={style.footer_info}>
							2
							</div>
							<div class={style.footer_info}>
							3
							</div>
							<div class={style.footer_info}>
							4
							</div>
							<div class={style.footer_info}>
							5
							</div>
							<div class={style.footer_info}>
							6
							</div>
						</div>
					</div>

			</div>
		);
	}
	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['full'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];
		var humid = parsed_json['current_observation']['relative_humidity'];
		var wind_c = parsed_json['current_observation']['windchill_c'];
		var sunrise = parsed_json['current_observation']['local_tz_short'];
		var senset = parsed_json['current_observation']['local_tz_short'];
		var d = parsed_json['current_observation']['local_time_rfc822'];
		var feel = parsed_json['current_observation']['feelslike_c'];

		var day=d.substring(0,3);
		var date=d.substring(5,16);
		var time=d.substring(17,22);

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			humidity : humid,
			windchill : wind_c,
			sunrise : sunrise,
			sunset : senset,
			day: day,
			date: date,
			time: time,
			feels: feel
		});
	}
}
