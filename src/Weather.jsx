import React from "react";
import im from './assets/cloud.webp';

export const Weather = ({children,onWeather}) => {
  // Placeholder weather data
  const todayWeather = {
    city: "Gubbi",
    date: "24 Dec, 2023",
    temp: 26,
    high: 27,
    low: 10,
    condition: "Cloudy",
    feelsLike: 26,
    uvIndex: 5,
    windSpeed: "3.3 KP/H",
    humidity: 60,
    sunrise: "6:45 AM",
    sunset: "5:30 PM",
  };
  const hourlyWeather = [
    { time: "1PM", temp: '20' },
    { time: "2PM", temp: '21' },
    { time: "3PM", temp: '20' },
    { time: "4PM", temp: '19' },
    { time: "5PM", temp: '18' },
    { time: "6PM", temp: '17' },
  ];

  return (
    <div className=" style.bg min-h-screen text-white font-sans" style={{background:'#060C1A'}}>
      <div className="container mx-auto px-4 py-8">

        
        <div className="grid grid-cols-1 md:grid-cols-3  gap-12 mt-6">
            <div className="col-span-3 md:col-span-3 lg:col-span-2 ">
                {children}
            </div>
            <div className="p-5 md:p-10 col-span-3 md:col-span-3 lg:col-span-2 bg-indigo-950 rounded-3xl" style=  {{background:'#0E1421'}}>
              <div className="grid grid-cols-2">
                  <div>
                    <button className="shadow-md shadow-violet-500 text-sm bg-violet-500 rounded-3xl px-5 py-1 text-center font-semibold md:text-lg">
                      <i className="fa-duotone fa-light fa-location-dot fa-fade mr-1"></i>
                      {onWeather?.location?.name}</button>
                    <h1 className="text-xl md:text-5xl  mt-8">Monday</h1>
                    <p className="mt-2 text-base text-slate-300">{todayWeather.date}</p>
                    <h3 className="text-xl md:text-5xl mt-7">{Math.round(onWeather?.current?.temp_c)}°</h3>
                    <p className="mt-2 text-base text-slate-300">High: {Math.round(onWeather?.forecast?.forecastday[0]?.day?.maxtemp_c)} | Low: {todayWeather.low}</p>
                  </div>
                  <div className="mt-0 flex items-end justify-center flex-col">
                      <img src={onWeather?.current?.condition?.icon} className="md:w-36 md:h-36 h-16 w-20 " />
                      <h4 className="mt-0 text-3xl font-extralight">{onWeather?.current?.condition?.text}</h4>
                      <p className="mt-3 text-base text-slate-300">Feels Like {todayWeather.feelsLike}°C</p>
                  </div>
                </div>
            </div>

            <div className="p-7 'bg-indigo-950' rounded-3xl row-span-2 col-span-3 md:col-span-3 lg:col-span-1" style={{background:'#0E1421'}}>
                <h4 className="text-lg">Today Highlight</h4>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 mt-3 gap-5">
                  <div className="bg-indigo-900 p-3 rounded-2xl">
                    <h1>Chance Of Rain: 20%</h1>
                  </div>

                  <div className={`${(onWeather?.current?.uv) >= 5 ? 'bg-red-400 text-black' :'bg-indigo-900'} 
                  ${(onWeather?.current?.uv) > 5  ? 'bg-green-300 text-black' :'bg-indigo-900'} p-5 rounded-2xl`}>
                      <div className="flex items-center">
                        <i className="fa-light fa-temperature-list text-lg"></i>
                        <h1 className="ml-2">UV Index</h1>
                      </div>
                      <div className="mt-4">
                          <h1 className="text-4xl">{Math.round(onWeather?.current?.uv)}</h1>
                          <h4 className="text-xl">
                            {onWeather?.current?.uv >= 0 && onWeather?.current?.uv <= 2 && 'Very Good'}
                            {onWeather?.current?.uv >=3 && onWeather?.current?.uv <= 5 && 'Moderate'}
                            {onWeather?.current?.uv >=6 && onWeather?.current?.uv <= 7 && 'High'}
                            {onWeather?.current?.uv >=8 && onWeather?.current?.uv <= 10 && 'Very High'}
                            {onWeather?.current?.uv > 10 && 'Extreme'}
                          </h4>
                          <label for="disabled-range-slider-usage" class="sr-only">Example range</label>
                            <input type="range" className="range-slider w-full" min="0" max="10" value={onWeather?.current?.uv} readOnly />
                          <p className="text-xs">
                          {onWeather?.current?.uv > 10 && 'Compulsory use sun protection'}
                            {onWeather?.current?.uv > 5 && onWeather?.current?.uv < 10 && 'Cover your body'}
                            {onWeather?.current?.uv > 1 && onWeather?.current?.uv < 5 && 'Use Sunscreen'}
                            {onWeather?.current?.uv === 0 && 'No Sunscreen is recommeded'}
                          </p>
                      </div>
                  </div>

                  <div className="bg-indigo-900 p-3 rounded-2xl">
                    <h1>Wind Status: {todayWeather.windSpeed}</h1>
                  </div>
                  <div className="bg-indigo-900 p-3 rounded-2xl">
                    <p>Humidity: {todayWeather.humidity}%</p>
                  </div>
                </div>
            </div>

            <div className="grid grid-cols-4 col-span-3 lg:col-span-2 md:col-span-3  gap-x-4 md:gap-x-4 lg:gap-5">
                <h4 className="col-span-3 text-lg ">Today/Week</h4>
              
                    <div className="p-3 rounded-2xl gap-x-3 text-center grid grid-cols-3 md:col-span-3 col-span-3  md:grid-cols-6 mt-7" style={{background: 'linear-gradient(250deg, #0E1421 0% 10% , #1D325F 50% 100% , #0E1421 100% 100%)'}}>
                      {hourlyWeather.map((hour) => (
                        <div key={hour.time} className="bg-white bg-opacity-5 rounded-2xl border-2 border-x-slate-300  p-2 flex flex-col justify-center items-center w-16">
                            <p className="font-light">{hour.time}</p>
                            <img className="mt-2" src="./assets/cloud.webp" alt="Weather Icon" />
                            <p className="mt-2 font-light">{hour.temp}°</p>
                        </div>
                      ))}
                    </div>
        
                  <div className="bg-slate-500 rounded-3xl p-5 mt-5  col-span-0 row-span-0 md:row-span-2 md:col-span-0" style={{background:'#0E1421'}}>
                    <h3 className="">Sunrise</h3>
                    <p className="">{todayWeather.sunrise}</p>
                    <h3 className="">Sunset</h3>
                    <p className="">{todayWeather.sunset}</p>
                  </div>
                  
                  <div className="mt-16 flex p-5 rounded-3xl col-span-2 md:col-span-3" style={{background: 'linear-gradient(250deg, #0E1421 0% 10% , #1D325F 50% 100% , #0E1421 100% 100%)'}}>
                      <div>
                        <h4 className="text-white">Tomorrow</h4>
                        <p className="text-slate-500">Thunderstorm</p>
                      </div>
                      <div className="align-">
                        <h1 className="text-4xl font-light ml-4">{Math.round(onWeather?.forecast?.forecastday[0]?.day?.maxtemp_c)}°</h1>
                      </div>
                  </div>
            </div>
      </div>
    </div>
    
    
</div>

  );
};