import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AddList from '../AddList/AddList'

function Edit (){

    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    const genres = useSelector(store => store.genres)
    const details = useSelector(store => store.details[0]);

    const [id, setID] = useState(details.id)
    const [title, setTitle] = useState(details.title)
    const [poster, setPoster] = useState(details.poster)
    const [description, setDescription] = useState(details.description)
    const [genre_id, setGenre_id] = useState(details.genre_id)

    const editMovie = () =>{
        if(title === "" || poster === "" || description === "" || genre_id === ""){
            alert("Please complete the form")
            return null
        }else{
            console.log('in post')
            axios.post('/api/movie/edit', {
                id: id,
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
            <h2>In Edit</h2>
            <label>Title: </label><input type='text' value={title} onChange={(event) => setTitle(event.target.value)}/><br></br>
            <label>Movie Poster URL: </label><input type='text' value={poster} onChange={(event) => setPoster(event.target.value)}/><br></br>
            <label>Description: </label><textarea className='descriptionInput' onChange={(event) => setDescription(event.target.value)}>{description}</textarea><br></br>
            <label>Genre: </label>
            <select value={genre_id} onChange={(event) => setGenre_id(event.target.value)}>
                <AddList genres = {genres}/>
            </select><br></br>
            <button onClick={() => editMovie()}>Update</button>
            <button onClick={() => history.push('/Details')}>Back</button>
            </div>
            )

}

export default Edit