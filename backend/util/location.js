const axios = require("axios");
const HttpError = require("../models/http-error");
// const API_KEY = "pk.0a8ef5f905b4aaf8fb68f134c0da4969";
const API_KEY = process.env.GOOGLE_API_KEY;

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
      address
    )}&format=json`
  );

  const data = response.data[0];

  console.log(data);

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coorLat = data.lat;
  const coorLon = data.lon;
  const coordinates = {
    lat: coorLat,
    lng: coorLon,
  };

  return coordinates;
}

module.exports = getCoordsForAddress;
/*



location using google api

const axios = require("axios");
const HttpError = require("../models/http-error");
const API_KEY = "AIzsjsjjejd28282jensdnnsd";

//dummy function to use
async function getCoordsForAddress(address) {
  // fall back u dont have a credit card
  //   return { lat: 40.7484474, lng: -73.987156 };
  // sending request from our node server to another server
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
}

module.exports = getCoordsForAddress;

*/
