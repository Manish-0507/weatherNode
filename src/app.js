const geoCode = require('./utils/geoCode');
const foreCast = require('./utils/foreCast');
//handle bars allows us to do two important works 1.render dynamic documents. 2. create reusable code.//for using hanlebars with express we use a kind of plugin of handlebars to integrate with express=>google npm hbs

const path = require('path');//core module named path from nodejs.org,no need to install
const express = require('express');//core module named express from expressjs.org,need to install
const hbs = require('hbs');//load hbs.

// console.log(__dirname)
console.log(path.join(__dirname, '../public'))//we join the path to that folder in which our index.html is present and bcoz we want to load that when it starts

const app = express();
const port = process.env.PORT || 3000//access the port provided by heroku 'env' stands for environmentvariable.for loalhost its 3000 and otherwise it willuse heroku server.


//define paths for express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')// 1.for changing the path for express to look at templates(acc. to now) in place of folder views.
const partialsPath = path.join(__dirname, '../templates/partials');//partials nyu how h jistra header or footer h wo aapin har page pr chahiye to wo aapin baar baar koni likhna pda usna e ek baar use kr lyanga har jagah.

//setup handlerbars engine and views.
app.set('view engine', 'hbs');//we set this in key-value pair in key we set what property we want to add and in value is value tell to express to listen to it
app.set('views', viewsPath);//2
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectorypath))//express.static is a funcn whose returned value will be passed to the app.use funcn.and the static's argument is the path which we want to serve.

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    })//ya mandatory h ki folder ka naam views ho or jo directory ho wo root folder e honi chahye
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Manish'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'Helped by me!!',
        title: 'Help',
        name: 'Andrew'
    })
})




// //html response
// app.get('', (req, res) => {//req stands for incoming request and contains data of incoming request and response is for what to send back.
//     res.send('<h1>Manish</>')//to send something back to requester
// })

//json response
// app.get('/help', (req, res) => {
//     res.send({//express will recognise it and auto detect the json and stringify for us and send to the requester correctly
//         name: 'manish',
//         age: 27
//     });
// })

// app.get('/about', (req, res) => {
//     res.send([
//         {
//             name: 'manish',
//             age: 20
//         }
//     ]);
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geoCode(req.query.address, (error, { lattitude, longitude, location } = {}) => {//default object means if not any value get then show empty object not an error
        if (error) {
            return res.send({ error })//used shorthand here ...remember becoz of same name
        }
        foreCast(lattitude, longitude, (error, foreCastdata) => {
            if (error) {
                return res.send({ error: error })
            }
            res.send({
                forecast: foreCastdata,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     foreCast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    // console.log(req.query);
    // console.log(req.query.search);//for getting data specifically of a query
    //now if we want to make mandatory to search something then....
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!!!'
        })
    }

    res.send({
        products: []
    });
    //here by doing this we are sending two responses to the browser so it will throw error 'cant set header after they are sent to the client'.so for this we write return with the above first sending statement then it will get out if it executes.
})

app.get('/help/*', (req, res) => {//iska mtlb h ki agr help k ander jaake agr wo or kuchh likh de to yo error dikhana h mtlb wo help m h  pr usna paa ni rhya system to aapi alg error de ska ha ya fer koi suggestion de sk ha...is type t.

    res.render('404', {
        title: '404',
        name: 'Manish',
        errorMessage: 'Sorry!no help article found to your search'
    })

})

app.get('*', (req, res) => {//'*' says everything is a match means if not found above then now everything u found i a match and show this error..when no route is matched,as u know this is a wildcard route so must written below all other routes so that after checking all routes then if not found then it must be shown.
    res.render('404', {
        title: '404',
        name: 'Manish',
        errorMessage: 'Sorry!the page is not found!!'
    })

})

app.listen(port, () => {
    console.log('server is up on port .' + port);
});