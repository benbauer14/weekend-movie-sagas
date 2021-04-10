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

module.exports = router;