import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function Details (){
    const details = useSelector(store => store.details[0]);
    const history = useHistory()

    const backHome = () => {
    history.push('/')
}

    return(
    <div className='detailsMain'>
        <h2>In Details</h2>
        <button onClick={() => {backHome()}}>Back</button>
        <div className='details'>
            <h3>{details.title}</h3>
            <img src={details.poster} alt={details.title}/>
        </div>
        <div className='description'>
            {details.description}
        </div>
    </div>
    )
}
export default Details