var citySearchInput = document.querySelector("#city")
var citySearchForm = document.querySelector("#city-search")
var todaysWeatherContainerEl = document.querySelector("#today")
var citySearchName = document.querySelector("#city-name")
var historyDiv = document.querySelector("#history")


var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = citySearchInput.value.trim()
    if (city) {
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
      var historyButtonEl = document.createElement("button")
      historyButtonEl.className = "history-contents " + data.name
      historyButtonEl.textContent = data.name
      historyDiv.appendChild(historyButtonEl)
      historyButtonEl.onclick = function(){
        historyInfo(data.name)
      }
      getWeather(lon, lat)
    })
  })
  
}
var getWeather = function(lon, lat){
var apiUrl="https://api.openweathermap.org/data/2.5/onecall?lat=" +lat + "&lon=" + lon + "&appid=cec0e7937cc29a0b1318e2f303f485a2"
fetch(apiUrl).then(function(response) {
  response.json().then(function(data) {
    displayWeather(data, data)
    
  });
});
};
var displayWeather = function(data, city) {
  todaysWeatherContainerEl.textContent= "";


  var todayEl = document.createElement("div");
  todayEl.className = "today-contents"

  var todayIcon = document.createElement("img")
  var todayTempEl = document.createElement("div");
  var todayWindEl = document.createElement("div");
  var todayHumidityEl = document.createElement("div")
  var todayUVIndexEl = document.createElement("div")
  
  todayTempEl.textContent = "Temp: " + data.current.temp + "%"
  todayWindEl.textContent = "Wind: " + data.current.wind_speed + "MPH"
  todayHumidityEl.textContent = "Humidity: " + data.current.humidity + "%"
  todayUVIndexEl.textContent = "UV INDEX: " + data.current.uvi + "%"
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
  todayEl.appendChild(todayHumidityEl)
  todayEl.appendChild(todayWindEl)
  todayEl.appendChild(todayTempEl);
  todayEl.appendChild(todayUVIndexEl)
  todaysWeatherContainerEl.appendChild(todayEl);
}

citySearchForm.addEventListener("submit", formSubmitHandler);

//getWeather()
var historyInfo = function(name){
  $("." + name).remove();
  getCityName(name);
}