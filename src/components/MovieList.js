import React from 'react';
import moviePoster from '../img/moviePoster.jpg';

const MovieList = (props) => {
    const NominateComponent = props.nominateComponent;

    return(
        <>
			{props.moviesList.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
                    <div className='d-flex flex-column bd-highlight mb-3 movieImage'>
                        <img src={(movie.Poster !== "N/A") ? movie.Poster : moviePoster }  className='moviePoster img-fluid' alt='movie'></img>
                        <div id='overlay'
                            onClick={() => props.handleNominateClick(movie)} 
                            className='d-flex align-items-center justify-content-center'>
                            <NominateComponent />
                        </div>
                        <div className='text-center movieTitleText'>
                            <p>({movie.Year})<br></br>{movie.Title}</p>
                        </div>
                    </div>
				</div>
			))}
		</> 
    );
};

export default MovieList