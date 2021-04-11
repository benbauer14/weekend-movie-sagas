const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  pool.query(`SELECT * FROM genres`).then((response) =>{
    res.send(response)
  }).catch((err) => {
  console.log(err)
  res.sendStatus(500)
  })

});

router.get('/name/:id', (req, res) => {
  // Add query to get all genres
    const queryText = `SELECT * FROM genres WHERE "id"=$1`
  pool.query(queryText, [req.params.id]).then((response) =>{
    res.send(response.rows)
  }).catch((err) => {
  console.log(err)
  res.sendStatus(500)
  })

});
module.exports = router;