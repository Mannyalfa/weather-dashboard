(document).ready(function () {
	currentLocation();
    checkLocalStorage();
});
//API key for ALL weather data
var APIKey = "24e07bc5bd24c4619da6c78dabd0b810"
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
// Button for searched city  
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
//get weather details change to "q"

//Function to get weather details 
function getWeather(q) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&units=imperial&appid=" + APIKey;
    $.ajax({
        // gets the current weather info
        url: queryURL,
        method: "GET",
        error: (err => { //If API through error then alert 
            alert("City not found:Please try again.")
            return;
        })

    }).then(function (response) {
        console.log(response)
        //to avoid repeating city information on button click 
        $(".cityList").empty()
        $("#days").empty()
        var celsius = convertToC(response.main.temp);
        var cityMain1 = $("<div col-12>").append($("<p><h2>" + response.name + ' (' + currentDate + ')' + "</h2><p>"));
        var image = $('<img class="imgsize">').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');        
        var degreeMain = $('<p>').text('Temperature : ' + response.main.temp + ' °F (' + celsius + '°C)');
        var humidityMain = $('<p>').text('Humidity : ' + response.main.humidity + '%');
        var windMain = $('<p>').text('Wind Speed : ' + response.wind.speed + 'MPH');       
        var uvIndexcoord = '&lat=' + response.coord.lat + '&lon=' + response.coord.lon;
        var cityId = response.id;

        displayUVindex(uvIndexcoord);
        displayForecast(cityId);

        cityMain1.append(image).append(degreeMain).append(humidityMain).append(windMain);
        $('#cityList').empty();
        $('#cityList').append(cityMain1);
    });
}

    

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









































