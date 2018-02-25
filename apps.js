var airVisualSearch = 'http://api.airvisual.com/v2/nearest_city'
var airVisualKey = 'cM9MW8ehQLgrwsmqc'
var geolocationSearch = 'https://maps.googleapis.com/maps/api/geocode/json'
var geolocationKey = 'AIzaSyDORqhhYfrlbUmCv16-TTXPy5aznihPe5A'
var worldBankURL1 = 'http://api.worldbank.org/v2/countries/'
var worldBankURL2 = '/indicators/EN.ATM.GHGT.KT.CE?date=1970:2010&frequency=Y&format=json'
var airVisualTemplate = '<div class="js-usAQI"></div>'
var airPollutionData
var countrycode = [{"Afghanistan": {"code": "AF"}, "Åland Islands": {"code": "AX"}, "Albania": {"code": "AL"}, "Algeria": {"code": "DZ"}, "American Samoa": {"code": "AS"}, "Andorra": {"code": "AD"}, "Angola": {"code": "AO"}, "Anguilla": {"code": "AI"}, "Antarctica": {"code": "AQ"}, "Antigua and Barbuda": {"code": "AG"}, "Argentina": {"code": "AR"}, "Armenia": {"code": "AM"}, "Aruba": {"code": "AW"}, "Australia": {"code": "AU"}, "Austria": {"code": "AT"}, "Azerbaijan": {"code": "AZ"}, "Bahamas": {"code": "BS"}, "Bahrain": {"code": "BH"}, "Bangladesh": {"code": "BD"}, "Barbados": {"code": "BB"}, "Belarus": {"code": "BY"}, "Belgium": {"code": "BE"}, "Belize": {"code": "BZ"}, "Benin": {"code": "BJ"}, "Bermuda": {"code": "BM"}, "Bhutan": {"code": "BT"}, "Bolivia": {"code": "BO"}, "Bosnia and Herzegovina": {"code": "BA"}, "Botswana": {"code": "BW"}, "Bouvet Island": {"code": "BV"}, "Brazil": {"code": "BR"}, "British Indian Ocean Territory": {"code": "IO"}, "Brunei Darussalam": {"code": "BN"}, "Bulgaria": {"code": "BG"}, "Burkina Faso": {"code": "BF"}, "Burundi": {"code": "BI"}, "Cambodia": {"code": "KH"}, "Cameroon": {"code": "CM"}, "Canada": {"code": "CA"}, "Cape Verde": {"code": "CV"}, "Cayman Islands": {"code": "KY"}, "Central African Republic": {"code": "CF"}, "Chad": {"code": "TD"}, "Chile": {"code": "CL"}, "China": {"code": "CN"}, "Christmas Island": {"code": "CX"}, "Cocos (Keeling) Islands": {"code": "CC"}, "Colombia": {"code": "CO"}, "Comoros": {"code": "KM"}, "Congo": {"code": "CG"}, "Congo, The Democratic Republic of the": {"code": "CD"}, "Cook Islands": {"code": "CK"}, "Costa Rica": {"code": "CR"}, "Cote D\'Ivoire": {"code": "CI"}, "Croatia": {"code": "HR"}, "Cuba": {"code": "CU"}, "Cyprus": {"code": "CY"}, "Czech Republic": {"code": "CZ"}, "Denmark": {"code": "DK"}, "Djibouti": {"code": "DJ"}, "Dominica": {"code": "DM"}, "Dominican Republic": {"code": "DO"}, "Ecuador": {"code": "EC"}, "Egypt": {"code": "EG"}, "El Salvador": {"code": "SV"}, "Equatorial Guinea": {"code": "GQ"}, "Eritrea": {"code": "ER"}, "Estonia": {"code": "EE"}, "Ethiopia": {"code": "ET"}, "Falkland Islands (Malvinas)": {"code": "FK"}, "Faroe Islands": {"code": "FO"}, "Fiji": {"code": "FJ"}, "Finland": {"code": "FI"}, "France": {"code": "FR"}, "French Guiana": {"code": "GF"}, "French Polynesia": {"code": "PF"}, "French Southern Territories": {"code": "TF"}, "Gabon": {"code": "GA"}, "Gambia": {"code": "GM"}, "Georgia": {"code": "GE"}, "Germany": {"code": "DE"}, "Ghana": {"code": "GH"}, "Gibraltar": {"code": "GI"}, "Greece": {"code": "GR"}, "Greenland": {"code": "GL"}, "Grenada": {"code": "GD"}, "Guadeloupe": {"code": "GP"}, "Guam": {"code": "GU"}, "Guatemala": {"code": "GT"}, "Guernsey": {"code": "GG"}, "Guinea": {"code": "GN"}, "Guinea-Bissau": {"code": "GW"}, "Guyana": {"code": "GY"}, "Haiti": {"code": "HT"}, "Heard Island and Mcdonald Islands": {"code": "HM"}, "Holy See (Vatican City State)": {"code": "VA"}, "Honduras": {"code": "HN"}, "Hong Kong": {"code": "HK"}, "Hungary": {"code": "HU"}, "Iceland": {"code": "IS"}, "India": {"code": "IN"}, "Indonesia": {"code": "ID"}, "Iran, Islamic Republic Of": {"code": "IR"}, "Iraq": {"code": "IQ"}, "Ireland": {"code": "IE"}, "Isle of Man": {"code": "IM"}, "Israel": {"code": "IL"}, "Italy": {"code": "IT"}, "Jamaica": {"code": "JM"}, "Japan": {"code": "JP"}, "Jersey": {"code": "JE"}, "Jordan": {"code": "JO"}, "Kazakhstan": {"code": "KZ"}, "Kenya": {"code": "KE"}, "Kiribati": {"code": "KI"}, "Democratic People's Republic of Korea": {"code": "KP"}, "Korea, Republic of": {"code": "KR"}, "Kosovo": {"code": "XK"}, "Kuwait": {"code": "KW"}, "Kyrgyzstan": {"code": "KG"}, "Lao People's Democratic Republic": {"code": "LA"}, "Latvia": {"code": "LV"}, "Lebanon": {"code": "LB"}, "Lesotho": {"code": "LS"}, "Liberia": {"code": "LR"}, "Libyan Arab Jamahiriya": {"code": "LY"}, "Liechtenstein": {"code": "LI"}, "Lithuania": {"code": "LT"}, "Luxembourg": {"code": "LU"}, "Macao": {"code": "MO"}, "Macedonia, The Former Yugoslav Republic of": {"code": "MK"}, "Madagascar": {"code": "MG"}, "Malawi": {"code": "MW"}, "Malaysia": {"code": "MY"}, "Maldives": {"code": "MV"}, "Mali": {"code": "ML"}, "Malta": {"code": "MT"}, "Marshall Islands": {"code": "MH"}, "Martinique": {"code": "MQ"}, "Mauritania": {"code": "MR"}, "Mauritius": {"code": "MU"}, "Mayotte": {"code": "YT"}, "Mexico": {"code": "MX"}, "Micronesia, Federated States of": {"code": "FM"}, "Moldova, Republic of": {"code": "MD"}, "Monaco": {"code": "MC"}, "Mongolia": {"code": "MN"}, "Montenegro": {"code": "ME"}, "Montserrat": {"code": "MS"}, "Morocco": {"code": "MA"}, "Mozambique": {"code": "MZ"}, "Myanmar": {"code": "MM"}, "Namibia": {"code": "NA"}, "Nauru": {"code": "NR"}, "Nepal": {"code": "NP"}, "Netherlands": {"code": "NL"}, "Netherlands Antilles": {"code": "AN"}, "New Caledonia": {"code": "NC"}, "New Zealand": {"code": "NZ"}, "Nicaragua": {"code": "NI"}, "Niger": {"code": "NE"}, "Nigeria": {"code": "NG"}, "Niue": {"code": "NU"}, "Norfolk Island": {"code": "NF"}, "Northern Mariana Islands": {"code": "MP"}, "Norway": {"code": "NO"}, "Oman": {"code": "OM"}, "Pakistan": {"code": "PK"}, "Palau": {"code": "PW"}, "Palestinian Territory, Occupied": {"code": "PS"}, "Panama": {"code": "PA"}, "Papua New Guinea": {"code": "PG"}, "Paraguay": {"code": "PY"}, "Peru": {"code": "PE"}, "Philippines": {"code": "PH"}, "Pitcairn": {"code": "PN"}, "Poland": {"code": "PL"}, "Portugal": {"code": "PT"}, "Puerto Rico": {"code": "PR"}, "Qatar": {"code": "QA"}, "Reunion": {"code": "RE"}, "Romania": {"code": "RO"}, "Russian Federation": {"code": "RU"}, "Rwanda": {"code": "RW"}, "Saint Helena": {"code": "SH"}, "Saint Kitts and Nevis": {"code": "KN"}, "Saint Lucia": {"code": "LC"}, "Saint Pierre and Miquelon": {"code": "PM"}, "Saint Vincent and the Grenadines": {"code": "VC"}, "Samoa": {"code": "WS"}, "San Marino": {"code": "SM"}, "Sao Tome and Principe": {"code": "ST"}, "Saudi Arabia": {"code": "SA"}, "Senegal": {"code": "SN"}, "Serbia": {"code": "RS"}, "Seychelles": {"code": "SC"}, "Sierra Leone": {"code": "SL"}, "Singapore": {"code": "SG"}, "Slovakia": {"code": "SK"}, "Slovenia": {"code": "SI"}, "Solomon Islands": {"code": "SB"}, "Somalia": {"code": "SO"}, "South Africa": {"code": "ZA"}, "South Georgia and the South Sandwich Islands": {"code": "GS"}, "Spain": {"code": "ES"}, "Sri Lanka": {"code": "LK"}, "Sudan": {"code": "SD"}, "Suriname": {"code": "SR"}, "Svalbard and Jan Mayen": {"code": "SJ"}, "Swaziland": {"code": "SZ"}, "Sweden": {"code": "SE"}, "Switzerland": {"code": "CH"}, "Syrian Arab Republic": {"code": "SY"}, "Taiwan": {"code": "TW"}, "Tajikistan": {"code": "TJ"}, "Tanzania, United Republic of": {"code": "TZ"}, "Thailand": {"code": "TH"}, "Timor-Leste": {"code": "TL"}, "Togo": {"code": "TG"}, "Tokelau": {"code": "TK"}, "Tonga": {"code": "TO"}, "Trinidad and Tobago": {"code": "TT"}, "Tunisia": {"code": "TN"}, "Turkey": {"code": "TR"}, "Turkmenistan": {"code": "TM"}, "Turks and Caicos Islands": {"code": "TC"}, "Tuvalu": {"code": "TV"}, "Uganda": {"code": "UG"}, "Ukraine": {"code": "UA"}, "United Arab Emirates": {"code": "AE"}, "United Kingdom": {"code": "GB"}, "United States": {"code": "US"}, "United States Minor Outlying Islands": {"code": "UM"}, "Uruguay": {"code": "UY"}, "Uzbekistan": {"code": "UZ"}, "Vanuate": {"code": "VU"}, "Venezuela": {"code": "VE"}, "Viet Nam": {"code": "VN"}, "Virgin Islands, British": {"code": "VG"}, "Virgin Island,US": {"code": "VI"}, "Wallis and Futuna": {"code": "WF"}, "Western Sahara": {"code": "EH"}, "Yemen": {"code": "YE"}, "Zambia": {"code": "ZM"}, "Zimbabwe": {"code": "ZW"}, }]
console.log(countrycode[0]["United Kingdom"].code)
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
			airPollution(airVisualTemplate,AQIscale,geoLongitude,geoLatitude,countrycode)
			initMap(geoLongitude,geoLatitude)
		},
		};
	$.ajax(settings)
}

var airPollution = function getDataFromAPI(airVisualTemplate,AQIscale,geoLongitude,geoLatitude,countrycode) {
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
		success: function(returnedData,airVisualTemplate,countrycode){
			let usAQI = returnedData.data.current.pollution.aqius;
			let windData = returnedData.data.current.weather;
			let countryName = returnedData.data.country;
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
			let countryInfo = '"' + countryName + '"'
			// let countryQueried = countrycode[0][countryInfo].code; 
			countryQueried = 'gb'
			console.log(countryQueried)
			worldBankSearch(countryQueried,countryName)
		},
		};
	$.ajax(settings)
}

var worldBankSearch = function getDataFromWorldBank(countryQueried,countryName) {
	let settings = {
		url: worldBankURL1 + countryQueried + worldBankURL2,
		data: {},
		dataType: 'json',
		async: true,
		type: 'GET',
		success: function(returnedData){
			let numberYears = returnedData[0].total
			let yearCo2Data = getYears(numberYears,returnedData)
			$(function () { 
			    $('#container').highcharts({
			        chart: {
			            type: 'line'
			        },
			        title: {
			            text: 'Total Greenhouse Gas Emissions in ' + countryName
			        },
			        xAxis: {
			            categories: yearCo2Data.years.reverse()
			        },
			        yAxis: {
			            title: {
			                text: 'kt of CO2 equivalent'
			            }
			        },
			        series: [{
			            data: yearCo2Data.co2Data.reverse(),
			            name: 'annual data',
			            showInLegend: false,
			        }]
			    });
});
		}
	}
	$.ajax(settings)
}

function getYears(numberYears,returnedData){
	let years = []
	let co2Data = []
	for (i = 0; i <= numberYears-1; i++) {
		years[i] = returnedData[1][i].date
		co2Data[i] = returnedData[1][i].value
	}
	return {years, co2Data}
}

function findAirQualityClass(usAQI,AQIscale) {
	let roundedNum = Math.ceil(usAQI/50)*50
	let airClass = AQIscale.range.findIndex(function(element){
		return element == roundedNum
	})
	return airClass
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

   map.addListener('click', function(event) {
   marker.setMap(null)
   // line.setMap(null)
   marker = placeMarker(event.latLng,map);
   let geoLatitude = event.latLng.lat()
   let geoLongitude = event.latLng.lng()
   airPollution(airVisualTemplate,AQIscale,geoLongitude,geoLatitude,countrycode)
   // let latLng = marker.getPosition()
   // console.log(latLng)

	});
}

function windArrow(windDirection,map,geoLatitude,geoLongitude){
	let scale = 0.4
	let offSet = 0.18
	let changeLat = scale*Math.sin(windDirection*(Math.PI/180))
	let changeLong = scale*Math.cos(windDirection*(Math.PI/180))

	let lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          fillColor: 'red',
          fillOpacity: 0.8,
          strokeColor: 'red',
          strokeOpacity: 0.8,
          strokeWeight: 5,

        };

    // Create the polyline and add the symbol via the 'icons' property.
    let line = new google.maps.Polyline({
          path: [{lat: geoLatitude - offSet, lng: geoLongitude + offSet}, {lat: geoLatitude - offSet + changeLat, lng: geoLongitude + offSet + changeLong}],
          strokeColor: 'red',
          strokeOpacity: 0.8,
          strokeWeight: 5,
          icons: [{
            icon: lineSymbol,
            offset: '100%',
          }],
        });

    line.setMap(map)
    animateCircle(line)
}


function placeMarker(location,map) {
let marker = new google.maps.Marker({
    position: location, 
    map: map
});
map.panTo(location)
return marker
}

// Use the DOM setInterval() function to change the offset of the symbol
// at fixed intervals.
function animateCircle(line) {
  var count = 0;
  window.setInterval(function() {
    count = (count + 1) % 200;
    var icons = line.get('icons');
    icons[0].offset = (count / 2) + '%';
    line.set('icons', icons);
	}, 20);
}

// function to handle API query results
function handleQueryResponse(data,airVisualTemplate) {
	let results = $(airVisualTemplate).find('.js-usAQI').text(data.pollution.aqius)
	$('.js-city-results').html(results)
}

// function in maps to rectangle/polygon add
function getInitialPosition() {
	$('#error-message').text("Loading the air statistics in your location...")
	function success(position){
		let geoLatitude = position.coords.latitude;
		let geoLongitude = position.coords.longitude;
		$('#error-message').text(" ")
		initMap(geoLongitude,geoLatitude)
		airPollution(airVisualTemplate,AQIscale,geoLongitude,geoLatitude,countrycode)
	}
	function error(){
		console.log("an error has occurred")
	}
	navigator.geolocation.getCurrentPosition(success,error);
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
	})
}

$(getInitialPosition);
$(watchSubmit);