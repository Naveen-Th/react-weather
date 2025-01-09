
import './App.css'
import { Search } from './Search';
import { useEffect, useState } from 'react';
import { Weather } from './Weather';
import { Weather_Api } from './api';

function App() {

  const [selected,setSelected] = useState('');
  const [currentWeather,setCurrentWeather] = useState(null);

  const handleSelected = (selectedVal) =>{
    console.log(selectedVal);
    setSelected(selectedVal);
  }

  const fetchWeather = async () => { 
      const res = await fetch(`${Weather_Api}&q=${selected?.value}&aqi=yes`);
      const data = await res.json();
      setCurrentWeather(data);
  }
  console.log(currentWeather?.current?.uv)
   useEffect(() => {
      fetchWeather();
   },[selected])
   
  return (
    <>
    
      <Weather onWeather={currentWeather}>
        <Search onSearch={handleSelected}></Search>
      </Weather>
    </>
  )
}

export default App
