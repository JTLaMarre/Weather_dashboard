// wrapper function

$(document).ready(function () {

    var Cities = []

    $("#search").on("click", function(event) {
        event.preventDefault();
        var city = $('#searchcity').val().trim();
        Cities.push(city)
        console.log(Cities)
        alert(city)
    })
//   wrapper closer
});