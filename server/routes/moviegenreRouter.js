const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//route to receive all genres for a specific movie ID
router.get('/:id', (req,res) => {
    //req.params = movie_id
    console.log(req.params.id)
    const genreQuery = `SELECT genres.name  
    FROM "movies" 
    JOIN movies_genres ON movie_id = movies.id
    JOIN genres ON movies_genres.genre_id = genres.id 
    WHERE "movie_id"=$1`
    pool.query(genreQuery, [req.params.id]).then((response) =>{
        res.send(response.rows)
    }).catch((err) =>{
        res.sendStatus(500)
    })
})

module.exports = router;