import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AddList from '../AddList/AddList'
import './Edit.css'

function Edit (){

    const history = useHistory()
    const dispatch = useDispatch()
    // on load get genres
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    //get genres from store
    const genres = useSelector(store => store.genres)
    //get detail info from store
    const details = useSelector(store => store.details[0]);

    //for each state set the default to the value in the store
    const [id, setID] = useState(details.id)
    const [title, setTitle] = useState(details.title)
    const [poster, setPoster] = useState(details.poster)
    const [description, setDescription] = useState(details.description)
    const [genre_id, setGenre_id] = useState(details.genre_id)

    const editMovie = () =>{
        //ensure form is completely filled out
        if(title === "" || poster === "" || description === "" || genre_id === ""){
            alert("Please complete the form")
            return null
        }else{
            console.log('in post')
            //make a post with the updated information
            axios.post('/api/movie/edit', {
                id: id,
                title: title,
                poster: poster,
                description: description,
                //genre is not being updated at this time
            }).then((response) =>{
                console.log('back from POST', response)
                //return home after successful edit
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
        <div className='Edit'>
            <div></div>
            <div className="editLabels">
                <p><label>Title: </label></p>
                <p><label>Movie Poster URL: </label></p>
                <p className="descriptionLabel"><label >Description: </label></p>
                <p><label>Genre: </label></p>
            </div>
            <div className="editInputs">
                <p><input type='text' value={title} onChange={(event) => setTitle(event.target.value)}/></p>
                <p><input type='text' className='posterInput' value={poster} onChange={(event) => setPoster(event.target.value)}/></p>
                <p><textarea className='descriptionInput' onChange={(event) => setDescription(event.target.value)}>{description}</textarea></p>
                
                <p><select value={genre_id} onChange={(event) => setGenre_id(event.target.value)}>
                    <AddList genres = {genres}/>
                </select></p>
                <button onClick={() => editMovie()}>Update</button>
                <button onClick={() => history.push('/Details')}>Back</button>
            </div>
            <div className='imagePreview'>
                <img src={poster} alt={title}/>
            </div>
        </div>
            </>
            )

}

export default Edit