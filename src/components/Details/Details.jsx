import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import DetailsGenreList from '../DetailsGenreList/DetailsGenreList'

function Details (){
    const details = useSelector(store => store.details[0]);
    const genres = useSelector(store => store.genres)
    const [descr, setDescr] = useState("")
    const [genre, setGenre] = useState([])
    const history = useHistory()

    const deleteMovie = () =>{
        //delete movie function
        //confirm delete
        if(confirm("Are you sure you would like to delete this movie?")){
            //delete call to router
            axios.delete('/api/movie/'+ details.id ).then((response) => {
                console.log(response)
                // if successful return home
                history.push('/')
            }).catch((err) => {
                console.log(err)
            })
        } else{
            //response to console if delete is cancelled
            console.log("it's safe")
        }
    }

    return(
        <>        
        <div className='header'>
            <div className='headContainer'>
                <h1></h1>
            </div>
            <div className='headContainer'>
                <h1>The Movies Saga!</h1>
            </div>
            <div className='headContainer'>
                <p><button onClick={() => {history.push('/')}}>Home</button></p>
            </div>
        </div>
        <div className='test'>
            <div className='detailsMain'>
                <div></div>
                <div className='details'>
                    <h1>{details.title}</h1>
                    <img src={details.poster} alt={details.title}/>
                </div>
                <div className='description'>
                    <div className="multiline">{details.description}</div>
                    <div className="genres">
                        Genres:
                        <DetailsGenreList genres={genres} />  
                    </div>
                    <button onClick={() => {history.push('/')}}>Back</button>
                    <button onClick={() => {history.push('/Edit')}}>Edit</button>
                    <button onClick={() => {deleteMovie()}}>Delete</button>
                </div>
            </div>
        </div>
    </>
    )
}
export default Details