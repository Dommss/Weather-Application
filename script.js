const unsplashKey = "RoA21G0FTSnBG6IT5o-aYUmNqUDlZXMIh46x6r-snTk"
let unsplashApi = "https://api.unsplash.com/photos/random/?query=landscape&count=1&client_id=" + unsplashKey;
let imageElement = document.querySelector("#imagery");

fetch(unsplashApi)
    .then((response) => response.json())
    .then(function (jsonData) {
        imageElement.src = jsonData[0].urls.regular;
    })
    .catch( function(error) {
        console.log("Error: " + error);
    })

let weather = {
    apiKey: "609e3d11412bf11c616348732a3e1d9a",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=metric&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name + " is:";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.trunc(temp) + "°C";
        document.querySelector(".humidity").innerText = "Humidity is " + humidity + "%.";
        document.querySelector(".wind").innerText = "The wind speed is " + speed + " km/h.";
        document.querySelector(".weather").classList.remove("loading")
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("Brno");