const request = require('request');

const foreCast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6293c783733358f2c2141ff8483fea10&query=' + long + ',' + lat + '&units=f'
    request({ url, json: true }, (error, { body }) => {//destructuring response->body
        if (error) {
            callback('unable to connect to location services!', undefined);
        } else if (body.error) {
            callback('unable to find location.try another one!!', undefined);
        } else {
            callback('', body.current.weather_descriptions[0] + ' the current temperature is ' + body.current.temperature + ' and the chances of rain is ' + body.current.precip)
        }
    })
}

module.exports = foreCast