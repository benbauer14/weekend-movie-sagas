import React from 'react';

function AddList(props) {

    return(
        <>
        {props.genres.map((genre) => (<option value={genre.id}>{genre.name}</option>))}
        </>
    )   
}

export default AddList