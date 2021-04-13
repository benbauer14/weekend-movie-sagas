import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator functions
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE_ID', fetchMovieID);
    yield takeEvery('FETCH_GENRES', fetchGenres)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie/a');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* fetchMovieID(action) {
    // get movie by ID from the DB
    //used for details
    try {
        const movies = yield axios.get('/api/movie/'+ action.payload);
        const genres = yield axios.get('api/moviegenre/' + action.payload)
        console.log('get specific movie:', movies.data);
        console.log('genres', genres.data)
        yield put({ type: 'SET_DETAILS', payload: movies.data });
        yield put({ type: 'SET_GENRES', payload: genres.data })

    } catch {
        console.log('get all error');
    }
        
}

function* fetchGenres(action) {
    // get all genres from the DB
    try {
        const genres = yield axios.get('/api/genre/');
        console.log('get all:', genres.data);
        yield put({ type: 'SET_GENRES', payload: genres.data.rows });

    } catch {
        console.log('get genres error');
    }
        
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie info for details page
const details = (state = [{id: "", title: "", description: ""}], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
