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
import Drizzel from './assets/drizzle.svg';
import FogDay from './assets/animation-ready/fog-day.svg';
import FogNight from './assets/animation-ready/fog-night.svg';
/*
import CloudyImg from './assets/Cloudy.svg'; */// Replace with actual paths

export const Image = ({ onCondition }) => {


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
            case "Partly cloudy":
                return  PartlyCloudyNight; 
            default:
                return Not; 
        }
    };

    return (
        <>
            <div className="md:w-36 md:h-36 pt-3 ml-10 md:ml-0 w-28 h-28">
                <img 
                    className="md:w-36 md:h-36 w-28 h-28" 
                    src={getImage(onCondition)} 
                    alt={onCondition} 
                />
            </div>

        </>
    );
};

export const HourlyImg = ({ condition, day }) => {
  
    useEffect(() => {
      
    },[condition,day])
    
    const getImage = (condition, day) => {
      const isDay = Boolean(day); 
      
      switch (condition) {
        case "sunny":
          return isDay ? SunnyImg : clearNight;  
  
        case "patchy rain nearby":
          return isDay ? RainyImg : RainyImg;  
        case "fog":
          return isDay ? FogDay : FogNight;
        case "snow":
        case "light snow":
          return isDay ? Snow : Snow;  
  
        case "mist":
          return isDay ? Mist : Mist;  
  
        case "overcast":
          return isDay ? overCast : overCast;
        
        case 'patchy light drizzle':
        case "light drizzle":
            return Drizzel;
        
        case "partly cloudy":
          return isDay ? PartlyCloudyImg : PartlyCloudyNight; 
        case "cloudy":
            return Cloudy;

        case "rain":
        case "light rain shower":
        case "moderate rain":
        case "light rain":
          return isDay ? RainyImg : RainyImg;  // You might want different rain images for day/night
  
        case "clear":
          return isDay ? SunnyImg : clearNight;  // Clear for day and night
  
        default:
          return Not;  // Fallback image
      }
    };
  
    return (
      <div className="w-10 h-10 md:w-16 md:h-16">
        <img className="w-10 h-10 md:w-16 md:h-16 object-contain" src={getImage(condition, day)} alt={condition} />
      </div>
    );
  };