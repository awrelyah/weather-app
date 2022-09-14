const city = document.getElementById('city-name');
const temp = document.getElementById('temp');
const descr = document.getElementById('description');
const windspeed = document.getElementById('wind-info');
const humidity = document.getElementById('humidity-info');
const feelslike = document.getElementById('feelslike-info');
const userInput = document.getElementById('search-input');

let weather = {};

//handle searching with enter
userInput.addEventListener('keydown', function(e) {
    if (e.code === 'Enter'){
        e.preventDefault();
        let userCity = userInput.value;
        if (userCity !== ''){
            fetchData(userCity);
        } else {
            alert('Enter a city');
        }
    }
})

//fetch data from weather api and save to weather object
function fetchData(city){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=aca176e6fd8adc7d0588ad959d655cdb&units=metric`, {mode:`cors`})
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
        console.log(data.message);
        return weather
    })
    .then(obj => {
        addToDom(obj);
    })
    .catch(error => {
        alert('City not found')
    })
    })
}


//manipulate dom with api data
function addToDom(obj){
    city.textContent = obj.timezone;
    temp.textContent = Math.round(obj.temperature);
    descr.textContent = obj.description;
    windspeed.textContent = Math.round((obj.wind) * 3.6); 
    humidity.textContent = obj.humidity;
    feelslike.textContent = Math.round(obj.feelslike);
}

//tallinn by default
fetchData('Tallinn');
