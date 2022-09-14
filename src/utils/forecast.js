const request = require('postman-request');

//Definimos la funcion

const forecast = ( params, callback)=>{

  const { latitude, longitude } = params;

  const url = 'http://api.weatherstack.com/current?access_key=a5fb23dbf12180d9ebf7b267d5d1be4c&query='+ latitude +','+ longitude + '&units=f'; 

request( {url: url, json: true}, (error, response)=>{
    if(error){
      callback('Unable to connect to weather service!', undefined);
    }else if(response.body.error){
      callback('Location not found. Try another coordinates.', undefined);
    }else{

      const forecast = response.body.current.weather_descriptions[0];
      const temperature = response.body.current.temperature;
      const feelslike = response.body.current.feelslike;
      const humidity = response.body.current.humidity;

      const callbackParam = {
        forecast
        ,temperature
        ,humidity
        ,feelslike
      };

      callback(undefined, callbackParam);
    }
  } );
};

module.exports = forecast;
