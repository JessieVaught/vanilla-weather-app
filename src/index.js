function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours=date.getHours();
    if (hours < 10) {
        hours=`0${hours}`
    }
    let minutes=date.getMinutes();
    if (minutes<10) {
        minutes=`0${minutes}`
    }
    let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day=days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
    let apiKey='0ae703064e17d8cb6a410a5138e15a28';
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    console.log(apiUrl);

    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    console.log(response.data);

    let temperatureElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#weather-icon");

    celsiusTemperature= response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp); 
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;    
    windElement.innerHTML = response.data.wind.speed;    
    dateElement.innerHTML=formatDate(response.data.dt*1000);    
    iconElement.setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description)

    getForecast(response.data.coord);

}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}

function search(city) {
let apiKey='0ae703064e17d8cb6a410a5138e15a28';
let unit='Metric';
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`

axios.get(apiUrl).then(displayTemperature);
}

function showFarenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    let farenheitTemperature=((celsiusTemperature * 9) / 5 + 32);
    temperatureElement.innerHTML=Math.round(farenheitTemperature);
    celsiusLink.classList.remove("active");
    farenheitLink.classList.add("active")
}

function showCelsiusTemperature(event) {
    event.preventDefault();
    temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
    celsiusLink.classList.add("active");
    farenheitLink.classList.remove("active")
}

function formatDay(timestamp){

    let date = new Date(timestamp*1000);

    let day=date.getDay();
    let days= ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]

    return days[day];
}

function displayForecast(response){

    let forecast=response.data.daily;
    let forecastElement=document.querySelector("#forecast");
    
    let forecastHTML=`<div class="row">`;
    let days=["Thu", "Fri", "Sat", "Sun", "Mon"];
    forecast.forEach(function (forecastDay, index){
        if (index >0 && index < 6) {
        forecastHTML=forecastHTML + `            
                <div class="col-2">
                    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42">
                    <div class="weather-forecast-temperature">
                        <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span> 
                        <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
                    </div>
                </div>
    `;}
});
    forecastHTML=forecastHTML+`</div>`;
    forecastElement.innerHTML=forecastHTML;
}

let celsiusTemperature= null;

let form=document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit)

let farenheitLink=document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemperature)

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature)


search("Paris");
/* displayForecast(); */