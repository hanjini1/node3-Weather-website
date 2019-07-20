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
          ' degress out. There is a ' +
          body.currently.precipProbability * 100 +
          ' % chance of rain.'
      );
    }
  });
};

module.exports = forecast;
