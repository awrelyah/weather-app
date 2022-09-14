const city = document.getElementById('city-name');
const temp = document.getElementById('temp');
const descr = document.getElementById('description');
const windspeed = document.getElementById('wind-info');
const humidity = document.getElementById('humidity-info');
const feelslike = document.getElementById('feelslike-info');

let weather = {};

function fetchData(){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=Tallinn&APPID=aca176e6fd8adc7d0588ad959d655cdb&units=metric`, {mode:`cors`})
    .then(function(response) {
        return response.json()
    .then(data => {
        console.log(data);
        weather.temperature = data.main.temp;
        weather.description = data.weather[0].description;
        weather.timezone = data.name;
        weather.wind = data.wind.speed;
        weather.humidity = data.main.humidity;
        weather.feelslike = data.main.feels_like;
        return weather
    })
    .then(obj => {
        addToDom(obj);
    })
    })
}

function addToDom(obj){
    console.log(obj);
    city.textContent = obj.timezone;
    temp.textContent = Math.round(obj.temperature);
    descr.textContent = obj.description;
    windspeed.textContent = Math.round((obj.wind) * 3.6); 
    humidity.textContent = obj.humidity;
    feelslike.textContent = Math.round(obj.feelslike);
}


fetchData();
