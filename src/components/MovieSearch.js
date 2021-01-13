import React from 'react';

const MovieSearch = (props) => {
    return(
        <div className='col col-sm-4 searchBar'> 
            <input 
                className='form-control' 
                value={props.value}
                onChange={(event) => props.setUserSearch(event.target.value)} 
                placeholder='Search Nominees'>
            </input>
        </div>
    );
};

export default MovieSearch;