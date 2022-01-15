const request = require("request");

// create geocode async function
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic3VuaWxoYW5hbXNoZXR0eSIsImEiOiJja3ljbWl0a3kwOWcxMnZxaDBqcnlsbno3In0.qwOw_o6a1JytdsRRK-Nbaw&limit=1`;

  request({ url, json: true }, (err, {body} = {}) => {
    if (err) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, search another one", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
