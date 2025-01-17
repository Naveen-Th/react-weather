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

export const HourlyImg1 = ({ condition, day }) => {
  
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
    <div className="w-36 h-36 md:w-40 md:h-48">
      <img className="w-36 h-36 md:w-40 md:h-48 object-contain" src={getImage(condition, day)} alt={condition} />
    </div>
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