const request = require('request')
const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2FjaGlua2Fwa290aSIsImEiOiJja295aTB0NTcwajFiMnltYzcydGU2Ymg3In0.yEwQ04xxV7liCYQeKqoDKw&'
    request({ url, json: true }, (error, { body }) => {
        // using only body property here we can replace response by body

        // object destructuring  in case using response use response without {}
        if (error) {
            callback("unable to connect to the internet", undefined)
        } else if (body.features.length === 0) { //response.
            callback("unable to find the location please search a valid location", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],//response
                longitude: body.features[0].center[0],//,,
                location: body.features[0].place_name//,, = same as above
            })
        }
    })
}
module.exports = geocode