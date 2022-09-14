const city = document.getElementById('city-name');
const temp = document.getElementById('temp');
const descr = document.getElementById('description');
const windspeed = document.getElementById('wind-info');
const humidity = document.getElementById('humidity-info');
const feelslike = document.getElementById('feelslike-info');
const userInput = document.getElementById('search-input');
const currTime = document.getElementById('city-time');

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
        weather.icon = data.weather[0].icon.slice(0, 2); //slice to get the right icon pic
        weather.temperature = data.main.temp;
        weather.description = data.weather[0].description;
        weather.city = data.name;
        weather.wind = data.wind.speed;
        weather.humidity = data.main.humidity;
        weather.feelslike = data.main.feels_like;
        weather.timezone = formatTime(data.timezone, data.dt, data.sys.sunrise, data.sys.sunset); //get all needed values formatted (hours and timezone)
        console.log(weather.timezone);
        return weather
    })
    .then(obj => {
        addToDom(obj);
    })
    .catch(error => {
        alert('Oops something went wrong')
    })
    })
}


//manipulate dom with api data
function addToDom(obj){
    city.textContent = obj.city;
    temp.textContent = Math.round(obj.temperature);
    descr.textContent = obj.description;
    windspeed.textContent = Math.round((obj.wind) * 3.6); 
    humidity.textContent = obj.humidity;
    feelslike.textContent = Math.round(obj.feelslike);
    currTime.textContent = obj.timezone.currentZone;
    document.getElementById('weather-icon').src = `./icons/${obj.icon}.png`

    //changeBackground(obj.isDayTime, obj.icon);
}

function formatTime (timezone, timestamp, sunrise, sunset){
    // moment.unix - Unix Timestamp (seconds)
    const dateTime = moment.unix(timestamp).utc().add(timezone, 's');
    const sunrTime = new Date(sunrise * 1000);
    const sunsTime = new Date(sunset * 1000);

    const dateTimeFormatted = moment(dateTime).format('MMMM Do YYYY, HH:mm:ss');
    //convert times to hours
    const currHour = parseInt(moment(dateTime).format('HH'));
    const sunrHour = parseInt(moment(sunrTime).format('HH'));
    const sunsHour = parseInt(moment(sunsTime).format('HH'));
    //const dayInfo = getCurrentHour(currHour, sunrHour, sunsHour);

    //save everything to an object to return it all
    let currentTime = {
        currentZone: dateTimeFormatted,
        currentHour: currHour,
        sunriseHour: sunrHour,
        sunsetHour: sunsHour,
    }

    return currentTime
}

/*
DOES NOT WORK RN
//check if it is currently night time or day time, needed for background change
function getCurrentHour(current, sunrise, sunset){
    let isDay = 'yes';
    if (purrent > sunrise && current < sunset){ //daytime
        isDay = 'no';
    };

    return isDay;
}

function changeBackground(dayTime, icon) {
    //if its night time
    if (dayTime === 'yes'){
        if (icon === '02' || icon === '03' || icon === '04' ){ //clouds
            document.body.style.backgroundImage =  `url('./img/cloudy-night.jpg')`;
        } else if (icon === '01' ){ //clear sky
            document.body.style.backgroundImage =  `url('./img/clear-night.jpg')`;
        } else if (icon === '09' || icon === '10'){ //rain
            document.body.style.backgroundImage =  `url('./img/rainy-night.jpg')`;
        } else if (icon === '11'){ //thunder
            document.body.style.backgroundImage =  `url('./img/thunder.jpg')`;
        } else if (icon === '13') { //snow
            document.body.style.backgroundImage =  `url('./img/snow-night.jpg')`;
        } else if (icon === '50') { //mist
            document.body.style.backgroundImage =  `url('./img/mist-night.jpg')`;
        }
    } else {
        if (icon === '02' || icon === '03' || icon === '04' ){ //clouds
            document.body.style.backgroundImage =  `url('./img/cloudy-day.jpg')`;
        } else if (icon === '01' ){ //clear sky
            document.body.style.backgroundImage =  `url('./img/clear-day.jpg')`;
        } else if (icon === '09' || icon === '10'){ //rain
            document.body.style.backgroundImage =  `url('./img/rainy-day.jpg')`;
        } else if (icon === '11'){ //thunder
            document.body.style.backgroundImage =  `url('./img/thunder.jpg')`;
        } else if (icon === '13') { //snow
            document.body.style.backgroundImage =  `url('./img/snow-day.jpg')`;
        } else if (icon === '50') { //mist
            document.body.style.backgroundImage =  `url('./img/mist-day.jpg')`;
        }
    }
}

*/
//tallinn by default
fetchData('Tallinn');