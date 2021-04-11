import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function Details (){
    const details = useSelector(store => store.details[0]);
    const [descr, setDescr] = useState("")
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

    const getGenre = (detail) => {
        //send request to movie genre server with detail id
        axios.get('api/moviegenre/' + detail.id).then((response) =>{
            //create variable for genres
            let genre = "\n\n Genres: "
            //loop through the response with the genres and build the genre string
            for(let i = 0; i < response.data.length; i++ ){
                console.log(i)
                //select a genre id
                let genreID = response.data[i].genre_id
                //get call to genre name db
                axios.get('/api/genre/name/' + genreID).then((response) =>{
                    //add response to genre variable
                    genre += response.data[0].name + " "
                    console.log(genre)
                    //cannot get it to log on DOM even with return
                }).catch((err) => {
                    console.log(err)
                }) 
            }
        }).catch((err) => {
            console.log(err)
        })
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