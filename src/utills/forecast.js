const request = require('request');

const forecast = (longitude, latitude, callback) => {
   const url = `http://api.weatherstack.com/current?access_key=491e29874c7133170c957a823f5ced94&query=${latitude,longitude}`;
   request({ url: url, json: true }, (error, response) => {
      if (error) {
         callback(error);
      } else if (response.body.length == 0) {
         callback(undefined, 'Unable to connect the location');
      } else {
         const p = {
            // longitude: response.body.location.lon,
            // latitude: response.body.location.lat,
            temperature: response.body.current.temperature,
            windspeed:  response.body.current.wind_speed,
            precip:   response.body.current.precip,
            humidity: response.body.current.humidity
         }
      //   const data = `The longitude is ${p.longitude} and  the latitude is ${p.latitude}`
      const data = `The temperature of weather is ${p.temperature}.wind speed is ${p.windspeed}.precipitation is ${p.precip}.
      Humidity is ${p.humidity}`
         callback(undefined, data)
      }
   })
}

module.exports = forecast;