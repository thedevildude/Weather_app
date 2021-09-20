// This app works with ACCU WEATHER API

const key = 'xxxxxxxxx'; // replace the value with your own ACCU Weather API_KEY

const key = process.env.ACCU_API_KEY
console.log(key)

// get weather information

const getWeather = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
    
    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};


// get city information
const getCity = async (city) => {


    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};