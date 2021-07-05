require("dotenv").config();
const { default: axios } = require("axios");
const express = require('express')
const app = express()
const weather = require('./data/weather.json')
const cors = require('cors')
app.use(cors())
const movieKey = process.env.MOVIE_API_KEY;
/*----endpoint server-----*/

/*----For test of server (rout)-----*/

app.get('/', (req, res) => {
    res.json({
        message: 'welcome ....'
    })
})

app.get('/weather', (req, res) => {
    let nameOfcity = req.query.city_name;
    console.log(nameOfcity);
    let searchData = weather.find(item => {
        if ((nameOfcity.toLowerCase() == item.city_name.toLowerCase()))

            return item
    })
    console.log(searchData);

    let forcastArr = searchData.data.map(item => {
        return new Forecast(item)
    })
    res.send(forcastArr)

})


class Forecast {
    constructor(weatherData) {
        this.valid_date = weatherData.valid_date,
            this.description = weatherData.weather.description
    }
}

app.get('/movie', (req, res) => {
    let cache = {};
    const movieQuery = req.query.query
    const themoviedbURL = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${movieQuery}`;
    if (cache[movieQuery] !== undefined) {
        res.send(cache[movieQuery])
    }
    else {
        axios.get(themoviedbURL)
            .then(result => {
                let movieArr = result.data.results.map(item => {
                    return new Movie(item);
                })
                cache[movieQuery] = movieArr;
                res.status(200).send(movieArr);
            })
            .catch(error => {
                res.status(500).send(`error in getting the movies data ==> ${error}`);
            })
    }
})
class Movie {
    constructor(item) {
        this.title = item.title;
        this.overview = item.overview;
        this.average_votes = item.average_votes;
        this.total_votes = item.total_votes;
        this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.released_on;
    }
}


app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
    console.log("The Server Has Started!");
});
