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
    $.get( `${url}`, function( data ) {
        var placeName = document.getElementById("place-name");
        var temprature = document.getElementById("temprature");
        var weatherType = document.getElementById("weather-type");
        placeName.innerHTML = data.name; 
        temprature.innerHTML = data.main.temp; 
        weatherType.innerHTML = data.weather[0].main;
        $("#weather-icon").attr("src",data.weather[0].icon);
      });
}
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
