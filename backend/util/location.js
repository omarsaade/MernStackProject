const axios = require("axios");
const HttpError = require("../models/http-error");
const API_KEY = "AIzsjsjjejd28282jensdnnsd";

//dummy function to use
async function getCoordsForAddress(address) {
  // fall back u dont have a credit card
  //   return { lat: 40.7484474, lng: -73.987156 };
  // sending request from our node server to another server
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
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
