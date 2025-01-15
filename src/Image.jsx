import React, { useEffect } from "react";
import PartlyCloudyImg from './assets/Partly cloudy.svg';
import PartlyCloudyNight from './assets/partly-cloudy-night.svg'
import RainyImg from './assets/Patchy rain nearby.svg';
import SunnyImg from './assets/clear-day.svg';
import Snow from './assets/snow.svg';
import clearNight from './assets/clear-night.svg';
import Mist from './assets/mist.svg';
import overCast from './assets/overcast-day.svg';
import Rain from './assets/rain.svg';
import Clear from './assets/clear-day.svg';
import Not from './assets/not-available.svg';
import Cloudy from './assets/cloudy.svg';
import Drizzel from './assets/drizzle.svg'
/*
import CloudyImg from './assets/Cloudy.svg'; */// Replace with actual paths

export const Image = ({ onCondition }) => {
    useEffect(() => {
        console.log(onCondition);
    }, [onCondition]);

    // Function to return the image based on the condition
    const getImage = (condition) => {
        switch (condition) {
            case "Sunny":
                return SunnyImg;
                
            case "Patchy rain nearby":
                return RainyImg;
            case "Snow":
            case "Light snow":
                return Snow;
            case "Night":
                return clearNight;
            case "Mist":
                return Mist
            case "Overcast":
                return overCast
            case "Rain":
            case "Moderate rain":
            case "Light rain":
                return Rain;
            case "Clear":
                return Clear;
            default:
                return PartlyCloudyImg; // Default to Partly Cloudy if no condition matches
        }
    };

    return (
        <>
            <div className="w-36 h-36 pt-3 ml-10 md:ml-0">
                <img className="w-36 h-36 will-change-auto" src={getImage(onCondition)} alt={onCondition} />
            </div>
        </>
    );
};

export const HourlyImg = ({ condition, day }) => {
  
    // Function to get the correct image based on condition and whether it's day or night
    const getImage = (condition, day) => {
      const isDay = Boolean(day); // Ensure 'day' is treated as a boolean (true = day, false = night)
  
      console.log('Condition:', condition);  // Debugging
      console.log('Is Day:', typeof isDay);  // Debugging
      
      switch (condition) {
        case "Sunny":
          return isDay ? SunnyImg : clearNight;  // If day, show sunny, else show night clear image
  
        case "Patchy rain nearby":
          return isDay ? RainyImg : RainyImg;  // You might want to use different images for day/night
  
        case "Snow":
        case "Light snow":
          return isDay ? Snow : Snow;  // You may want different images for snow as well
  
        case "Mist":
          return isDay ? Mist : Mist;  // You might want different images for Mist as well
  
        case "Overcast":
          return isDay ? overCast : overCast;  // Overcast is same for day/night but check the image you want
        case "Light drizzle":
            return Drizzel;
            
        case "Partly Cloudy ":
          return isDay ? PartlyCloudyImg : PartlyCloudyNight; 
        case "Cloudy ":
            return Cloudy;
        case "Rain":
        case "Light rain shower":
        case "Moderate rain":
        case "Light rain":
          return isDay ? RainyImg : RainyImg;  // You might want different rain images for day/night
  
        case "Clear ":
          return isDay ? SunnyImg : clearNight;  // Clear for day and night
  
        default:
          return Not;  // Fallback image
      }
    };
  
    return (
      <div className="w-16 h-16 md:ml-0">
        <img className="w-16 h-16 object-contain" src={getImage(condition, day)} alt={condition} />
      </div>
    );
  };