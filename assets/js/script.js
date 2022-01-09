var citySearchInput = document.querySelector("#city")
var citySearchForm = document.querySelector("#city-search")
var todaysWeatherContainerEl = document.querySelector("#today")
var citySearchName = document.querySelector("#city-name")



var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = citySearchInput.value.trim()
    if (city) {
        citySearchInput.value="";
        console.log(city)
        getWeather(city)
    }
    else {
        alert("Please Enter a city")
    }
}
var getWeather = function(data){
var apiUrl="https://api.openweathermap.org/data/2.5/weather?q=" + data + ",us&APPID=cec0e7937cc29a0b1318e2f303f485a2"
fetch(apiUrl).then(function(response) {
  console.log(response);
  response.json().then(function(data) {
    displayWeather(data, data)
  });
});
};
var displayWeather = function(data, city) {

  console.log(data.main.temp)

  console.log(city.name)

  todaysWeatherContainerEl.textContent= "";

  citySearchName.textContent = city.name;

  var todayEl = document.createElement("div");
  todayEl.addClass = " "

  var cityEl = document.createElement("span");
  var todayTempEl = document.createElement("span");
  var todayWindEl = document.createElement("span");
  var todayHumidityEl = document.createElement("span")
  var todayUVIndexEl = document.createElement("span")

  todayTempEl.textContent = "Temp: " + data.main.temp + "%"
  todayWindEl.textContent = "Wind: " + data.wind.speed + "MPH"
  todayHumidityEl.textContent = "Humidity: " + data.main.humidity + "%"

  cityEl.textContent = city.name;

  todayEl.appendChild(todayHumidityEl)
  todayEl.appendChild(todayWindEl)
  todayEl.appendChild(todayTempEl);
  todayEl.appendChild(cityEl);

  todaysWeatherContainerEl.appendChild(todayEl);
}

citySearchForm.addEventListener("submit", formSubmitHandler);




//getWeather()
