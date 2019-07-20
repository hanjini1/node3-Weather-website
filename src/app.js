const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;
//Define paths for express config
const viewsPath = path.join(__dirname, 'views');
const partialsPath = path.join(__dirname, '../partials');

// Setup handebars engine and views location
app.set('view engine', 'hbs');
//app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static folder for express
app.use(express.static(path.join(__dirname, '../public')));

//app.com
//app.com/help
//app.com/about

app.get('', (req, res, err) => {
  res.render('index', { title: 'Weather', name: 'Harish Kumar A' });
});

app.get('/weather', (req, res, err) => {
  if (!req.query.address) {
    return res.send({ error: 'Please provide a address' });
  }
  geocode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast({ latitude, longitude }, (error, forecastdata) => {
      if (error) {
        return res.send({ error });
      }

      return res.send({
        forecast: forecastdata,
        address: req.query.address
      });
    });
  });
  // res.send({
  //   forecast: "It is snowing",
  //   location: "Bangalore",
  //   address: req.query.address
  // });
});

app.get('/products', (req, res, err) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a search term' });
  }
  res.send({ products: [] });
});

app.get('/about', (req, res, err) => {
  res.render('about', { title: 'About', name: 'Harish Kuamr A' });
});

app.get('/help', (req, res, err) => {
  res.render('help', { title: 'Help', name: 'Harish Kuamr A' });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Harish Kuamr A',
    errorMessage: 'Help page not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Harish Kuamr A',
    errorMessage: 'Page not found'
  });
});

app.listen(port, () => {
  console.log('Server is up on the port ' + port);
});
