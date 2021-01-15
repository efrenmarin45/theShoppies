import React from 'react';

const MovieHeader = (props) => {
    return(
        <div className='col header'>
            <h1>{props.heading}</h1>
        </div>
    )
}

export default MovieHeader;