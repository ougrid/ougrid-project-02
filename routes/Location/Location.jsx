import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import "./Location.css"
//test01
/* eslint-disable jsx-a11y/iframe-has-title */

const Location = (props) => { 
  let [searchIsClicked, setSearchIsClicked] = useState(false)
  // let [distanceMatrix, setDistanceMatrix] = useState({})
  let [distanceMatrix, setDistanceMatrix] = useState({
    rows: [
      {
        elements: [
          {
            distance: { text: "-" },
            duration: { tect: "-" },
          },
        ],
      },
    ],
  })

  let viewModeMapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAKTrFvbtk4kDWfBuxOTRwXsH0fYg1CuHc&center=13.674182,100.608406&q=13.674182,100.608406&zoom=15"
  // let searchLocationUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20Siam&inputtype=textquery&fields=formatted_address%2Cname%2Copening_hours%2Cgeometry&key="
  let searchLocationUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20Siam&inputtype=textquery&fields=formatted_address%2Cname%2Copening_hours%2Cgeometry&key=AIzaSyAKTrFvbtk4kDWfBuxOTRwXsH0fYg1CuHc"
  let destinationMapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAKTrFvbtk4kDWfBuxOTRwXsH0fYg1CuHc&q=Eiffel+Tower,Paris+France"
  let googleMapsKey = props.googleMapsKey

  
  let latitude = props.locationData.location.lat
  console.log(latitude);
  let longitude = props.locationData.location.lng
  console.log(longitude);

  const getDistanceMatrix = () => {
    let destinationLatitude = props.destinationData.candidates[0].geometry.location.lat
    let destinationLongitude = props.destinationData.candidates[0].geometry.location.lng
    let distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${latitude}%2C${longitude}&destinations=${destinationLatitude}%2C${destinationLongitude}&key=`
    // useEffect(() => {
      const url = distanceMatrixUrl + googleMapsKey;
  
      axios
        .post(url)
        .then((res) => res)
        .then((res) => {
          let distanceMatrix = res.data;
          setDistanceMatrix(distanceMatrix);
        })
        .catch((err) => {
          console.error(err);
        });
    // }, []);

    console.log(distanceMatrix, typeof distanceMatrix);
  }

  // getDistanceMatrix()

  const searchedDestinationCheck = () => {
    let status = "-"
    let name = "-"
    let distance = "-"
    let duration = "-"
    if (searchIsClicked === false) {
      return [status, name, distance, duration]
    } else if (searchIsClicked === true) {
      if (props.destinationData.status !== "OK") {
        return [status, name, distance, duration]
      } else {
        name = props.destinationData.candidates[0].name
        status = "Found"
        distance = distanceMatrix.rows[0].elements[0].distance.text
        duration = distanceMatrix.rows[0].elements[0].duration.text
      }
    }
    return [status, name, distance, duration]
  }

  let [status, name, distance, duration] = searchedDestinationCheck()
  
  return (
    <div id="location-page">
      <p>--------------------------------------</p>
      <h1>This is the location page!</h1>
      <Container className="p-3">
        <div id="current-location">
          <strong>Your Current Location</strong>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          <iframe
            width="450"
            height="250"
            frameBorder="0"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            src={viewModeMapUrl}
            allowFullScreen
          ></iframe>
        </div>
      </Container>
      <Container className="p-5 mb-4 bg-light rounded-3">
        <div id="search-destination">
          <strong>Your Destination</strong>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              console.log("search btn clicked");
              setSearchIsClicked(true)
              props.GetDestinationData(props.destination)
              getDistanceMatrix()
            }}
          >
            <input
              type="text"
              placeholder="Type your destination"
              // name="destination"
              onChange={(e) => {
                let formattedDestination = e.target.value.trim().replace(/\s+/g, "+")
                props.setDestination(formattedDestination)
              }}
              id="place-input"
            />
            <button type="submit" className="rounded-5">Search</button>
          </form>
          {/* <p>Status: {props.destinationData.status === "OK" ? "Found" : "Not Found"}</p> */}
          <p>Status: {status}</p>
          <p>Name: {name}
          </p>
          <iframe
            width="450"
            height="250"
            frameBorder="0"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            // src={searchLocationUrl + googleMapsKey}
            // src={destinationMapUrl}
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAKTrFvbtk4kDWfBuxOTRwXsH0fYg1CuHc&q=${props.destination}`}
            allowFullScreen
          ></iframe>
        </div>
      </Container>
      <p>--------------------------------------</p>
      {/* <Destination /> */}
      <div id="distance-matrix">
        <p>Distance: {distance}</p>
        <p>Duration: {duration}</p>
      </div>
    </div>
  )
}

export default Location;

