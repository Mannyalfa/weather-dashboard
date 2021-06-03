$(document).ready(function () {
    checkLocalStorage();
});

//API key for ALL weather data
var APIKey = "4f000a96c8mshf5291b7569fb189p17bea2jsn9e694263a6a9";
var q = "";
var now = moment();
var currentDate = (moment().format("dddd MMMM Do h:mm a"));
$("#currentDay").text(currentDate);



//Setting the click function at ID search button
$("#search-button").on("click", function (event) {
  

});

// Function to create Button for searched city 

//Function to get weather details 

//open-weather cdn and code snippets DO NOT DELETE!




//---------------------search weather data------------------------------------
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://community-open-weather-map.p.rapidapi.com/find?q=london&cnt=0&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=imperial%2C%20metric",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4f000a96c8mshf5291b7569fb189p17bea2jsn9e694263a6a9",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
};
//---------------------get current weather------------------------------------
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://community-open-weather-map.p.rapidapi.com/weather?q=London%2Cuk&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4f000a96c8mshf5291b7569fb189p17bea2jsn9e694263a6a9",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});


//---------------------get 5 day forecast------------------------------------

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://community-open-weather-map.p.rapidapi.com/forecast?q=san%20francisco%2Cus",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4f000a96c8mshf5291b7569fb189p17bea2jsn9e694263a6a9",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});








































































