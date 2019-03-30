$(document).ready(function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, options); 
       
    } else {
        alert("Geolocation is not supported by this browser.");
    } 
});
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
    const url = `https://fcc-weather-api.glitch.me/api/current?lat=${crd.latitude}&lon=${crd.longitude}`;
    console.log(url);
    $.get( `${url}`, function( data ) {
        var isCelsius = true;
        var placeName = document.getElementById("place-name");
        var temprature = document.getElementById("temprature");
        var weatherType = document.getElementById("weather-type");
        placeName.innerHTML = data.name+", "+data.sys.country; 
        temprature.innerHTML = data.main.temp; 
        var append = $("<sup>  &#8728;</sup>");
        $('#temprature').append(append);
        $('#temp-unit').append('C');
        weatherType.innerHTML = data.weather[0].main;
        $("#weather-icon").attr("src",data.weather[0].icon);

        $('#temp-unit').click(function(){
            if(isCelsius){
                $('#temp-unit').html('F');
                var fahrenheit = ((9*data.main.temp)/5) + 32;
                $('#temprature').html(fahrenheit);
            }
            else if(!isCelsius){
                $('#temp-unit').html('C');
                $('#temprature').html(data.main.temp);
            }
            var append = $("<sup>  &#8728;</sup>");
            $('#temprature').append(append);
            isCelsius = !isCelsius;
        });
      });
}
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
