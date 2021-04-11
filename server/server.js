const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const movieRouter = require('./routes/movie.router.js')
const genreRouter = require('./routes/genre.router.js')
const moviegenreRouter = require('./routes/moviegenreRouter.js')
const port = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/movie', movieRouter);
app.use('/api/genre', genreRouter)
//new moviegenre route to access movies_genres table
app.use('/api/moviegenre', moviegenreRouter)

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});
