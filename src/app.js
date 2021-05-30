const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path') // core nodejs module no need to install using npm
const express = require('express')
const hbs = require('hbs')
console.log(__dirname) //it tell us the path of the directory 
//console.log(path.join(__dirname,'../public'))
//console.log(__filename)

// go to expressjs.com/api reference for further info
const app = express() // create a variable to store the express function
const publicpath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../template/views')// to customize the views directory use this we can also put it anywhere but just put the path here
const partialspath = path.join(__dirname, '../template/partials')
app.set('views', viewspath) // this is to set it so that  express could knew it
// path.join joins two paths of files
// handle bars engine
app.set('view engine', 'hbs') // set a value for express app.set('key','setting/value')

//RUN IT AS = nodemon src/app.js -e js,hbs IT WILL HELP US TO RESTRT THE NODEMON SERVER IN HBSSS
hbs.registerPartials(partialspath)// registering the partials
/*why do we need to run the node command from outside the src folder? 
---> because we installed node in the project main folder and src, public, etc, 
are the child folder of main folder so we have to call it from outside the src folder.
*/

//views is a default directory to be in root folder folder of your project
app.use(express.static(publicpath))

app.get('', (req, res) => {
    res.render('index', {
        title: "weather app",
        name: "sacchu"
    })
    // call this outside the src folder as node src/app.js
})
// Handlebars - allow us to reuse our code and create dynamic pages make a dir name views and inside it make files .hbs
app.get('/about', (req, res) => {
    res.render('about', {//help us to use handlebars it can took two arguments first name of hbs file without extensions
        title: "About us",
        about: 'this is an about page',//second argument consist of object which can be used by hbs
        name: 'sachin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        help: 'this is a help page',
        name: 'saurav'
    })
})
/* 
QUERY-STRING = it is passed after an URL and we pass it as ?key=value&next_key=next_value
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
      id this u got then you must providing two responses to the browser
*/

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({ // use return to get rid of error
            error: 'you must provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/weather-info', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide an address'
        })
    }
//TypeError: Cannot destructure property 'latitude' of 'undefined' as it is undefined.

//  we will use default parameter for thi error the error means that you have provided the wrong address
// like if we provide like localhost:3000/weather-info?address=d43343

geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
        return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
})
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'sachin',
        errorMessage: 'page not found'
    })
})
// it is suppose to search for the file in the specific path to join it to the current file
/*app.get( '',(req,res) =>{ // this is used to create a page app.get('the location of page',(request,response)=>{the thin we want to print}) 
    res.send('hello express its sachin')// res.send to send the data to the page
})*/


/*app.get('/help',(req,res) => { // app.use we will explore in details for now its just a way to customize the server
    res.send('help page')
})*/
// app.com
//app.com/help
//app.com/about
//app.com/weather-info
//app.com/json
// we can also parse html code and json inside hte response.send()


/*app.get('/about',(req,res) =>{
    res.send('this is an about page of the website')
}) */
app.get('/json', (req, res) => {
    res.send([{
        name: 'sachin'
    },
    { age: 22 },
    {
        location: 'nainital'
    }])


})




app.get('/help/*', (req, res) => {// '*' is a wild card if nothing is found then it will run
    res.render('404', {
        title: 404,
        name: 'sachin',
        errorMessage: 'Help article not found'
    })
})
app.listen(3000, () => {// this is to start the server here app.listen(port=where the file will reun,(callback function optional)=>{})
    console.log("the web server is on")// use it single time
})