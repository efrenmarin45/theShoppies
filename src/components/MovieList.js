import React from 'react';

const MovieList = (props) => {
    const NominateComponent = props.nominateComponent; 
    return(
        <>
			{props.moviesList.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
                    <div className='d-flex flex-column bd-highlight mb-3 movieImage'>
                        <img src={movie.Poster} className='moviePoster img-fluid' alt='movie'></img>
                        <div
                            onClick={() => props.handleNominateClick(movie)} 
                            className='overlay d-flex align-items-center justify-content-center'>
                            <NominateComponent />
                        </div>
                        <div className='text-left movieTitleText'>
                            <p>{movie.Title}</p>
                        </div>
                    </div>
				</div>
			))}
		</> 
    );
};

export default MovieList