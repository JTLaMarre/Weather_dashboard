// wrapper function

$(document).ready(function () {

    var Cities = []

    function getWeather() {
        var city = Cities[0]
        var QueryUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=63e2ab79c455ba5a3ee05762c641f525'

        $.ajax({
            url: QueryUrl,
            method: "GET"
        }).then(function (response) {
            $("#CityName").text(city)
            $('#currentTemp').text('Temprature: ' + Math.round((response.main.temp - 273.15) * 1.8 + 32) + ' F')
            $('#currentHumidity').text('Humidity: ' + response.main.humidity + ' %')
            $('#currentWindSpeed').text('WindSpeed: ' + response.wind.speed + ' mph')
            var lat = response.coord.lat
            var lon = response.coord.lon
            
            function getUV(lat, lon) {
                var UVUrl = 'http://api.openweathermap.org/data/2.5/uvi/forecast?appid=63e2ab79c455ba5a3ee05762c641f525&lat=' + lat + '&lon=' + lon + '&cnt=5'
                $.ajax({
                    url: UVUrl,
                    method: "GET"
                }).then(function (response) {
                    return response[0].value
                })
            }
            $('#UVindex').text("UVindex:" + getUV(lat, lon))
        })
    }

    function renderSearch() {

        $('#search_display').empty();

        for (var i = Cities.length; i > 0; i--) {

            $("<button>").text(Cities[i]).addClass('btn text-muted').appendTo('#search_display')
            $('<br>').appendTo("#search_display")
        }
    }
    // event to caputure city search
    $("#search").on("click", function (event) {
        event.preventDefault();
        var city = $('#searchcity').val().trim();
        Cities.push(city);

        getWeather();
        renderSearch();

    })
    //   wrapper closer
});