const request = require('request');


var geocodeAddress=(address,callback) =>{
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    // In case not able to  connect to google server
    if(error){
      callback("Unable to connect to Google Server");
    }
    // In case not able to find the data (input is wrong) the google api return status as ZERO_RESULTS
    else if(body.status=='ZERO_RESULTS'){
      callback("Unable to find the address");
    }
    else if(body.status=='OK'){
      callback(undefined,{
        address : body.results[0].formatted_address,
        latitude : body.results[0].geometry.location.lat,
        longitude : body.results[0].geometry.location.lng
      });
    }
  });
}
module.exports={
  geocodeAddress
}
