// ----- Created API key to use for project----
const API_KEY = "16a8a9e40611abd4788ada155d01bb7e";
const searchBtn = document.querySelector("#search-btn");
const searchCityInput = document.querySelector("#search-city");

// -----Function to get the searched citys current weather information and append on page------
function getCurrentWeather (lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY+"&units=imperial")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const h3Ele = document.createElement("h3")
        h3Ele.innerText = data.name
        const tempEle = document.createElement("h6")
        
// ------Used bootstrap code for cards used to display weather information-----
        var cardText = `<div class="card bg-warning" style="width: 25rem;">
        <div class="card-body">
        <h4 class="card-title">${data.name}</h4>
        <span  class="card-title">Description: ${data.weather[0].description}
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="img-fluid icon" alt="weather icon">
        
        </span>
        <h5 class="card-title">Temp:${data.main.temp}</h5>
        <p class="card-text">Humidity: ${data.main.humidity}</p>
        <p class="card-text">Wind Speed: ${data.wind.speed}</p>
        </div>
        </div>`
        document.getElementById("current-forecast").innerHTML = cardText

    })  
}

// ------Function which takes the parameters of lat and long to display the information of a searched city-----
function getForecastWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        var cardText= ""
        for(i=0; i < data.list.length; i=i+8){
            cardText += `<div class="card bg-primary" style="width: 14rem;">
            <div class="card-body">
            <h4 class="card-title">${data.list[i].dt_txt}</h4>
            <span  class="card-title">Description: ${data.list[i].weather[0].description}
            <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" class="img-fluid icon" alt="weather icon">
            
            </span>
            <h5 class="card-title">Temp:${data.list[i].main.temp}</h5>
            <p class="card-text">Humidity: ${data.list[i].main.humidity}</p>
            <p class="card-text">Wind Speed: ${data.list[i].wind.speed}</p>
            </div>
            </div>

            `
        }
        document.getElementById('fiveday-forecast').innerHTML = cardText
        
    })
}


// ----Function to get the latitude and longitude of a given city based on a search-------
function getLatLon (city) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city +"&appid=" + API_KEY)
    .then(res => res.json())
    .then(data => {
        const lat = data[0].lat;
        const lon = data[0].lon;
        
        getCurrentWeather(lat, lon)
        getForecastWeather(lat, lon)
    })
}

// ------Main Function which calls on the functions createButtons and getLatLon to render the information on the page-----
function main () {
    const city = searchCityInput.value;
    var savedToLocalStorage = JSON.parse(localStorage.getItem("weather-dashboard")) || []
    savedToLocalStorage.push(city)
    localStorage.setItem("weather-dashboard",JSON.stringify(savedToLocalStorage))
    createButtons()
    getLatLon(city)
}


// -------Function wrote to create buttons based on search history -----
function createButtons(){
    var savedToLocalStorage = JSON.parse(localStorage.getItem("weather-dashboard")) || []
    var cardText =""
    for(let i=0;i<savedToLocalStorage.length;i++){
        cardText += `
        
        <button class="btn btn-secondary history" type="button">${savedToLocalStorage[i]}</button>
        `
    }
   document.getElementById('search-history').innerHTML = cardText
   document.querySelectorAll(".history").forEach(element => element.addEventListener("click",getForecastForSaved))
}
createButtons()
function getForecastForSaved(event){
    console.log(event.target.innerText)
    getLatLon(event.target.innerText)
}
searchBtn.addEventListener("click", main)



// curl wttr.in/newyork
// setting the day forecast
// 1 get the div element for the day using id
// 2cleaning any existing data out of it (element.innerHTML ="")
// 3 create a variable for the weather html
// 4add the temperature in a <p> tag for that string
// 5 set the inner HTML of the day

// 1get the element for the day (using id)
// 2create an array for the new elements that you will add to the day
// 3for each part of thd weather, create a new element for it. this involves creating the element and setting the text
// 4Replace the existing children in the day element with the new children

// setForecastDay(0,1)
// setForecastDay(0,2)

// document.getElementById('day' + dayNumber)

// var tempParagraph = document.createElement('p')

// var titleParagraph 'day' + dayNumber

// dayList.push(titleParagraph)

// day.replace.Children(day list)