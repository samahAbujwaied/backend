const ForeCast = require("../Models/ForeCast.model");
const PORT = process.env.PORT;
// const MOVIES_API_KEY=process.env.MOVIE_API_KEY;
const axios = require('axios');
const Cache=require('../utils/cashe')
let cache=new Cache();
cache['data']=[];
let day;
let duringDay;
const weatherController=('/weather', (req, res) => {
    let weather;
    let lat = req.query.lat
    let lon = req.query.lon
    let forecastArr=[];
    const day = new Date();
    let dateYear = day.getDate();
    if (lat&&lon){
      if (cache.data.length>0 && dateYear===dateYear2){
        forecastArr=cache.data.map((item, index) => new ForeCast(item));
        console.log('==================== come from cache====================')
        res.json(forecastArr);
      }else{
        let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
          let weatherBitResp = axios.get(url).then(response => {
          // res.json(response.data);
          weather = response.data
         forecastArr = weather.data.map((item, index) => new ForeCast(item));
         cache['data']=weather.data;
         console.log('==================== come from API ITSELF====================')
         d2=new Date();
         dateYear2=d2.getDate();
         res.json(forecastArr)
         }).catch(error=>res.send({message:error.message}));
      }
    }else{
      res.send('Something wrong with lat & lon try again')
    }
  });
  module.exports=weatherController