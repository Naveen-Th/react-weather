
const key = '00c51d2c01d944c9943153140250301';
const key1 = '208d7ce204b3524de38d30d2c08209a7';
export const Api_Url = `https://api.weatherapi.com/v1/search.json?key=${key}`; 
export const Weather_Api = `https://api.weatherapi.com/v1/forecast.json?key=${key}&days=10`;

export const Open_Weather = `https://api.openweathermap.org/data/2.5/forecast?appid=${key1}`;
/*export const Open_Weather1 = `https://api.openweathermap.org/data/2.5/weather?appid=${key1}`; */
export const air = `http://api.openweathermap.org/data/3.0/onecall?lat=13.3106&lon=76.9444&exclude=hourly,daily&appid=${key1}`