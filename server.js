require("dotenv").config();
const { default: axios } = require("axios");
const express = require('express')
const app = express()
const weather = require('./data/weather.json')
const cors = require('cors')
app.use(cors())

/*----endpoint server-----*/

/*----For test of server (rout)-----*/

app.get('/port',(req,res)=>{
    res.json({
        message:'welcome ....'
    })
})

app.get('/weather',(req,res)=>{
 
    let findData=()=>
    {
        return weather.data.map(item=>{
         return new Forecast(item)
        })

    }
    console.log(res.json(findData()));
} )


class Forecast{
    constructor(weatherData){
        this.valid_date=weatherData.valid_date,
        this.description=weatherData.weather.description
    }
}

app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT);
    console.log("The Server Has Started!");
 });
