const request = require('request');

const geocode = (address, callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?types=address&access_token=pk.eyJ1IjoiYmFwYWkxMjM0IiwiYSI6ImNrajFxYWk0NjR3a3YycmxiaDVtemtiZHcifQ.timh3uFlaL1-tibS2OJgJA&limit=1'
request({url: url, json:true}, (error, response)=>{
    console.log(response.body);
if(error){
    callback(error,undefined)
} else if(response.body.features.length == 0){
    callback('Unable to connect. Try to another search', undefined)
} else{
    const data = {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        place: response.body.features[0].place_name
    }
    callback(undefined, data);
    console.log(data)
}
})
}

module.exports = geocode;