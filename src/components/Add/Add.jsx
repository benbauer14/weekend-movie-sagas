import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AddList from '../AddList/AddList'
import './Add.css'

function Add () {
    const [title, setTitle] = useState('')
    const [poster, setPoster] = useState('')
    const [description, setDescription] = useState('')
    const [genre_id, setGenre_id] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    const genres = useSelector(store => store.genres)

    const submitMovie = () =>{
        if(title === "" || poster === "" || description === "" || genre_id === ""){
            alert("Please complete the form")
            return null
        }else{
            axios.post('/api/movie', {
                title: title,
                poster: poster,
                description: description,
                genre_id: genre_id
            }).then((response) =>{
                console.log('back from POST', response)
                history.push('/')
            }).catch((err) => {
                console.log(err)
            })

        }
    }
    return(
        <div className='Add'>
            <h2>In Add</h2>
            <label>Title: </label><input type='text' onChange={(event) => setTitle(event.target.value)}/><br></br>
            <label>Movie Poster URL: </label><input type='text' onChange={(event) => setPoster(event.target.value)}/><br></br>
            <label>Description: </label><input className='descriptionInput' type='text' onChange={(event) => setDescription(event.target.value)}/><br></br>
            <label>Genre: </label>
            <select onChange={(event) => setGenre_id(event.target.value)}>
                <AddList genres = {genres}/>
            </select>
            <button onClick={() => {submitMovie()}}>Submit</button>
        </div>
    )
}
export default Add