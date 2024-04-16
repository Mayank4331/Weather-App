import { useState } from "react";
import "./home.css";
import axios from "axios";
const Home=()=>{
    const [data,setData]=useState({
        celcius:10,
        name: 'London',
        humidity: 10,
        speed:2
    })
    const [name,setName]=useState('');
    const [error,setError]=useState('');

    const handleClick =()=>{
        if(name!==""){
            const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=fadcda03a5f6c9bbf47b89f8bdb5949d&units=metric`;
            axios.get(apiUrl)
            .then(res=>{
               console.log(res.data);
                 setData({...data, celcius:res.data.main.temp, name:res.data.name, humidity: res.data.main.humidity,
              speed:res.data.wind.speed})
              setError('');
            } )
            .catch(err=>{
              if(err.response.status==404)
              {
                setError("Invalid City Name")
              }else{
                setError('');
              }
            });
        }
    }
    return(
        <div className='container'>
            <div className="weather">
                <div className="search">
                    <input type="text" placeholder="Enter City Name" onChange={e=>setName(e.target.value)}/>
                    <button ><img width="18" height="18" src="/images/search-512.webp" onClick={handleClick} alt=""/></button>
                    </div>
                    <div className="error">
                    <p>{error}</p>
                    </div>
               
               <div className="winfo">
                <img width="200" height="200" src="\images\Sun-And-Cloud-PNG-Transparent.webp" alt="" className="" />
                <h1>{Math.round(data.celcius)}°c</h1>
                <h2>{data.name}</h2>
                <div className="details">
                    <div className="col">
                     <img width="100" height="100" src="\images\360_F_268977836_78pSbm1Ux99G0grwUOnRAK0VP6J101my.webp" alt="" className="" />
                   <div className="humidity">
                    <p>{Math.round(data.humidity)}%</p>
                    <p>Humidity</p>
                    </div> 
                    </div>
                    <div className="col">
                    <img width="100" height="100" src="\images\wind-blowing.webp" alt="" className="" />
                    <div className="wind">
                    <p>{Math.round(data.speed)} km/h</p>
                    <p>Wind</p>
                    </div>
                    </div>
                    </div>
                </div>
               </div> 
            </div>
     
       
    )
};
export default Home;