const request = require('request');

const forecast = (longitude, latitude, callback) => {
   const url = `http://api.weatherstack.com/current?access_key=491e29874c7133170c957a823f5ced94&query=india`;
   request({ url: url, json: true }, (error, response) => {
      if (error) {
         callback(error);
      } else if (response.body.length == 0) {
         callback(undefined, 'Unable to connect the location');
      } else {
         const p = {
            longitude: response.body.location.lon,
            latitude: response.body.location.lat
         }
        const data = `The longitude is ${p.longitude} and  the latitude is ${p.latitude}`
         callback(undefined, data)
      }
   })
}

module.exports = forecast;