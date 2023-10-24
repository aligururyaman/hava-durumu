import './App.css'
import React from "react";
import { useState } from "react";
import axios from "axios";



function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const [secili,setSecili] = useState("tr");
  const secenekler = ["tr","eng"];
  const [pic, setPic] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=${secili}&appid=73fe1040367ba6801e5b9eec89465e0e&units=metric`;
  


  const aramaBolgesi = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((response) => {
        
        setData(response.data)
        console.log(response.data)
      })
    }
  }
  




  return (
    <div className="app">
      <div className="arama">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={aramaBolgesi}
          placeholder="Lütfen Şehir Girin"
          type="text"
        />
        <select value={secili} onChange={e => setSecili(e.target.value)}>
          {secenekler.map(secenek => (
          <option key={secenek} value={secenek}>
            {secenek}
            </option>))}
        </select>
      </div>
      <div className="container">
        <div className="ustkisim">
          <div className="sehir">
            <p>{data.name}</p>
          </div>
          <div className="sicaklik">
            {data.main ? <h1>{data.main.temp} °C</h1> : null}
          </div>
          <div className="durum">
            {data.main ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        <div className="altkisim">
          <div className="hissedilen">
            {data.main ? <p>{data.main.feels_like}°C</p> : null}
            <p>Gibi Hissetiriyor</p>
          </div>
          <div className="nem">
            {data.main ? <p>{data.main.humidity}%</p> : null}
            <p>Nem</p>
          </div>
          <div className="ruzgar">
            {data.main ? <p>{data.wind.speed}</p> : null}
            <p>Rüzgar Hızı</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App
