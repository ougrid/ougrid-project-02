// import React, { useState, useEffect } from 'react';
// import "./AirQuality.css"
// import level1 from "../../img/1-green-aqi-0-50.png"
// import level2 from "../../img/2-yellow-aqi-51-100.png"
// import level3 from "../../img/3-orange-aqi-101-150.png"
// import level4 from "../../img/4-red-aqi-151-200.png"
// import level5 from "../../img/5-purple-aqi-201-300.png"
// import level6 from "../../img/6-maroon-aqi-301.png"

// const AirQuality = (props) => { 
//   let latitude = props.locationData.location.lat
//   console.log(latitude);
//   let longitude = props.locationData.location.lng
//   console.log(longitude);
//   let currentLocationCity = props.airQualityData.city
//   let currentLocationState = props.airQualityData.state
//   let currentLocationAqi = props.airQualityData.current.pollution.aqius 

//   let destinationLatitude = props.destinationData.candidates[0].geometry.location.lat
//   let destinationLongitude = props.destinationData.candidates[0].geometry.location.lng
//   let destinationLocationCity = props.destinationAirQualityData.city
//   let destinationLocationState = props.destinationAirQualityData.state
//   let destinationLocationAqi = props.destinationAirQualityData.current.pollution.aqius 

//   const destinationAirQualityUrl = `http://api.airvisual.com/v2/nearest_city?lat=${destinationLatitude}&lon=${destinationLongitude}&key=`;
//   const airQualityKey = "eb24315d-d6a1-4146-a1a1-45ec7ff54030"
  
//   const assessAqi = aqi => {
//     let aqiMessage = ""
//     let aqiImageSource = ""
    
//     if (aqi > 301) {
//       aqiMessage = "Harzadous"
//       aqiImageSource = level6
//     } else if (aqi > 201) {
//       aqiMessage = "Very Unhealthy"
//       aqiImageSource = level5
//     } else if (aqi > 151) {
//       aqiMessage = "Unhealthy"
//       aqiImageSource = level4
//     } else if (aqi > 101) {
//       aqiMessage = "Unhealthy for Sensitive Groups"
//       aqiImageSource = level3
//     } else if (aqi > 51 ) {
//       aqiMessage = "Moderate"
//       aqiImageSource = level2
//     } else {
//       aqiMessage = "Good"
//       aqiImageSource = level1
//     }
//     return [aqiMessage, aqiImageSource]
//   }

//   let [aqiMessage, aqiImageSource] = assessAqi()

//   assessAqi(currentLocationAqi)

//   const GetDestinationAirQuality = () => {
//     useEffect(() => {
//       const url = destinationAirQualityUrl + airQualityKey;
  
//       fetch(url)
//         .then((res) => res.json())
//         .then((res) => {
//           let newDestinationAirQuality = res.data;
//           props.setDestinationAirQualityData(newDestinationAirQuality);
//           console.log(`From DesAqi Axios.then: ${props.destinationAirQualityData}`, typeof props.destinationAirQualityData);
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }, []);

//     console.log(`After DesAqi Axios.then: ${props.destinationAirQualityData}`, typeof props.destinationAirQualityData);
//     console.log(props.destinationAirQualityData, typeof props.destinationAirQualityData);
//   }

//   GetDestinationAirQuality()

//   let [destinationAqiMessage, destinationAqiImageSource] = assessAqi(props.destinationAirQualityData)
  
//   return (
//     <div id="air-quality-page">
//       <div id="current-location-aqi">
//         <h1>This is the air quality page!</h1>
//         <p>Current Location: {currentLocationCity}, {currentLocationState}</p>
//         <p>Current Geolocation: {latitude}, {longitude}</p>
//         <img src={aqiImageSource} alt="" />   
//         <p>Air Quality Level: {currentLocationAqi}, {aqiMessage}</p>
//         <p>Wear Protective Mask: {(aqiMessage !== "Good" || aqiMessage !== "Moderate Level") ? "No" : "Yes"}</p>
//       </div>
//       <div id="destination-aqi">
//         <strong>Your Destination Data</strong>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault()
//             console.log("search btn clicked");
//             // props.GetDestinationData(props.destination)
//             props.GetDestinationData(props.destination)
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Type your destination"
//             onChange={(e) => {
//               let formattedDestination = e.target.value.trim().replace(/\s+/g, "+")
//               props.setDestination(formattedDestination)
//             }}
//             id="place-input"
//           />
//           <button type="submit">Search</button>
//         </form>
//         <p>Destination Location: {destinationLocationCity}, {destinationLocationState}</p>
//         <p>Destination Geolocation: {latitude}, {longitude}</p>
//         <img src={destinationAqiImageSource} alt="" />
//         <p>Air Quality Level: {destinationLocationAqi}, {destinationAqiMessage}</p>
//         <p>Wear Protective Mask: {(destinationAqiMessage !== "Good" || destinationAqiMessage !== "Moderate Level") ? "No" : "Yes"}</p>
//       </div>
//     </div>
//   )
// }

// export default AirQuality;
