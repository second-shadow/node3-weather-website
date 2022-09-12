
const request = require('postman-request');

//Definimos la funcion
const geocode = (location, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1Ijoic2Vjb25kc2hhZG93IiwiYSI6ImNsNDU2cmN2YjA4YTUzY25qMTZqeHlnZ2UifQ.UjnWd99xXMcuzg8K_PZ1rA&limit=1';

  request( { url, json: true }, (error, { body } ) =>{

    if(error){
      callback('Unable to connect to location services!', undefined) ;
    }else if(body.features.length === 0){
      callback('Unable to find location. Try another search.', undefined);
    }else{

     const latitude = body.features[0].center[1];
     const longitude = body.features[0].center[0];
     const location = body.features[0].place_name;

     const callbackParam = {
          latitude
          ,longitude
          ,location
     };

      callback( undefined, callbackParam );
    }
  });
};

module.exports = geocode;
