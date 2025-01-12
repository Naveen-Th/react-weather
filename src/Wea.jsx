import { Open_Weather } from "./api";
import { useEffect } from "react";
import { air } from "./api";

export const Wea = () => { 
    const c = 'Tumkur'
    const fetchWeather = async () => {
        const res = await fetch(`${air}&units=metric`);
        const data = await res.json();
        console.log('Current Air',data);
        
    }
    const forecast = async () => { 
        const res1 = await fetch(`${Open_Weather}&q=${c}&units=metric`);
        const data1 = await res1.json();
        console.log('Forecast',data1);
    }
    useEffect(() => {
        fetchWeather();
        forecast();
     },[c])
    return(
        <>
        </>
    )
 }