$(window).on("load", function () {
	currentLocation();
	checkLocalStorage();
});
// API Key
var APIKey = "24e07bc5bd24c4619da6c78dabd0b810";
var q = "";
var now = moment();
//Date and time formate for header
var currentDate = now.format(" dddd MMMM Do");
$("#currentDay").text(currentDate);

//Setting the click function at ID search button
$("#search-button").on("click", function (event) {
	// Invalid City Name Entered
	event.preventDefault();

	q = $("#city-input").val();
	if (q === "") {
		return alert("Please Enter Valid City Name ! ");
	}
	getWeather(q);

	saveToLocalStorage(q);
});
// Button for searched city
function createRecentSearchBtn(q) {
	var newLi = $("<li>");
	var newBtn = $("<button>");
	//Adding Extra ID for Button to stop Creating Duplicate Button on Click
	newBtn.attr("id", "extraBtn");
	newBtn.addClass("button is-small recentSearch");
	newBtn.text(q);
	newLi.append(newBtn);
	$("#historyList").prepend(newLi);
	//setting click function to prevent duplicate button
	$("#extraBtn").on("click", function () {
		var newQ = $(this).text();
		getWeather(newQ);
	});
}
//convert  temp
function convertToC(fahrenheit) {
	var fTempVal = fahrenheit;
	var cTempVal = (fTempVal - 32) * (5 / 9);
	var celsius = Math.round(cTempVal * 10) / 10;
	return celsius;
}

//Function to get weather details
function getWeather(q) {
	var queryURL =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		q +
		"&units=imperial&appid=" +
		APIKey;
	$.ajax({
		// gets the current weather info
		url: queryURL,
		method: "GET",
		error: (err) => {
			//If API through error then alert
			alert("City Not Found");
			return;
		},
	}).then(function (response) {
		console.log(response);
		//to avoid repeating city information on button click
		$(".cityList").empty();
		$("#days").empty();
		var celsius = convertToC(response.main.temp);
		var cityMain1 = $("<div col-8>").append(
			$("<p><h2>" + response.name + " (" + currentDate + ")" + "</h2><p>")
		);
		var image = $('<img class="imgsize">').attr(
			"src",
			"http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
		);
		var degreeMain = $("<p>").text(
			"Temperature : " + response.main.temp + " °F (" + celsius + "°C)"
		);
		var humidityMain = $("<p>").text(
			"Humidity : " + response.main.humidity + "%"
		);
		var windMain = $("<p>").text("Wind Speed : " + response.wind.speed + "MPH");
		var uvIndexcoord =
			"&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
		var cityId = response.id;

		displayUVindex(uvIndexcoord);
		displayForecast(cityId);

		cityMain1
			.append(image)
			.append(degreeMain)
			.append(humidityMain)
			.append(windMain);
		$("#cityList").empty();
		$("#cityList").append(cityMain1);
	});
}
//function for UV Index
function displayUVindex(uv) {
	$.ajax({
		// gets the UV index info
		url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + uv,
		method: "GET",
	}).then(function (response) {
		var UVIndex = $("<p><span>");
		UVIndex.attr("class", "badge badge-danger");
		UVIndex.text(response.value);
		$("#cityList").append("UV-Index : ").append(UVIndex);
	});
}
//function to Display 5 Day forecast
function displayForecast(c) {
	$.ajax({
		// gets the 5 day forecast API
		url:
			"https://api.openweathermap.org/data/2.5/forecast?id=" +
			c +
			"&units=imperial&APPID=" +
			APIKey,
		method: "GET",
	}).then(function (response) {
		//  Parse response to display forecast for next 5 days underneath current conditions
		var arrayList = response.list;
		for (var i = 0; i < arrayList.length; i++) {
			if (arrayList[i].dt_txt.split(" ")[1] === "12:00:00") {
				console.log(arrayList[i]);

				var celsius = convertToC(arrayList[i].main.temp); //converting F to Celsius
				var cityMain = $("<div>");
				cityMain.addClass("col forecast bg-white text-black ml-3 mb-3 rounded");
				var date5 = $("<h5>").text(moment(response.list[i].dt_txt).format("dddd"));
				var image = $("<img>").attr(
					"src",
					"http://openweathermap.org/img/w/" +
						arrayList[i].weather[0].icon +
						".png"
				);
				var degreeMain = $("<p>").text(
					"Temp : " + arrayList[i].main.temp + " °F (" + celsius + "°C)"
				);
				var humidityMain = $("<p>").text(
					"Humidity : " + arrayList[i].main.humidity + "%"
				);
				var windMain = $("<p>").text(
					"Wind Speed : " + arrayList[i].wind.speed + "MPH"
				);
				cityMain
					.append(date5)
					.append(image)
					.append(degreeMain)
					.append(humidityMain)
					.append(windMain);
				$("#days").append(cityMain);
			}
		}
	});
}
// display current location
function currentLocation() {
	$.ajax({
		url: "https://freegeoip.app/json/",
		method: "GET",
	}).then(function (response) {
		q = response.city || "exton";
		console.log(q);
		getWeather(q);
	});
}

// get data from Local Storage
function checkLocalStorage() {
	var storedData = localStorage.getItem("queries");
	var dataArray = [];
	if (!storedData) {
		console.log("no data stored");
	} else {
		storedData.trim();
		dataArray = storedData.split(",");
		for (var i = 0; i < dataArray.length; i++) {
			createRecentSearchBtn(dataArray[i]);
		}
	}
}
// set data in Local storage
function saveToLocalStorage(q) {
	var data = localStorage.getItem("queries");
	if (data) {
		console.log(data, q);
	} else {
		data = q;
		localStorage.setItem("queries", data);
	}
	if (data.indexOf(q) === -1) {
		data = data + "," + q;
		localStorage.setItem("queries", data);
		createRecentSearchBtn(q);
	}
}
//clear search
$("#clear-history").on("click", function (event) {
	$("#historyList").empty();
	localStorage.clear();
});
