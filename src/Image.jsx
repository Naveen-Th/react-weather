import React, { useEffect } from "react";
import PartlyCloudyImg from './assets/Partly cloudy.svg';
import RainyImg from './assets/Patchy rain nearby.svg';
import SunnyImg from './assets/clear-day.svg';
import Snow from './assets/snow.svg';
import clearNight from './assets/clear-night.svg';
import Mist from './assets/mist.svg';
import overCast from './assets/overcast-day.svg';
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
