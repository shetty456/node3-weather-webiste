const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=cf845024270f96eb95986383ef368808&query=${latitude},${longitude}&units=f`;

  request({url, json: true }, (err, {body}) => {
    if (err) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, 'Today\'s weather is '+body.current.weather_descriptions[0] + ' and temperature is ' + body.current.temperature);
    }
  });
};

module.exports = forecast;
