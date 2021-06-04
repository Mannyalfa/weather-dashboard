$(document).ready(function () {
	currentLocation();
    checkLocalStorage();
});
//API key for ALL weather data
var APIKey = "4f000a96c8mshf5291b7569fb189p17bea2jsn9e694263a6a9";
var q = "";
var now = moment();
var currentDate = now.format('dddd MMMM Do h:mm a');
$("#currentDay").text(currentDate);

//Setting the click function at ID search button
$("#search-button").on("click", function (event) {
    // Invalid City Name Entered
	event.preventDefault();
    q = $("#city-input").val();
    if (q === '') {
        return alert('Please Enter A Valid City Name ! ');
    }
    getWeather(q);

    saveToLocalStorage(q);
}); 
// Function to create Button for searched city 
function createRecentSearchBtn(q) {
    var newLi = $("<li>")
    var newBtn = $('<button>');
    // prevent duplicate onclick
    newBtn.attr('id', 'extraBtn');
    newBtn.addClass("button is-small recentSearch");
    newBtn.text(q);
    newLi.append(newBtn)
    $("#historyList").prepend(newLi);
    //set click function 
    $("#extraBtn").on("click", function () {
        var newQ = $(this).text();
        getWeather(newQ);
    });
//get weather details 

// search weather data w/my API fix in-process
	function getWeather(q) {
	var query = "https://community-open-weather-map.p.rapidapi.com/find?q=" + q + "&units=imperial%2C%20metric" +APIKey;
	"method": "GET",
	

	}
};
//get current weather w/my API-Fix this!!
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


//get 5 day forecast w/my API-Fix this!

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








/*DATA STORAGE

// get data from Local Storage 
function checkLocalStorage() {
    var storedData = localStorage.getItem('queries');
    var dataArray = [];
    if (!storedData) {
        console.log("no data stored");
    } else {
        storedData.trim();
        dataArray = storedData.split(',');
        for (var i = 0; i < dataArray.length; i++) {
            createRecentSearchBtn(dataArray[i]);
        }
    }
};
// set data in Local storage
function saveToLocalStorage(q) {
    var data = localStorage.getItem('queries');
    if (data) {
        console.log(data, q)

    } else {
        data = q;
        localStorage.setItem('queries', data);
    }
    if (data.indexOf(q) === -1) {
        data = data + ',' + q;
        localStorage.setItem('queries', data);
        createRecentSearchBtn(q);
    }
}
//clear search
$("#clear-history").on("click", function (event) {
    $("#historyList").empty();
});*/





























































