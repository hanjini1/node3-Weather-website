const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiaGFuamluaSIsImEiOiJjanhlaGU4eDQwMDVsM3VvMjU2d25nejB0In0.NKidVK3RdzVwE7QaB8K4pw";
  request({ url, json: true }, (errr, res, body) => {
    if (body.error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.features.length == 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1]
      });
    }
  });
};

module.exports = geocode;
