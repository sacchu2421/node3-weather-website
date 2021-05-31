const request = require("request")
const forecast = (latitude,longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=93745c30045b7709c8631a3a282efe59&query=' + latitude +','+ longitude +'&units=f'

    request({ url, json:true}, (error,{body}) => { // using  body property replce response by body change everywhere required
        if(error){ // object destructuring
            callback("unable to connect to the internet",undefined)
        }else if(body.error){ //response.
            callback("the coordinates are wrong please type a valid one",undefined)

        }else{
            callback(undefined, "the weather description is " + body.current.weather_descriptions[0] + " and the Temperature of the area is " +  body.current.temperature +" degree fahrenheit and the precipitation percentage is " + body.current.precip +" %"
              //  weather_desc: body.current.weather_descriptions[0], //response.
              //  temperature: body.current.temperature,//,,
              //  precipitation: body.current.precip//,,
            )
        }
    })

}

module.exports = forecast