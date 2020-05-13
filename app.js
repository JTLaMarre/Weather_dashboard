// wrapper function

$(document).ready(function () {

    var city = ""
    var lat = []
    var lon = []
    var Cities = []

    function getWeather(city) {
        $('#CityName').empty();
        $('#currentTemp').empty();
        $('#currentHumidity').empty();
        $('#currentWindSpeed').empty();

        
        var QueryUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=63e2ab79c455ba5a3ee05762c641f525'

        $.ajax({
            url: QueryUrl,
            method: "GET"
        }).then(function (response) {
            $("#CityName").text(city)
            $('#currentTemp').text('Temprature: ' + Math.round((response.main.temp - 273.15) * 1.8 + 32) + ' F')
            $('#currentHumidity').text('Humidity: ' + response.main.humidity + ' %')
            $('#currentWindSpeed').text('WindSpeed: ' + response.wind.speed + ' mph')
            $('#Icon').attr('src','http://openweathermap.org/img/wn/'+response.weather[0].icon+'@2x.png')


            lat.push(response.coord.lat)
            lon.push(response.coord.lon)
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/uvi/forecast?appid=63e2ab79c455ba5a3ee05762c641f525&lat=' + lat[lat.length - 1] + '&lon=' + lon[lon.length - 1] + '&cnt=1',
                method: 'Get'
            }).then(function (response) {
                $('#UVindex').text("UVindex:" + response[0].value)
                $('#UVindex').removeClass()
            
                if(response[0].value>=8){
                    $("#UVindex").addClass('bg-danger text-white')
                }
                if(response[0].value<8 && response[0].value>=5){
                    $("#UVindex").addClass('bg-warning text-white')
                }
                if(response[0].value<5) {
                    $("#UVindex").addClass('bg-success text-white')
                }
            })

        })
    }


        // sets up search history buttons
    function renderSearch(city) {

        $('#search_display').empty();
        Cities.push(city);

        for (var i = Cities.length; i >= 0; i--) {

            $("<button>").addClass('btn text-muted city').attr('data-city',city).appendTo('#search_display').text(Cities[i])
            $('<br>').appendTo("#search_display")

        }
        
    }
    
    


    // event to caputure city search
    $("#search").on("click", function (event) {
        event.preventDefault();
        city = $('#searchcity').val().trim();

        getWeather(city);
        renderSearch(city);
        

    })
    
    $("button").on("click", function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        
    })
    //   wrapper closer
});