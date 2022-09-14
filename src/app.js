const path = require('path');
const express = require('express');
//const weather = require('../../weather-app/app.js');
const hbs = require('hbs');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public'); // __dirname , __filename Constantes propias de la function que envuelve el archivo .js al ejecutarse
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const port = process.env.PORT || 3000; //Asignamos el puerto dado por heroku al levantar la aplicacion o un valor por defecto (3000)

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

//Define paths for Express config
//renderizar contenido dinamico (views), plugin hbs (facil de integrar con express) usa la libreria de bajo nivel handlebars para
app.set('view engine', 'hbs');   // set un par key value
app.set('views', path.join(viewsPath));
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // static resource to be used

console.log(publicDirectoryPath);

//Devuelve la pagina por defecto --> lo reemplazamos por index.hbs
//app.get('', ( req, res )=>{  //Primer argumento de get es la ruta,  el segundo es la funcion que se ejecuta cuando alguie visita la url/ruta
//  res.send('<h1>Hello world! via express</h1>');
//  }
//);

app.get('', (req, res)=>{
  res.render('index', {title: 'Weather App', name: 'Andrew Mead'}); //nombre de la view, objeto con valores a usar en la vista -> {{variable}}
});


app.get('/about', (req, res)=>{
  res.render('about', {title:'About me from a dinamic view', name: 'Andrew Mead'});
});

app.get('/help', (req, res)=>{
  res.render('help', {title:'Help from a dinamic view', name: 'Andrew Mead'});
});

//DEPRECATED remmplazado por dinamic view
//app.get('/help', (req, resp)=>{
//  resp.send(
//    [{name: 'Andrew', age:27}, {name: 'Sarah', age:30}]
//  );
//  // SI mandamos un OBJETO Express lo detecta y hace stringuify a JSON! --> {"name":"Andrew","age":27}
//  }
//);

//Ejemplos de url's
//app.com
//app.com/help
//app.com/about

//DEPRECATED  por viewa dinamicas
//app.get('/about', (req, resp)=>{
//  resp.send('Its all about the money');
//});


//(+)EJEMPLO RETORNANDO JSON AL FE
app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({error:'Bad request. You must provide a search term'});
  }
  console.log(req.query.search);
  res.send({products:[]}); //stringify an object with a type arrary property
});
//(-)EJEMPLO  FIN

app.get('/weather', (req, res)=>{

  if(!req.query.address){
    return res.send({error:'Bad request. You must provide an adress'});
  }

  console.log('Address from query: ' + req.query.address);

  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if(error){
      return res.send({ error: 'Error: '+  error });
    }

    const forecastParam = { latitude: latitude, longitude: longitude };

    forecast( forecastParam, (error, { forecast , temperature, feelslike } = {} ) => {
      if(error){
        return res.send({ error });
      }

      res.send({
        forecast,
        temperature,
        feelslike,
        location,
        address: req.query.address
      });
    });
  });
});


app.get('/help/*', (req, res)=>{
  res.render('404', {title:'404 Help Not Found', name: 'Andrew Mead', message: 'Help article not found'});
});

app.get('*', (req, res)=>{
  res.render('404', {title:'404 Not found', name: 'Andrew Mead', message:'My 404 page'});
});

//Funcion que ejecuta el servidor
//3000 puerto comunmente usado en dev, segundo arg una funcion que se ejecuta cuando el server esta corriendo
app.listen(port, () => { console.log('Server is up on port ' + port + '.'); } );
