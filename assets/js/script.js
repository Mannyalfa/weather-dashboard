$(document).ready(function () {
    //Display current time in 12 hour format
	setInterval(function () {
		$("#currentDay").text(moment().format("dddd MMMM Do, YYYY h:mm:ss A"));
	}, 1000);
});