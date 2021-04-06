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

function displayTemperature(response) {
    console.log(response.data);

    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);

    let cityElement=document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;

    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let windElement=document.querySelector("#wind");
    windElement.innerHTML = response.data.wind.speed;

    let dateElement=document.querySelector("#date");
    dateElement.innerHTML=formatDate(response.data.dt*1000);

    let iconElement=document.querySelector("#weather-icon");
    iconElement.setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description)
}


function search(city) {
let apiKey='0ae703064e17d8cb6a410a5138e15a28';
let unit='Metric';
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`

axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value)
}

search("New York");

let form=document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit)