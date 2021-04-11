import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AddList from '../AddList/AddList'
import './Add.css'

function Add () {
    //create reducers
    const [title, setTitle] = useState('')
    const [poster, setPoster] = useState('')
    const [description, setDescription] = useState('')
    const [genre_id, setGenre_id] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()

    //on load get genres
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    //get genres from store to allow adding to list
    const genres = useSelector(store => store.genres)

    const submitMovie = () =>{
        //ensure inputs are not empty
        if(title === "" || poster === "" || description === "" || genre_id === ""){
            alert("Please complete the form")
            return null
        }else{
            //post to create new movie entry in database
            axios.post('/api/movie', {
                title: title,
                poster: poster,
                description: description,
                genre_id: genre_id
            }).then((response) =>{
                console.log('back from POST', response)
                //return home
                history.push('/')
            }).catch((err) => {
                console.log(err)
            })

        }
    }
    return(
        <>
        <div className='header'>
            <div className='headContainer'>
            </div>
            <div className='headContainer'>
                <h1>The Movies Saga!</h1>
            </div>
            <div className='headContainer'>
                <p><button onClick={() => {history.push('/')}}>Home</button>
                </p>
            </div>
        </div>
        <div className='Add'>
            <div></div>
            <div className="AddLabels">
                <p><label>Title: </label></p>
                <p><label>Movie Poster URL: </label></p>
                <p className="descriptionLabel"><label >Description: </label></p>
                <p><label>Genre: </label></p>

            </div>
            <div className="AddInputs">
                <p><input type='text' onChange={(event) => setTitle(event.target.value)}/></p>
                <p><input type='text' className="posterInput" onChange={(event) => setPoster(event.target.value)}/></p>
                <p><textarea className='descriptionInput' onChange={(event) => setDescription(event.target.value)}></textarea></p>
                
                <p><select onChange={(event) => setGenre_id(event.target.value)}>
                    <AddList genres = {genres}/>
                </select></p>
                <button onClick={() => {submitMovie()}}>Save</button>
                <button onClick={() => {history.push('/')}}>Cancel</button>
            </div>
            <div className='imagePreview'>
                <img src={poster}/>
            </div>
        </div>
        </>
    )
}
export default Add