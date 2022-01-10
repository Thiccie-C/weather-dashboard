var citySearchInput = document.querySelector("#city")
var citySearchForm = document.querySelector("#city-search")
var todaysWeatherContainerEl = document.querySelector("#today")
var citySearchName = document.querySelector("#city-name")
var historyDiv = document.querySelector("#history")
var forecastDiv = document.querySelector(".forecast")
var todaysDateEl = document.querySelector("#todays-date")
var today = new Date();
var todaysDate = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
todaysDateEl.textContent = todaysDate
var i = 0
var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = citySearchInput.value.trim()
    if (city) {
      $(".forecast-content").remove();
        citySearchInput.value="";
        getCityName(city)
    }
    else {
        alert("Please Enter a city")
    }
}
var getCityName = function(data){
var cityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + data + ",us&APPID=cec0e7937cc29a0b1318e2f303f485a2"
  fetch(cityUrl).then(function(response){
    response.json().then(function(data){
      var lon = data.coord.lon
      var lat = data.coord.lat
      var lonRounded = Math.round(lon * 10) / 10
      var latRounded = Math.round(lat * 10) /10
      lon = lonRounded
      lat = latRounded 
      citySearchName.textContent = data.name;
      
      var local = localStorage.getItem(i, data.name)
      if (data.name != local){
      localStorage.setItem(i, data.name)
      var historyButtonEl = document.createElement("button")
      historyButtonEl.className = "history-contents " + data.name
      historyButtonEl.textContent = data.name
      historyDiv.appendChild(historyButtonEl)
      historyButtonEl.onclick = function(){
        historyInfo(data.name)
      }}
      getWeather(lon, lat)

    })
  })
}
var getWeather = function(lon, lat){
var apiUrl="https://api.openweathermap.org/data/2.5/onecall?lat=" +lat + "&lon=" + lon + "&units=imperial&appid=cec0e7937cc29a0b1318e2f303f485a2"
fetch(apiUrl).then(function(response) {
  response.json().then(function(data) {
    displayWeather(data)
    forecast(data)
  });
});
};
var displayWeather = function(data) {
  todaysWeatherContainerEl.textContent= "";

  
  var todayEl = document.createElement("div");
  todayEl.className = "today-contents"

  var todayIcon = document.createElement("img")
  var todayTempEl = document.createElement("div");
  var todayWindEl = document.createElement("div");
  var todayHumidityEl = document.createElement("div")
  var todayUVIndexEl = document.createElement("div")
  
  todayTempEl.textContent = "Temp: " + data.current.temp + "°F"
  todayWindEl.textContent = "Wind: " + data.current.wind_speed + "MPH"
  todayHumidityEl.textContent = "Humidity: " + data.current.humidity + "%"
  todayUVIndexEl.textContent = "UV INDEX: " + data.current.uvi
  todayIcon.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png"

  if(0 < data.current.uvi < 2){
    todayUVIndexEl.className = "low"
  }
  else if(3 > data.current.uvi < 5) {
    todayUVIndexEl.className = "moderate"
  }
  else if(6 > data.current.uvi < 7) {
    todayUVIndexEl.className = "high"
  }
  todayEl.appendChild(todayIcon)
  todayEl.appendChild(todayTempEl);
  todayEl.appendChild(todayWindEl)
  todayEl.appendChild(todayHumidityEl)
  todayEl.appendChild(todayUVIndexEl)
  todaysWeatherContainerEl.appendChild(todayEl);
}
citySearchForm.addEventListener("submit", formSubmitHandler);

var forecast = function(data){
  for(var i=5; i > 0; i--){
  var forecastDay = document.createElement("div")
  var forecastTemp = document.createElement("div")
  var forecastWind = document.createElement("div")
  var forecastHumidity = document.createElement("div")
  var forecastIcon = document.createElement("img")
  var forecastDateEl = document.createElement("div")
  var date = new Date()
  var forecastDate = (date.getMonth()+1)+'/'+(date.getDate() + i)+'/'+date.getFullYear();

  forecastDateEl.textContent = forecastDate
  
  forecastDay.className = "forecast-content"
  forecastTemp.className = "forecast-Temp"
  forecastWind.className = "forecast-Wind"
  forecastHumidity.className = "forecast-Humidity"
  forecastIcon.className = "forecast-Icon"

  forecastTemp.textContent = "Temp: " + data.daily[i].temp.day + "°F"
  forecastWind.textContent = "Wind: " + data.daily[i].wind_speed + "MPH"
  forecastHumidity.textContent = "Humidity: " + data.daily[i].humidity + "%"
  forecastIcon.src = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png"

  forecastDay.appendChild(forecastDateEl);
  forecastDay.appendChild(forecastIcon);
  forecastDay.appendChild(forecastTemp);
  forecastDay.appendChild(forecastHumidity);
  forecastDay.appendChild(forecastWind);
  forecastDiv.appendChild(forecastDay);
}
}
var historyInfo = function(name){
  $("." + name).remove();
  $(".forecast-content").remove();
  getCityName(name);
}

