console.log('Client side javascript file loaded!');

//fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//  response.json().then((data)=>{
//    console.log(data);
//  });
//});


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault(); // previene la ejecucion del evento por defecto del form --> re-upload la pagina

  const location = search.value;

  console.log(location);

  fetch('/weather?address='+ location).then((response)=>{
  if(!response){
    console.log('No response returned');
  }else{
    response.json().then((data)=>{
        if(data.error){
          messageOne.textContent = 'Error, error!';
          messageTwo.textContent =  data.error;
        }else{
          messageOne.textContent = data.location;
          messageTwo.textContent = 'forecast: ' + data.forecast + '; temperature:' + data.temperature + '; feelslike: ' + data.feelslike;
        }
    });
  }
});

});
