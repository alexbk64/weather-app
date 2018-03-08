// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
import refresh from '../../assets/icons/refresh.png';
import sbarImg from '../../assets/icons/sidebar.png';
import widImg from '../../assets/icons/weather_icons/snowy_copy.png';
import sunset from '../../assets/icons/weather_icons/sunset.png';
import sunrise from '../../assets/icons/weather_icons/sunrise.png';
import humidity from '../../assets/icons/weather_icons/humidity.png';
import windChill from '../../assets/icons/weather_icons/wind_chill.png';
//import back from '../../assets/icons/back.png';
// import jquery for API calls
import $ from 'jquery';

export default class Iphone extends Component {
//var Iphone = React.createClass({



	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		this.state.temp = "";
		this.state.date = new Date();
		// menu display state
		this.setState({ display: false });
	}

	//this method is called when an instance of a component is being created and inserted into the DOM
	componentWillMount() {
		this.fetchWeatherData();
	}
	sidebarShow = () =>{
		this.setState({display: true});
	}
	sidebarHide = () =>{
		this.setState({display: false});
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var snowReportUrl = "http://api.weatherunlocked.com/api/snowreport/54883461?app_id=3962eedb&app_key=fda3e707923d6caa68bd2cba54a400f3";
		var resortForecastUrl = "http://api.weatherunlocked.com/api/resortforecast/54883461?app_id=3962eedb&app_key=fda3e707923d6caa68bd2cba54a400f3"
		var astronomyInfUrl = "http://api.wunderground.com/api/221d2d3d52cb8a39/astronomy/q/Finland/Levi.json"

		$.ajax({
			url: resortForecastUrl,
			success : this.parseResortForecast,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		$.ajax({
			url: snowReportUrl,
			success : this.parseSnowReport,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		$.ajax({
			url: astronomyInfUrl,
			success : this.parseAstronomyInformation,
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
						<img src={sbarImg} class={ style.options } onClick={ this.sidebarShow }/>
						<p>{this.state.locate}</p>
						<img src={refresh} class={ style.refresh } onClick={ this.fetchWeatherData }  />
					</div>
			{this.state.display? <div class={style.sidemenu} style={{display: this.state.display}}>
							<div class={style.sm_topbar}>
								<div class={ style.sm_appName }>
									<u><h3>WeSki</h3></u>
									</div>
									//<img src={ back } onClick={ this.sidebarHide }/>
							</div>
							<hr/>
							<div class={style.sboption}>
								<h4>Weather Forecast</h4>
							</div>
							<div class={style.sboption}>
								<h4>Base Details</h4>
							</div>
							<div class={style.sboption}>
								<h4>Summit Details</h4>
							</div>
							<div class={style.sboption}>
								<h4>Settings</h4>
							</div>
						</div>
					: null}

					<div class={style.appName}>
					<h3>WeSki</h3>
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
									Feels like {this.state.feels_like}<sup>o</sup>
									</div>
									</div>
								<div class={style.twm}>
									<img src={ widImg }/>
								</div>
								<div class={style.twb}>
									<div class={style.data1}> { this.state.description }</div>
									<hr/>
									<div class={style.data2}>

									</div>
								</div>
							</div>
							<div class={style.middle_widget }>
							<div class={style.date}>
							{this.state.date.toLocaleDateString()}
							</div>
							<Clock />
							<div class={style.date}>
							{this.state.daysOfWeek[this.state.date.getDay()]}
							</div>
							</div>
							<hr/>
							<div class={style.bottom_widget }>
								<div class={style.bwi}>
								<img src={humidity}/>
								<div>{this.state.humidity}%</div>
								</div>
								<div class={style.bwi}>
								<img src={windChill}/>
								<div>{this.state.wind}<sup>km/h</sup></div>
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
							<h4>Amount of precipitation</h4>
							</div>
							<hr class={style.body_info_2}/>
							<div class={style.body_info_3}>
							<h4>{this.state.precipitations}mm</h4>
							</div>
							</div>
							<div class={style.body_info}>
							<div class={style.body_info_1}>
							<h4>Snow Depth</h4>
							</div>
							<hr class={style.body_info_2}/>
							<div class={style.body_info_3}>
							<h4>{this.state.lowersnow}cm</h4>
							</div>
							</div>
							<div class={style.body_info}>
							<div class={style.body_info_1}>
							<h4>Recent Snowfall</h4>
							</div>
							<hr class={style.body_info_2}/>
							<div class={style.body_info_3}>
							<h4>{this.state.newsnow}cm</h4>
							</div>
							</div>
							<div class={style.body_info}>
							<div class={style.body_info_1}>
							<h4>Ski conditions</h4>
							</div>
							<hr class={style.body_info_2}/>
							<div class={style.body_info_3}>
							<h6>{this.state.conditions}</h6>
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
						{}
							{this.state.hourly_temp}

						</div>
					</div>

			</div>
		);
	}

	parseResortForecast = (parsed_json) => {

		var location = parsed_json['name'];
		var temp_c = parsed_json['forecast'][0]['base']['temp_c'];
		var feels_like = parsed_json['forecast'][0]['base']['feelslike_c'];
		var relative_humidity = parsed_json['forecast'][0]['hum_pct'];
		var wind_speed = parsed_json['forecast'][0]['base']['windspd_kmh'];
		var description = parsed_json['forecast'][0]['base']['wx_desc'];
		var precipitations_mm = parsed_json['forecast'][0]['precip_mm'];
		var hourly_forecast = [];


		for(var i = 0; i < 6; i++) {
			var forecast = {
				icon: parsed_json['forecast'][i+1]['base']['wx_icon'],
				hour: parsed_json['forecast'][i+1]['time'],
				temp: parsed_json['forecast'][i+1]['base']['temp_c']
			}
			hourly_forecast.push(forecast);
		}

		var hourly_temp_html = hourly_forecast.map(function(data) {
			var src = "../../assets/icons/" + data.icon;
			return (
				<div class={style.footer_info}>

					<img src={src} />
					{data.hour}
					<br/>{data.temp}
				</div>
			)
		})


		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			feels_like: feels_like,
			humidity: relative_humidity,
			wind: wind_speed,
			hourly_temp: hourly_temp_html,
			description: description,
			precipitations: precipitations_mm
		});

	}


	parseSnowReport = (parsed_json) => {
		var conditions = parsed_json['conditions'];
		var lowersnow_cm = parsed_json['lowersnow_cm'];
		var newsnow_cm = parsed_json['newsnow_cm'];

		this.setState({
			conditions: conditions,
			lowersnow: lowersnow_cm,
			newsnow: newsnow_cm
		})
	}

	parseAstronomyInformation = (parsed_json) => {
		var sunrise = parsed_json['sun_phase']['sunrise']['hour'] + ":" + parsed_json['sun_phase']['sunrise']['minute'];
		var sunset = parsed_json['sun_phase']['sunset']['hour'] + ":" + parsed_json['sun_phase']['sunset']['minute'];

		this.setState({
			sunrise: sunrise,
			sunset: sunset
		})
	}



}


class Clock extends Component {
		constructor(props) {
			super(props);
			this.state = {date: new Date()};
		}

		componentDidMount() {
			this.timerID = setInterval(
				() => this.tick(),
				1000
			)
		}

		componentWillUnmount() {
			clearInterval(this.timerID);
		}

		tick() {
			this.setState({
				date: new Date()
			});
		}

		render() {
			return (
				<div class={style.time}>
					{this.state.date.toLocaleTimeString('en-GB', { hour: "numeric",
																			 minute: "numeric"})}
				</div>
			)
		}
}
