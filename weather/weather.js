const request = require("request");
var getWeather =(latitude,longitude,callback)=>{
  request({
      url : `https://api.darksky.net/forecast/675aa80beb36e59ac118c61619a5eb97/${latitude},${longitude}`,
      json : true
  },(error,response,body)=>{

    if(!error && response.statusCode===200){
    callback(undefined,{
      temperature : body.currently.temperature,
      apparentTemperature : body.currently.apparentTemperature
    });
    }
    else{
      callback("Unable to fetch weather");
    }
  });
};

module.exports.getWeather=getWeather;
