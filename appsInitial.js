var airVisualSearch = 'http://api.airvisual.com/v2/nearest_city'
var airVisualKey = 'cM9MW8ehQLgrwsmqc'
var geolocationSearch = 'https://maps.googleapis.com/maps/api/geocode/json'
var geolocationKey = 'AIzaSyDORqhhYfrlbUmCv16-TTXPy5aznihPe5A'
var airVisualTemplate = '<div class="js-usAQI"></div>'
var airPollutionData
var AQIscale = {
	category: ['0 to 50','51 to 100','101 to 150','151 to 200','201 to 300','301 to 500'],
	classification: ['good','moderate','unhealthy for sensitive groups','unhealthy','very unhealthy','hazardous'],
	color: ['green','yellow','orange','red','purple','maroon'],
	range: [0,50,100,150,200,300,500],
}

// how to convert time stamp into an actual time?
// add a color coding for AQI value

// connect to map ex ggoogle map 
// test if case sensitive, cases, trailling space, etc...
// Lodash library ex key in a nested object
// function to get data from API
// compiles inputs and makes request to the specific URL
// var airPollution = function getDataFromAPI(searchLocation,airVisualTemplate,AQIscale) {
// 	let settings = {
// 		url: airVisualSearch,
// 		data: {
// 			key: airVisualKey,
// 			city: searchLocation,
// 			state: 'California',
// 			country: 'USA',
// 		},
// 		dataType: 'json',
// 		type: 'GET',
// 		success: function(returnedData,airVisualTemplate){
// 			let usAQI = returnedData.data.current.pollution.aqius;
// 			// let results = $(airVisualTemplate).find('.js-usAQI').text(returnedData.data.current.pollution.aqius)
// 			$('.js-city-results div').eq(0).text('US AQI is: ' + usAQI)
// 			let airIndex = findAirQualityClass(usAQI,AQIscale)
// 			$('.js-city-results div').eq(2).text('The air quality is: ' + AQIscale.classification[airIndex])
// 			$('.js-city-results div').eq(2).css('background-color',AQIscale.color[airIndex])
// 		},
// 		};
// 	$.ajax(settings)
// }

var locationDetails = function getGeoFromAPI(searchAddress) {
	let settings = {
		url: geolocationSearch,
		data: {
			key: geolocationKey,
			address: searchAddress,
		},
		dataType: 'json',
		type: 'GET',
		success: function(data){
			geoLatitude = data.results[0].geometry.location.lat
			geoLongitude = data.results[0].geometry.location.long
			airPollution(airVisualTemplate,AQIscale,geoLongitude,geoLatitude)
		},
		};
	$.ajax(settings)
}

var airPollution = function getDataFromAPI(airVisualTemplate,AQIscale,geoLongitude,geoLatitude) {
	let settings = {
		url: airVisualSearch,
		data: {
			key: airVisualKey,
			lat: locationDetails[1],
			long: locationDetails[0],
		},
		dataType: 'json',
		type: 'GET',
		success: function(returnedData,airVisualTemplate){
			let usAQI = returnedData.data.current.pollution.aqius;
			// let results = $(airVisualTemplate).find('.js-usAQI').text(returnedData.data.current.pollution.aqius)
			$('.js-city-results div').eq(0).text('US AQI is: ' + usAQI)
			let airIndex = findAirQualityClass(usAQI,AQIscale)
			$('.js-city-results div').eq(2).text('The air quality is: ' + AQIscale.classification[airIndex])
			$('.js-city-results div').eq(2).css('background-color',AQIscale.color[airIndex])
		},
		};
	$.ajax(settings)
}

function findAirQualityClass(usAQI,AQIscale) {
	let roundedNum = Math.ceil(usAQI/50)*50
	let airClass = AQIscale.range.findIndex(function(element,roundedNum){
		return element = roundedNum
	})
	return airClass
}

// function to handle API query results
function handleQueryResponse(data,airVisualTemplate) {
	let results = $(airVisualTemplate).find('.js-usAQI').text(data.pollution.aqius)
	$('.js-city-results').html(results)
}

// function to render results
// function renderResult(result) {
// 	let template = $(airVisualTemplate)
// 	template.find('.js-usAQI').text(result.pollution.aqius)
// 	return template
// }

// function that watches for submit of the city input query
// function watchSubmit() {
// 	$('.js-query').submit(function(event){
// 		event.preventDefault()
// 			$('#error-message').html('')
// 		let queryTarget = $(this).find('#js-query-search')
// 		let query = queryTarget.val()
// 		if (query=='') {
// 			$('#error-message').html('<h1>Enter a city you would like to explore!</h1>')
// 		}
// 		queryTarget.val('')
// 		airPollution(query,airVisualTemplate,AQIscale)
// 		$('.js-search-continue').toggleClass('hidden')
// 	})
// }

function watchSubmit2() {
	$('.js-query2').submit(function(event){
		event.preventDefault()
			$('#error-message').html('')
		let queryTarget = $(this).find('#js-query-search2')
		let query = queryTarget.val()
		if (query=='') {
			$('#error-message').html('<h1>Enter a city you would like to explore!</h1>')
		}
		queryTarget.val('')
		locationDetails(query)
		$('.js-search-continue').toggleClass('hidden')
	})
}

// $(watchSubmit);
$(watchSubmit2);