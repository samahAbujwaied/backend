const Movies = require("../Models/Movies.model");
 const PORT = process.env.PORT; 
const MOVIES_API_KEY = process.env.MOVIE_API_KEY; 
const Cache = require('../utils/cashe')
const axios = require('axios');
let cache1 = new Cache(); cache1['data'] = [];
const moviesController = ('/movies', (req, res) => {
    let movies = []; 
    let query = req.query.query  
    let callMoviesArr = [];
    if (query) {
        if (cache1.data.length > 0)
         {
            callMoviesArr = cache1.data.map(ele => new Movies(ele)); 
            console.log('==================== come from cache====================');
             res.json(callMoviesArr);
        } else
         {
            let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIES_API_KEY}&query=${query}`        
              axios.get(moviesUrl).then(response => {
                movies = response.data.results; callMoviesArr = movies.map(ele => new Movies(ele));
                cache1['data'] = movies;
                console.log('==================== come from API ITSELF====================') 
                               res.json(callMoviesArr);
            }).catch(error => res.send({ message: error.message }));
        }
    } else { res.send('Something wrong with lat & lon try again') }
});
module.exports = moviesController
