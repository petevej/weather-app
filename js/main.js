// Global variables declaration

var url = "//api.openweathermap.org/data/2.5/weather?APPID=7bf2357ba287820a879a3a7d68ee865e&lat="							// define url for openweathermap API
var myLat = '';
var myLon = '';
var $header = $('#header');
var $temp = $('#temp');
var $location = $('#location');
var $condition = $('#condition');
var $icon = $('#icon');
var tempK = '';
var tempC = '';
var $myCheck = $('#myCheck');

$(document).ready(function() {
	'use strict';
	// log current position to console
	function onPositionReceived(position) {
		console.log(position);
		getAjax(position.coords.latitude, position.coords.longitude);
	}
	// log error message to console
	function locationNotReceived(positionError) {
		console.log(positionError);
	}

	// if browser has geolocation, get current position
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onPositionReceived, locationNotReceived);
	}

	//getAjax(3.1, 101.6);
	// AJAX GET function for JSONP data
	function getAjax(myLat, myLon) {
	$.ajax( {
		type: 'GET',
		url: url + myLat + '&lon=' + myLon,
		dataType: "jsonp",
		// function to call upon successful request
		success: function(data) {
			console.log(data.main);
			$temp.remove();
			$location.remove();
			$condition.remove();
			$icon.remove();
			tempK = data.main.temp;
			tempC = Math.round(tempK - 273.15);
			var cond = data.weather[0].description;
			var iconAPI = data.weather[0].icon;
			var loc = data.name + ", " + data.sys.country;
			$header.append('<div id="location"><p>'
										+ loc
										+ '</p></div><div id="degree"><p>'
										+ tempC
										+ '<span id="unit">&#8451;</span>'
										+ '</p></div>'
										+ '<div id="condition"><p>'
										+ cond
										+ '</p></div>'
										+ '<div id="icon"><img src='
										+ '"http://openweathermap.org/img/w/'
										+ iconAPI
										+ '.png" alt="condition-icon"/></div>').hide().fadeIn(1200);
			toggleUnit();
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
	function toggleUnit() {
	$('div.slider').on('click', function() {
		if (document.getElementById("myCheck").checked) {
			tempC = Math.round(tempK - 273.15);
			$('#degree').text(tempC);
			$('#degree').append('<span id="unit">&#8451;</span></p>');
		} else {
			tempC = Math.round((tempK * 9/5) - 459.67);
			$('#degree').text(tempC);
			$('#degree').append('<span id="unit">&#8457;</span></p>');
		}
	});
	}
});
