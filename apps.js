var air_visual_search = 'http://api.airvisual.com/v2/countries?key='
var air_visual_key = 'cM9MW8ehQLgrwsmqc'

// function to get data from API
function getDataFromAPI(searchLocation,callback) {
	let settings = {
		url: air_visual_search,
		data: {
			key: air_visual_key,
		}
		dataType: 'json',
		type: 'GET',
		success: callback,
	};
	$.ajax(settings)
}

// function to handle API query results
function handleQueryResponse(data) {

}

// function to render results
function renderResult(result) {


}

// function that watches for submit of the city input query
function watchSubmit() {
	$('.js-query').submit(function(event){
		event.preventDefault()
		let queryTarget = $(this).find('#js-query-search')
		let query = queryTarget.val()
		if (query=='') {
			$('#error-message').html('<h1>Enter a city you would like to explore!</h1>')
		}
		queryTarget.val('')
		// getDataFromAPI
		$('.js-search-continue').toggleClass('hidden')
	})
}

$(watchSubmit);