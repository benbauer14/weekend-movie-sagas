const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  if(req.params.id == 'a'){
    const query = `SELECT * FROM movies ORDER BY "title" ASC`;
    pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
  }else{
    console.log("in else", req.params.id)
    const query = `SELECT * FROM movies WHERE id=$1`
    pool.query(query, [req.params.id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
  }



});

router.delete('/:id', (req,res) =>{
  console.log(req.params.id)
  //delete from dependent movies_genre first
  const deleteMovieGenre = `
  DELETE FROM "movies_genres" WHERE "movie_id"=$1`
  pool.query(deleteMovieGenre, [req.params.id]).then((response) =>{
    console.log("success")
    //delete from master movies table second
    const deleteMovieQuery = `
    DELETE FROM "movies" WHERE "id"=$1
    `
    pool.query(deleteMovieQuery, [req.params.id]).then((response) => {
      console.log("deleted?", req.params)
      res.sendStatus(200)
    }).catch((err) => {
      res.sendStatus(500)
    })
  }).catch((err) => {
    res.sendStatus(500)
  })
})

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

router.post('/edit', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  UPDATE "movies" SET "title" =$1, "poster"=$2, "description"=$3 WHERE "id"=$4
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description, req.body.id])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
//     const createdMovieId = result.rows[0].id

//     // Now handle the genre reference
//     const insertMovieGenreQuery = `
//       INSERT INTO "movies_genres" ("movie_id", "genre_id")
//       VALUES  ($1, $2);
//       `
//       // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
//       pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
//         //Now that both are done, send back success!
//         res.sendStatus(201);
//       }).catch(err => {
//         // catch for second query
//         console.log(err);
//         res.sendStatus(500)
//       })

// // Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;