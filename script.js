const API_KEY = "843fa40ad68a96668befb0da86d9b44b";
const searchBtn = document.querySelector("#search-btn");
const searchCityInput = document.querySelector("#search-city");

function getCurrentWeather (lat, lon) {
    fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
    })
}

function getForecastWeather(lat, lon) {
    fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}

function getLatLon () {
    const city = searchCityInput.value;
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" +  city +"&appid=" + API_KEY)
    .then(res => res.json())
    .then(data => {
        const lat = data[0].lat;
        const lon = data[0].lon;
    
        getCurrentWeather(lat, lon)
        getForecastWeather(lat, lon)
    })
}
    
function main () {
    getLatLon()
}


searchBtn.addEventListener("click", main)