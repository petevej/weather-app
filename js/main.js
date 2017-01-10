var url = "//api.openweathermap.org/data/2.5/weather?APPID=7bf2357ba287820a879a3a7d68ee865e&lat="							// define url for openweathermap API
var myLat = '';
var myLon = '';

$(document).ready(function() {
	getAjax(3.1, 101.6);
	// AJAX GET procedure for JSONP data
	function getAjax(myLat, myLon) {
	$.ajax( {
		type: 'GET',
		url: url + myLat + '&lon=' + myLon,
		dataType: "jsonp",
		// function to call upon successful request
		success: function(data) {
			console.log(data.main);
		},
		// function to call upon failed request
		fail: function() {
			alert('Forecast got stuck in the pipe, check your connection!');
		},
		error: function() {
			alert("Error while getting weather data ::" );
		},
		//timeout: 5000					// set timeout to 5 seconds
	});	
	}
});

