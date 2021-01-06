const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utills/geocode');
const forecast = require('./utills/forecast')
const app = express();
//  const PORT = process.env.PORT || 3000;

// console.log();
const direcname = path.join(__dirname, '../public');
// console.log(__filename);
// console.log(direcname)
// app.set()
app.set('view engine', 'hbs');
const hbsdirect = path.join(__dirname, '../views');
// console.log(hbsdirect)
const hbsnewdirect = path.join(__dirname, '../templates/partials')
// console.log(hbsnewdirect);
app.set('views', hbsdirect);
app.use(express.static(direcname));
hbs.registerPartials(hbsnewdirect);


app.get('', (req, res) => {
    res.render('index', {
        title: 'Home hbs page ',
        name: 'swarup'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'swarup bhai'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Swarup saha'
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address must be provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, place} = {})=> {

        // console.log(place);
        // console.log(latitude)
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata)=>{
            // console.log(forecastdata);
            // console.log(latitude, longitude)
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                place,
                address: req.query.address
            })
        })
    } )
    // console.log(req.query.address);
    // res.send({
    //     weather: []
    // })
})

app.get('/help/*', (req, res) => {
    //  res.send('Help page not found');
    res.render('articlenot', {
        title: 'Article',
        error: 'Help Article Not Found',
        name: 'Created by swarup'
    })
})
app.get('*', (req, res) => {
    // res.send(" My 404 not found");
    res.render('404', {
        title: '404',
        error: 'Page Not Found',
        name: 'Created By swarup saha'
    })
})

// app.get('', ( req,res)=>{
//     res.send('  Hello Express ');
// })
// app.get('/help', (req, res)=>{
//     res.send([{
//         p: 'bapi'
//     },
//         {
//             q: 'bitt'
//         }
//     ]);
// })
// app.get('/about', (req, res)=>{
//     res.send('About page');
// })

// app.get('/weather', (req, res)=>{
//     res.send('weather page');
// })
app.listen(3000, () => {
    console.log('my Server port is ' );
})