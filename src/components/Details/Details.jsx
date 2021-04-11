import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function Details (){
    const details = useSelector(store => store.details[0]);
    const history = useHistory()

    const backHome = () => {
    history.push('/')
    }

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
                    <p>{details.description}</p>
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