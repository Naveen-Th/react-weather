
import './App.css'
import { Search } from './Search';
import { useEffect, useState } from 'react';
import { Weather } from './Weather';
import { Weather_Api } from './api';
import { Open_Weather } from "./api";
import { Wea } from './Wea';

function App() {

  const [selected,setSelected] = useState({value: 'Bangalore', label: 'Bangalore'});
  const [currentWeather,setCurrentWeather] = useState(null);
  const [loading,setLoading] = useState(true);
  const [err,setErr] = useState('')

  const handleSelected = (selectedVal) =>{
    console.log(selectedVal);
    setSelected(selectedVal);
  }

  const fetchWeather = async () => 
    { 
      if(!selected) return;
      try{
      const res = await fetch(`${Weather_Api}&q=${selected.value}&aqi=yes`);
      const data = await res.json();
      console.log(data);
      setCurrentWeather(data);
      await new Promise((resolve) => setTimeout(resolve, 100)); 
      setLoading(false); 
      }catch(err){
        setErr(err)
      }
      finally{
        setErr(false)
      }
    }
   useEffect(() => {
      fetchWeather();
   },[selected])
   
  return (
    <>
      {loading ? <p className='flex items-center justify-center h-96'>Loading...</p> : <Weather onWeather={currentWeather}>
          <Search onSearch={handleSelected}></Search>
        </Weather>
    }
    <Wea></Wea>
    </>
  )
}
export default App
