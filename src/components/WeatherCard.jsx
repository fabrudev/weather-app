import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import './WeatherCardStyles.css';

const WeatherCard = () => {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ weather, setWeather ] = useState({});

    const kelvin = weather.main?.temp;
    const kelvinMin = weather.main?.temp_min;
    const kelvinMax = weather.main?.temp_max;
    const kelvinFeelsLike = weather.main?.feels_like;

    const farenheit = (kelvin - 273.15) * 9/5 + 32;
    const farenheitMin = (kelvinMin - 273.15) * 9/5 + 32;
    const farenheitMax = (kelvinMax - 273.15) * 9/5 + 32;
    const farenheitFeelsLike = (kelvinFeelsLike - 273.15) * 9/5 + 32;

    let currentDate = new Date();
    let monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthNumber = currentDate.getMonth();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(succes);
    
        function succes (pos) {
            const crd = pos.coords;

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=d1b18195925d0f28f0afeed59754248a`)
                .then(res => {
                    setWeather(res.data);
                    setIsLoading(false);
                });
        }
        
    }, []);

    console.log(weather);
    console.log(kelvinFeelsLike)



    return (
        <>
            {
                isLoading ? (
                    <Loading />
                ) : (
                <div className='card'>

                    <div className="top">

                        <div className="left">
                            <h1>{weather.name}</h1>
                            <h2>{monthString[monthNumber]} {currentDate.getDate()}, {currentDate.getFullYear()}</h2>
                            <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                            <p className='b'>{weather.weather?.[0].description.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</p>
                        </div>

                        <div className="right">
                            <h2>{farenheit.toFixed(1)} ºF</h2>
                            <p className='a'>{farenheitMin.toFixed(1)}º / {farenheitMax.toFixed(1)}º</p>
                        </div>
                    </div>

                <div className="bottom">

                    <div className="info">
                        <h3>Feels Like</h3>
                        <p>{farenheitFeelsLike.toFixed(1)} ºF</p>
                    </div>

                    <div className="info">
                        <h3>Humidity</h3>
                        <p>{weather.main?.humidity}%</p>
                    </div>

                    <div className="info">
                        <h3>Clouds</h3>
                        <p>{weather.clouds?.all}%</p>
                    </div>

                </div>

                </div>
                )
            }
        </>
    );
};

export default WeatherCard;