var airVisualSearch = 'http://api.airvisual.com/v2/nearest_city'
var airVisualKey = 'cM9MW8ehQLgrwsmqc'
var geolocationSearch = 'https://maps.googleapis.com/maps/api/geocode/json'
var geolocationKey = 'AIzaSyDORqhhYfrlbUmCv16-TTXPy5aznihPe5A'
var airVisualTemplate = '<div class="js-usAQI"></div>'
var airPollutionData
let map
// make a single object with different key
var AQIscale = {
	category: ['0 to 50','51 to 100','101 to 150','151 to 200','201 to 300','301 to 500'],
	classification: ['good','moderate','unhealthy for sensitive groups','unhealthy','very unhealthy','hazardous'],
	color: ['green','yellow','orange','red','purple','maroon'],
	// min value and max value of range
	// loop through the object and find which number it is bigger than
	// var AQIscale = [ { caregory: '0 to 50', range: 0, color: 'green'}, { ... } ]
	range: [50,100,150,200,300,500],
}

var locationDetails = function getGeoFromAPI(searchAddress) {
	let settings = {
		url: geolocationSearch,
		data: {
			key: geolocationKey,
			address: searchAddress,
		},
		dataType: 'json',
		type: 'GET',
		async: false,
		success: function(data){
			geoLatitude = data.results[0].geometry.location.lat
			console.log(geoLatitude)
			geoLongitude = data.results[0].geometry.location.lng
			airPollution(airVisualTemplate,AQIscale,geoLongitude,geoLatitude)
			initMap(geoLongitude,geoLatitude)
		},
		};
	$.ajax(settings)
}

var airPollution = function getDataFromAPI(airVisualTemplate,AQIscale,geoLongitude,geoLatitude) {
	let settings = {
		url: airVisualSearch,
		data: {
			key: airVisualKey,
			lat: geoLatitude,
			lon: geoLongitude,
		},
		dataType: 'json',
		async: true,
		type: 'GET',
		success: function(returnedData,airVisualTemplate){
			let usAQI = returnedData.data.current.pollution.aqius;
			let windData = returnedData.data.current.weather;
			// let results = $(airVisualTemplate).find('.js-usAQI').text(returnedData.data.current.pollution.aqius)
			// component in angular/react - framework
			$('.js-city-results div').eq(0).text('US AQI is: ' + usAQI)
			let airIndex = findAirQualityClass(usAQI,AQIscale)
			$('.js-city-results div').eq(1).text('The nearest city is: ' + returnedData.data.city)
			let timestamp = returnedData.data.current.pollution.ts;
			let convertedTime = moment(timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")
			$('.js-city-results div').eq(2).text('Data collection time is: ' + convertedTime)
			$('.js-city-results div').eq(3).text('The air quality is: ' + AQIscale.classification[airIndex])
			$('.js-city-results').css('background-color',AQIscale.color[airIndex])
			$('.js-city-results div').eq(4).text('The wind speed is: ' + windData.ws + ' m/s')
			windArrow(windData.wd,map,geoLatitude,geoLongitude)
		},
		};
	$.ajax(settings)
}

function findAirQualityClass(usAQI,AQIscale) {
	let roundedNum = Math.ceil(usAQI/50)*50
	let airClass = AQIscale.range.findIndex(function(element){
		return element == roundedNum
	})
	return airClass
}

// function in maps to rectangle/polygon add
function getInitialPosition() {

	$('#error-message').text("Loading the air statistics in your location...")

	function success(position){
		let geoLatitude = position.coords.latitude;
		let geoLongitude = position.coords.longitude;
		$('#error-message').text(" ")
		console.log(geoLongitude,geoLatitude)
		initMap(geoLongitude,geoLatitude)
		airPollution(airVisualTemplate,AQIscale,geoLongitude,geoLatitude)
	}

	function error(){
		console.log("an error has occurred")
	}

	navigator.geolocation.getCurrentPosition(success,error);
}

// calling map with variable parameters
function initMap(geoLongitude,geoLatitude) {
	let LatLng = {lat: geoLatitude, lng: geoLongitude}
    map = new google.maps.Map(document.getElementById('map'), {
          center: LatLng,
          zoom: 8
    });

    let marker = new google.maps.Marker({
    	position: LatLng,
    	map: map,
    	title: 'Your location!',
    	draggable: true,
    	animation: google.maps.Animation.DROP
  });

    // definition of function not result of function
    // passing the function NOT calling the function
    // the same for all listeners
	    marker.addListener('click', toggleBounce)

	function toggleBounce() {
	  if (marker.getAnimation() !== null) {
	    marker.setAnimation(null);
	  } 
	  else {
	    marker.setAnimation(google.maps.Animation.BOUNCE);
	  }
	}
}

function windArrow(windDirection,map,geoLatitude,geoLongitude){
	let scale = 1
	let changeLat = scale*Math.sin(windDirection*(Math.PI/180))
	let changeLong = scale*Math.cos(windDirection*(Math.PI/180))

	let lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        };

    // Create the polyline and add the symbol via the 'icons' property.
    let line = new google.maps.Polyline({
    	// path: [{lat: geoLatitude, lng: geoLongitude}, {lat:  52.5003095, lng:  -0.07530440000000002}],
          path: [{lat: geoLatitude, lng: geoLongitude}, {lat: geoLatitude + changeLat, lng: geoLongitude + changeLong}],
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
        });

    line.setMap(map)
      }

// function to handle API query results
function handleQueryResponse(data,airVisualTemplate) {
	let results = $(airVisualTemplate).find('.js-usAQI').text(data.pollution.aqius)
	$('.js-city-results').html(results)
}

function watchSubmit() {
	$('.js-query').submit(function(event){
		event.preventDefault()
			$('#error-message').html('')
		let queryTarget = $(this).find('#js-query-search')
		let query = queryTarget.val()
		if (query=='') {
			$('#error-message').html('<h1>Enter a city you would like to explore!</h1>')
		}
		queryTarget.val('')
		locationDetails(query)
		$('.js-search-continue').toggleClass('hidden')
		let now = moment();
		console.log(now)
	})
}

$(getInitialPosition);
$(watchSubmit);

// points on map --> direct location or area (add a few points)
// graph

// get position of a click in the map --> events in google map
// distinguish movement and event click