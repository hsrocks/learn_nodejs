const request = require('request');

var geocodeAddress=(address)=>{
  return new Promise((resolve,reject) =>{
    var encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    },(error,response,body)=>{
      if(error){
        reject("Unable to connect to Google Server")
      }
      else if(body.status=='ZERO_RESULTS'){
        reject("Unable to find the address")
      }
      else if(body.status=='OK'){
        resolve({
          address : body.results[0].formatted_address,
          latitude : body.results[0].geometry.location.lat,
          longitude : body.results[0].geometry.location.lng
        })
      }
    })
  })
}


geocodeAddress("Electronic city bangalore").then((result)=>{
  console.log(JSON.stringify(result,undefined,2))
},(error)=>{
  console.log(error);
})
