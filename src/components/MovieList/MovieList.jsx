import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';


function MovieList() {

    const history = useHistory()
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        //on load get all movies in the database
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const getDetails = (id) => {
        //function executed when a movie is clicked
        //dispatches the movie ID to a reducer which stores the details on the clicked movie
        dispatch({type: 'FETCH_MOVIE_ID', payload: id})
        //pushes to details page
        history.push('/Details')
    }

    return (
        <>
        <div className='header'>
            <div className='headContainer'>
                <h1></h1>
            </div>
            <div className='headContainer'>
                <h1>The Movies Saga!</h1>
            </div>
            <div className='headContainer'>
                <p><button onClick={() => {history.push('/')}}>Home</button>
                <button onClick={() => {history.push('/Add')}}>Add</button></p>
            </div>
        </div>
        <main>
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
    </>
    );
}

export default MovieList;