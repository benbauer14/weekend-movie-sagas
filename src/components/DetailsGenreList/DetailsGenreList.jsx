import DetailsGenreItem from '../DetailsGenreItem/DetailsGenreItem'

function DetailsGenreList(props) {

    return (
        <>
                <ul>
                {props.genres.map(genre => {
                    return (
                     <li>{genre.name}</li>
                    );
                })}
                </ul>
    </>
    );
}

export default DetailsGenreList;