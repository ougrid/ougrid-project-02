import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, Navigate } from "react-router-dom";
import { TodoistApi } from "@doist/todoist-api-typescript"
import axios from 'axios'
import Home from "./components/Home/Home";
import ToDo from './components/ToDo/ToDo';
import Location from './components/Location/Location';
import AirQuality from './components/AirQuality/AirQuality';
import About from "./components/About/About"
import './App.css';
import botImg from './img/bot-homepage.png'
import redFlare from './img/red-flare.png'
import whiteFlare from './img/white-flare.png'
import ToDoList from './components/ToDoList/ToDoList';

function App() {
  const [locationData, setLocationData] = useState({})
  const [airQualityData, setAirQualityData] = useState({})

  const [destination, setDestination] = useState("True+Digital+Park")
  const [destinationData, setDestinationData] = useState({})
  const [destinationAirQualityData, setDestinationAirQualityData] = useState({})

  const [toDo, setToDo] = useState("")
  const [toDoList, setToDoList] = useState([]) 

  // 'POST' for locationUrl 
  const locationUrl = "https://www.googleapis.com/geolocation/v1/geolocate?key=" 
  let searchLocationUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20Siam&inputtype=textquery&fields=formatted_address%2Cname%2Copening_hours%2Cgeometry&key=AIzaSyAKTrFvbtk4kDWfBuxOTRwXsH0fYg1CuHc"
  const googleMapsKey = "AIzaSyAKTrFvbtk4kDWfBuxOTRwXsH0fYg1CuHc"
  // const airQualityUrl = `http://api.airvisual.com/v2/city?city=Bueng Kum&state=Bangkok&country=Thailand&key=`;
  // const airQualityUrl = `http://api.airvisual.com/v2/nearest_city?lat=${locationData.location.lat}&lon=${locationData.location.lng}&key=`;
  const airQualityUrl = "http://api.airvisual.com/v2/nearest_city?key=";
  const airQualityKey = "eb24315d-d6a1-4146-a1a1-45ec7ff54030"
  // const destinationAirQualityUrl = `http://api.airvisual.com/v2/nearest_city?lat=${destinationLatitude}&lon=${destinationLongitude}&key=`;

  const GetLocation = () => {
    useEffect(() => {
      const url = locationUrl + googleMapsKey;
  
      axios
        .post(url)
        .then((res) => res)
        .then((res) => {
          let newLocation = res.data;
          setLocationData(newLocation);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);

    console.log(locationData, typeof locationData);
  }

  const GetDestinationData = () => {
    
      // let searchLocationUrl = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${destination}&inputtype=textquery&fields=formatted_address%2Cname%2Copening_hours%2Cgeometry&key=AIzaSyAKTrFvbtk4kDWfBuxOTRwXsH0fYg1CuHc`
      let searchLocationUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${destination}&inputtype=textquery&fields=formatted_address%2Cname%2Copening_hours%2Cgeometry&key=AIzaSyAKTrFvbtk4kDWfBuxOTRwXsH0fYg1CuHc`
      const url = searchLocationUrl;
  
      axios
        .get(url)
        .then((res) => res)
        .then((res) => {
          let newDestinationData = res.data;
          setDestinationData(newDestinationData);
          console.log(destinationData);
        })
        .catch((err) => {
          console.error(err);
        });
  
  }

  const GetAirQuality = () => {
    useEffect(() => {
      const url = airQualityUrl + airQualityKey;
  
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          let newAirQuality = res.data;
          setAirQualityData(newAirQuality);
          console.log(newAirQuality, typeof newAirQuality);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);

    console.log(airQualityData, typeof airQualityData);
  }

  const GetDestinationAirQuality = () => {
    useEffect(() => {
      // const url = destinationAirQualityUrl + airQualityKey;
      const url = airQualityUrl + airQualityKey;
  
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          let newDestinationAirQuality = res.data;
          setDestinationAirQualityData(newDestinationAirQuality);
          console.log(newDestinationAirQuality, typeof newDestinationAirQuality);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);

    console.log(destinationAirQualityData, typeof destinationAirQualityData);
  }
  
// http://api.airvisual.com/v2/city?city=Bueng Kum&state=Bangkok&country=Thailand&key=eb24315d-d6a1-4146-a1a1-45ec7ff54030

  return (
    <div>
      {GetLocation()}
      {GetAirQuality()}
      {GetDestinationAirQuality()}
      <nav>
        <Link to="/">
          <div className="container">
            <div className="red-light"></div>
            <img
              id="home-img"
              src={botImg}
              alt="A personal assistant robot linked to the homepage"
            />
            <img id="red-flare" src={redFlare} alt="" />
            <img id="white-flare" src={whiteFlare} alt="" />
          </div>
        </Link>
        <Link to="/to-do">To-do</Link>
        <Link to="/location">Location</Link>
        <Link to="/air-quality">Air Quality</Link>
        <Link to="/about">About</Link>
      </nav>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                GetAirQuality={GetAirQuality}
                airQualityData={airQualityData}
                setAirQualityData={setAirQualityData}
                locationData={locationData}
                setLocationData={setLocationData}
              />
            }
          />
          <Route
            path="/location"
            element={
              <Location
                GetLocation={GetLocation}
                GetDestinationData={GetDestinationData}
                destination={destination}
                destinationData={destinationData}
                setDestinationData={setDestinationData}
                setDestination={setDestination}
                googleMapsKey={googleMapsKey}
                locationData={locationData}
                setLocationData={setLocationData}
              />
            }
          />
          {/* <Route path="/location" element={<Location />} /> */}
          <Route
            path="/to-do"
            element={
              <ToDo
                toDo={toDo}
                setToDo={setToDo}
                toDoList={toDoList}
                setToDoList={setToDoList}
              />
            }
          />
          <Route
            path="/air-quality"
            element={
              <AirQuality
                GetAirQuality={GetAirQuality}
                GetDestinationAirQuality={GetDestinationAirQuality}
                airQualityData={airQualityData}
                setAirQualityData={setAirQualityData}
                locationData={locationData}
                setLocationData={setLocationData}
                GetDestinationData={GetDestinationData}
                destination={destination}
                destinationData={destinationData}
                setDestination={setDestination}
                destinationAirQualityData={destinationAirQualityData}
                setDestinationAirQualityData={setDestinationAirQualityData}
              />
            }
          />
          <Route path="/airquality" element={<Navigate to="/air-quality" />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/stocks" element={<Home />} />
          <Route path="/stock" element={<Navigate to="/stocks" />} />
          <Route
            path="/stocks/:symbol"
            element={<Stock stock={stock} setStock={setStock} />}
          /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App;
   




