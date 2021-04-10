import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './MovieList.css'

function MovieList() {

    const history = useHistory()
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const getDetails = (id) => {
        history.push('/Details')
        console.log('in getDetails')
        dispatch({type: 'FETCH_MOVIE_ID', payload: id})
    }
    const addMovie = () => {
      history.push('/Add')
    }

    return (
        <main>
            <button onClick={() => {addMovie()}}>To Add</button>
            <h1>MovieList</h1>
            <section className="grid-container">
                {movies.map(movie => {
                    return (
                        <div className="movie" key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} onClick={() => getDetails(movie.id)}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;