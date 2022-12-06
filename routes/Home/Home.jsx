import React from "react";
import ToDo from "../ToDo/ToDo";
import Location from '../Location/Location';
import AirQuality from "../AirQuality/AirQuality";

const Home = (props) => {
  return (
    <div>        
      <h1>This is the homepage!</h1>
      <strong>Contents from To-do Page:</strong>
      <div>
        {/* <ToDo /> */}
      </div>
      <strong>Contents from Location Page:</strong>
      {/* <div>
        <Location />
      </div> */}
      <strong>Contents from Air Quality Page:</strong>
      {/* <AirQuality props={props}/> */}
    </div>
  )
}

export default Home;