(document).ready(function () {
	currentLocation();
    checkLocalStorage();
});
//API key for ALL weather data
var APIKey = ;
Key	Name	
3ac5c0cfe3f471f9cd5030b2f1beaa21
Default	 
24e07bc5bd24c4619da6c78dabd0b810
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
//get weather details change to "q"

api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}


api.openweathermap.org/data/2.5/weather?q=London&appid={API key}


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









































