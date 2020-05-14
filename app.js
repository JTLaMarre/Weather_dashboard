// wrapper function

$(document).ready(function () {

    var city = ""
    var lat = []
    var lon = []
    var Cities = []


    // get weather function
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
            $('#Icon').attr('src', 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png')
            call7day(response.coord.lat, response.coord.lon);


            lat.push(response.coord.lat)
            lon.push(response.coord.lon)
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/uvi/forecast?appid=63e2ab79c455ba5a3ee05762c641f525&lat=' + lat[lat.length - 1] + '&lon=' + lon[lon.length - 1] + '&cnt=1',
                method: 'Get'
            }).then(function (response) {
                $('#UVindex').text("UVindex:" + response[0].value)
                $('#UVindex').removeClass()


                if (response[0].value >= 8) {
                    $("#UVindex").addClass('btn bg-danger text-white')
                }
                if (response[0].value < 8 && response[0].value >= 5) {
                    $("#UVindex").addClass('btn bg-warning text-white')
                }
                if (response[0].value < 5) {
                    $("#UVindex").addClass('btn bg-success text-white')
                }
            })

        })
    }
    // function to pull from the 7 days weather info 
    function call7day(lat, lon) {
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude={part}&appid=63e2ab79c455ba5a3ee05762c641f525',
            method: "GET"
        }).then(function (response) {
            $('#day1Temp').text('Temprature: ' + Math.round((response.daily[1].temp.day - 273.15) * 1.8 + 32) + ' F')
            $('#day1Humidity').text('HUmidity: ' + response.daily[1].humidity + '%')
            $('#Daily1Icon').attr('src', 'http://openweathermap.org/img/wn/' + response.daily[1].weather[0].icon + '@2x.png')

            $('#day2Temp').text('Temprature: ' + Math.round((response.daily[2].temp.day - 273.15) * 1.8 + 32) + ' F')
            $('#day2Humidity').text('HUmidity: ' + response.daily[2].humidity + '%')
            $('#Daily2Icon').attr('src', 'http://openweathermap.org/img/wn/' + response.daily[2].weather[0].icon + '@2x.png')

            $('#day3Temp').text('Temprature: ' + Math.round((response.daily[3].temp.day - 273.15) * 1.8 + 32) + ' F')
            $('#day3Humidity').text('HUmidity: ' + response.daily[3].humidity + '%')
            $('#Daily3Icon').attr('src', 'http://openweathermap.org/img/wn/' + response.daily[3].weather[0].icon + '@2x.png')

            $('#day4Temp').text('Temprature: ' + Math.round((response.daily[4].temp.day - 273.15) * 1.8 + 32) + ' F')
            $('#day4Humidity').text('HUmidity: ' + response.daily[4].humidity + '%')
            $('#Daily4Icon').attr('src', 'http://openweathermap.org/img/wn/' + response.daily[4].weather[0].icon + '@2x.png')

            $('#day5Temp').text('Temprature: ' + Math.round((response.daily[5].temp.day - 273.15) * 1.8 + 32) + ' F')
            $('#day5Humidity').text('Humidity: ' + response.daily[5].humidity + '%')
            $('#Daily5Icon').attr('src', 'http://openweathermap.org/img/wn/' + response.daily[5].weather[0].icon + '@2x.png')

        })
    }

    // sets up search history buttons
    function renderSearch(city) {

        $('#search_display').empty();
        Cities.push(city);
        localStorage.setItem('Searches', JSON.stringify(Cities))
        for (var i = Cities.length; i >= 0; i--) {

            $("<button>").addClass('btn text-muted city').attr('data-city', city).appendTo('#search_display').text(Cities[i])
            $('<br>').appendTo("#search_display")

        }
        
    }
    // function that runs to pull search history from local storage
    function int() {
        Cities = JSON.parse(localStorage.getItem('Searches'))
        if (Cities != null) {
            for (var i = Cities.length; i >= 0; i--) {

                $("<button>").addClass('btn text-muted city').attr('data-city', city).appendTo('#search_display').text(Cities[i])
                $('<br>').appendTo("#search_display")

            }
        }
        else{
            Cities = []
        }
        addBtnEvent();
    }




    // event to caputure city search
    $("#search").on("click", function (event) {
        event.preventDefault();
        if ($('#searchcity').val().trim()===''){
            return false}
            else{
        city = $('#searchcity').val().trim();

        getWeather(city);
        renderSearch(city);
            }


    });
    function addBtnEvent() {
        $('.city').click(function (event) {
            event.preventDefault()
            city = $(this).text()
            getWeather(city)
        })
    }

    int();
    //   wrapper closer
});