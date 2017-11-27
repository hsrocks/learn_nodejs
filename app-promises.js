const yargs = require('yargs');
const axios =require('axios')
var moment = require('moment');
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
      default : "USA"
    }
  })
  .help()
  .alias('help', 'h')
  .argv;


var encodedAddress = encodeURIComponent(argv.address);
var url=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(url).then((response)=>{
  if(response.data.status ==='ZERO_RESULTS'){
    throw new Error('Unable to find the result')
  }

  var lat=response.data.results[0].geometry.location.lat;

  var lng=response.data.results[0].geometry.location.lng;

  var weatherValue=`https://api.darksky.net/forecast/675aa80beb36e59ac118c61619a5eb97/${lat},${lng}`;

  console.log(`I am in ${response.data.results[0].formatted_address}`);

  return axios.get(weatherValue)
}).then((response)=>{

  var temperature= response.data.currently.temperature;

  var apparentTemperature=response.data.currently.apparentTemperature;
  // Convert the humidity as value was between 0 and 1 . As specified in the Api
  var humidity = response.data.currently.humidity * 100;
  // Fetched the summary
  var summary= response.data.currently.summary;
  //used moment.unix() to convert the seconds to timezon and then format('dddd) to get the day : as mentioned in API
  var day = moment.unix(response.data.currently.time).format("dddd");
  console.log(`Today is ${day}`)
  console.log(`Its currently ${temperature}; but it feels like ${apparentTemperature}`);
  console.log(`The humidity is ${humidity}% and The weather is ${summary}`)
}).catch((error)=>{
  if(error.code==='ENOTFOUND'){
    console.log('Unable to connect to API server')
  }else{
  console.log(error.message)
}
});
