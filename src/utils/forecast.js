const request = require('request');

const forecast = (data, callback) => {
  const url =
    'https://api.darksky.net/forecast/6ea28c4281baae23637cde13d536419b/' +
    data.latitude +
    ',' +
    data.longitude;

  request({ url, json: true }, (errr, res, body) => {
    if (body.error) {
      callback('Unable to connect to weather service', undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ' It is currently ' +
          body.currently.temperature +
          ' degress out. The high today is ' +
          body.daily.data[0].temperatureHigh +
          ' with a low of ' +
          body.daily.data[0].temperatureLow +
          ' There is a ' +
          (body.currently.precipProbability * 100).toFixed(2) +
          ' % chance of rain.'
      );
    }
  });
};

module.exports = forecast;
