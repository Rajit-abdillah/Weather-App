function getWeather() {
    var city = document.getElementById("city").value;
    var apiKey = "fac2f3a8884d77e2cc4b78b36d44bb07";
    if (!city) {
        alert("Please enter a city first!");
        return;
    }
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=").concat(apiKey);
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=".concat(city, "&appid=").concat(apiKey);
    fetch(currentWeatherUrl)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        displayWeather(data);
    })
        .catch(function (error) {
        console.log("error fetching current weather data", error);
        alert("error catching current weather data, try again please");
    });
    fetch(forecastUrl)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        displayHourlyForecast(data.list);
    })
        .catch(function (error) {
        console.log("error fetching hourly forecast", error);
        alert("error catching hourly forecast, try again please");
    });
}
function displayWeather(data) {
    var tempDivInfo = document.getElementById("temp-div");
    var weatherInfoDiv = document.getElementById("weather-info");
    var weatherIcon = document.getElementById("weather-icon");
    var hourlyForecastDiv = document.getElementById("hourly-forecast");
    var description = data.weather[0].description;
    weatherInfoDiv.innerHTML = "";
    tempDivInfo.innerHTML = "";
    hourlyForecastDiv.innerHTML = "";
    if (data.cod === "404") {
        weatherInfoDiv.innerHTML = "<p>".concat(data.message, "</p>");
    }
    else {
        var cityName = data.name;
        var temperature = Math.round(data.main.temp - 273.15);
        var description_1 = data.weather[0].description;
        var iconCode = data.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/".concat(iconCode, ".png");
        var temperatureHTML = "<p><strong>Temperature: ".concat(temperature, "\u00B0C</strong></p>");
        var weatherHTML = "<p>".concat(cityName, "</p><p>").concat(description_1, "</p>");
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description_1;
        showImage();
    }
    var mainWeather = data.weather[0].main.toLowerCase(); // e.g., "Rain", "Clear", etc.
    var body = document.body;
    // Reset any previously set background class
    body.className = "";
    // Set background based on weather
    switch (mainWeather) {
        case "clear":
            body.classList.add("clear-bg");
            break;
        case "clouds":
            body.classList.add("cloudy-bg");
            break;
        case "rain":
        case "drizzle":
            body.classList.add("rainy-bg");
            break;
        case "thunderstorm":
            body.classList.add("stormy-bg");
            break;
        case "snow":
            body.classList.add("snowy-bg");
            break;
        case "mist":
        case "fog":
        case "haze":
            body.classList.add("foggy-bg");
            break;
        default:
            body.classList.add("default-bg");
            break;
    }
}
function displayHourlyForecast(hourlyData) {
    var hourlyForecastDiv = document.getElementById("hourly-forecast");
    var next24Hours = hourlyData.slice(0, 8);
    next24Hours.forEach(function (item) {
        var dateTime = new Date(item.dt * 1000);
        var hour = dateTime.getHours();
        var temp = Math.round(item.main.temp - 273.15);
        var iconCode = item.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/".concat(iconCode, ".png");
        var timeString = dateTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        var hourlyItemHtml = "\n      <div class=\"hourly-item\">\n        <span>".concat(hour, ":00</span>\n        <img src=\"").concat(iconUrl, "\" alt=\"").concat(item.weather[0].description, "\">\n        <span>").concat(temp, "\u00B0C</span>\n      </div>\n      ");
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}
function showImage() {
    var weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display = "block";
}
