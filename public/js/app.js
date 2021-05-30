
/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })

})*/
// fetch('url').then(response)=>{} -->herev we are saying fetch data from url and then run this function
// fetch allow us to fetch data from a url and do something with it it is a browser based we can say client side javascript


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msg1 = document.querySelector('#message-1') // to pass id we use # then the id 

//msg1.textContent="from javascript"


const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchElement.value

    msg1.textContent = "loading..."
    msg2.textContent = ""
// version controls -- lets know this by an example if we posted a website overinternet and after some time 
// we added a new feature to it but unfortunately that has a bug and website is showing problem
// now we have to spend a lot time to fix the proble bcoz all we have is a broken code 
// here version contrlo help us to revert the previous code within seconds so that later on we can fix the bug of that feature and deploy it

    fetch('http://localhost:3000/weather-info?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                msg1.textContent = data.error // heroku -v to check version
            } else {// to login use heroku login then any key
                msg1.textContent = data.location
                const demo = JSON.stringify(data.forecast)// it converts a javascript object to json string
                /*If you're getting [object Object] then that means you're 
                trying to turn an object into a string. So either data.location 
                 or data.forecast is an object and not a string which
                 suggests you're sending the data back from your route incorrectly. */

                msg2.textContent = demo
                // msg2.textContent = data.forecast
                //console.log(data.location)
                //console.log(data.forecast)
            }
        })
    })

})