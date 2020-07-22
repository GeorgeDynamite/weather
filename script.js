
let city = $("#searchItem").val();
const apiKey = "&appid=570064a4f6cb566c2e175443986407aa";
let date = new Date();
/*when search is clicked, take the value and add it to my queryURL with the API key
Make Ajax call, call other functions in js
*/
$("#searchBtn").on("click", function () {
    $('#forecastH5').addClass('show');
    city = $("#searchItem").val();
    $("#searchItem").val("");
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {
            let tempF = (response.main.temp - 273.15) * 1.80 + 32;
            console.log(Math.floor(tempF))
            getCurrentConditions(response);
            getCurrentForecast(response);
            makeList();

        })
});
// adds previously searched cities to list.
function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
}
// variables to hold content
function getCurrentConditions(response) {
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);
    $('#currentCity').empty();
    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var city = $("<h4>").addClass("card-title").text(response.name);
    var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " F");
    var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // append content to page.
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)

}

function getCurrentForecast() {

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $('#forecast').empty();
        let responses = response.list;
        console.log(responses)
        for (let i = 0; i < responses.length; i++) {
            if (responses[i].dt_txt.indexOf("12:00:00") !== -1) {

                let temp = (responses[i].main.temp - 273.15) * 1.80 + 32;
                let tempF = Math.floor(temp);

                var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
                var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + responses[i].main.humidity + "%");

                var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + responses[i].weather[0].icon + ".png")

                cardBody.append(cityDate, image, temperature, humidity);
                card.append(cardBody);
                $("#forecast").append(card);

            }
        }
    });

}