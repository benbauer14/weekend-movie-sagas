const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//route to receive all genres for a specific movie ID
router.get('/:id', (req,res) => {
    //req.params = movie_id
    console.log(req.params.id)
    const genreQuery = `SELECT * FROM "movies_genres" WHERE "movie_id"=$1`
    pool.query(genreQuery, [req.params.id]).then((response) =>{
        res.send(response.rows)
    }).catch((err) =>{
        res.sendStatus(500)
    })
})

module.exports = router;