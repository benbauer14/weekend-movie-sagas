import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function Details (){
    const details = useSelector(store => store.details[0]);
    const [descr, setDescr] = useState("")
    let [genreName, setGenreName] = useState([])
    const history = useHistory()

    const deleteMovie = () =>{
        if(confirm("Are you sure you would like to delete this movie?")){
            axios.delete('/api/movie/'+ details.id ).then((response) => {
                console.log(response)
                history.push('/')
            }).catch((err) => {
                console.log(err)
            })
        } else{
            console.log("it's safe")
        }
    }

    const getGenre = () => {
        axios.get('api/moviegenre/' + details.id).then((response) =>{
            console.log("test", response.data[0].genre_id)
            getGenreName(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getGenreName = (response) => {
        let genre = "\n\n Genres: "
        for(let i = 0; i < response.length; i++ ){
            let genreID = response[i].genre_id
            axios.get('/api/genre/name/' + genreID).then((response) =>{
                genre += response.data[0].name + " "
                setDescr(descr + genre)
            }).catch((err) => {
                console.log(err)
            }) 
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
                    <section className="secGenre">{descr}</section>
                </div>
                <div className='description'>
                    <div className="multiline">{details.description}</div>
                    <button onClick={() => {getGenre()}}>Click</button>
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