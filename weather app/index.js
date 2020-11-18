const api = {
  key: "17cdd2858cea05d88600cd93a1b86a12",
  base: "https://openweathermap.org/"
}

const searchbox = document.querySelector('.search');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}


function displayResults(weather) {
    let city = document.querySelector('.place .city');
    city.innterText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.place .date');
    date.innterText = dateBuilder(now);

    let temp = document.querySelector('.recent .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_1 = document.querySelector('.recent .weather');
    weather_1.innterText = weather.weather[0].main;

    let highLow = document.querySelector('high-low');
    highLow.innterText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    function dateBuilder (d){
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return 
            `${day} ${date} ${month} ${year}`
        

    }
}