const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const updateUI = (data) => {
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    // Destructuring - the above commented code is same as down below

    const { cityDets, weather } = data;

    // update detail templates

    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the night/day and icon images

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    timeSrc = null
    if(weather.IsDayTime) {
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }

    time.setAttribute('src', timeSrc);

    // remove the d-none class if present

    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

const updateCity = async (city) => {
    
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather }; // Object Shorthand feature - cityDets: cityDets is same as writing cityDets
};

cityForm.addEventListener('submit', e => {
    // Prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update UI with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
};

