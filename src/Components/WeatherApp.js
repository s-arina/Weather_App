import '../CSS/WeatherApp.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCards from './WeatherCards';
import MobilePreview from './MobilePreview';
import Landing from './Landing';
function WeatherApp() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [permission, setPermission] = useState('');

  useEffect(() => {
    // permissions api
    if (permission !== 'granted') {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (permissionStatus) {
          setPermission(permissionStatus.state);

          permissionStatus.onchange = function () {
            setPermission(this.state);
          };
        });
    }
  }, [permission]);

  useEffect(() => {
    // api call runs on refresh
    setLoading(true);
    fetchLocation();
    postCoords();
  }, [lat, long]);

  const postCoords = () => {
    const payload = {
      lat: lat,
      long: long,
    };
    try {
      axios.post('/api', payload).then((res) => {
        console.log(res.data);
        setWeatherData(res.data);
        setLoading(false);
      });
    } catch {
      console.log(
        'Error: Could not retrieve current position. Please try again.'
      );
    }
  };

  // api call for 3 day forecast
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    } else {
      console.log('Geolocation is not supported in this browser.');
    }
  };

  return (
    <div className='weather-app'>
      {permission !== 'granted' && <Landing permission={permission} />}
      {permission === 'granted' && loading && (
        <h3 className='loading-msg'>Fetching data...</h3>
      )}
      {weatherData?.current && weatherData?.location && (
        <WeatherCards
          weatherData={weatherData}
          setLat={setLat}
          setLong={setLong}
        />
      )}
    </div>
  );
}

export default WeatherApp;
