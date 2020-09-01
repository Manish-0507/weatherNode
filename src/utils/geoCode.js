const request = require('request')
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFuaXNoMTExIiwiYSI6ImNrZTJ6NDVmYjBlOG4yc280MGVpZjJ5MnUifQ.8zj-8abi4vE0Q4d1wk-9dg'
    request({ url, json: true }, (error, { body }) => {//destructuring the body from whole response

        if (error) {
            callback('Unable to connect to location Services!!', undefined)//if error then how can any data be received..
        } else if (body.features.length === 0) {
            callback('Unable to find location.try another search', undefined)
        }
        else {
            callback(undefined, {//means for callback funcn we dont have any error so we pass undefined and pass data as  following
                longitude: body.features[0].center[0],
                lattitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })

}
module.exports = geoCode