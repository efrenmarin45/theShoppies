import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieHeader from './components/MovieHeader';
import MovieSearch from './components/MovieSearch';
import NominateMovie from './components/NominateMovie';
import RemoveNominee from './components/RemoveNominee';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [userNominations, setUserNominations] = useState([]);

  const requestMovie = async(userSearch) => {
    const url = `https://www.omdbapi.com/?s=${userSearch}&type=movie&apikey=b2dc4cd3`;
    const response = await fetch(url);
    const responseJSON = await response.json();


    if(responseJSON.Search){
      setMovies(responseJSON.Search)
    }
  }


  useEffect(() => {
    requestMovie(userSearch);
  }, [userSearch]);


  const addNominee = (movie) => {
    let newNomineeList = [...userNominations].filter(
      (nominee) => nominee.imdbID !== movie.imdbID
    );

    newNomineeList.push(movie);
    setUserNominations(newNomineeList);

    const movieLimit = document.querySelector('.notification');
    const overMovieLimit = document.querySelector('.notification-over');
    const welcomeMsg = document.querySelector('.welcome');

    if(newNomineeList.length ===  5){
      movieLimit.style.display = 'block';
    }
    else{
      movieLimit.style.display = 'none';
    }
    
    if(newNomineeList.length > 5){
      overMovieLimit.style.display = 'block';
    }
    else{
      overMovieLimit.style.display = 'none';
    }
  
    if(newNomineeList.length < 1){
      welcomeMsg.style.display = 'block';
    }
    else{
      welcomeMsg.style.display = 'none';
    }
  }


  const removeNomineeMovie = (movie) => {
    const newNomineeList = userNominations.filter(
      (nominee) => nominee.imdbID !== movie.imdbID
    );

    setUserNominations(newNomineeList);

    const movieLimit = document.querySelector('.notification');
    const overMovieLimit = document.querySelector('.notification-over');

    if(newNomineeList.length < 5){
      movieLimit.style.display = 'none';
    }
    else if(newNomineeList.length ===  5){
      movieLimit.style.display = 'block';
    }

    if(newNomineeList.length > 5){
      overMovieLimit.style.display = 'block';
    }
    else{
      overMovieLimit.style.display = 'none';
    }
  }


  return(
    <div className="container-fluid movieScroll">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieHeader heading='The Shoppies Nominees' />
        <div className='welcome'>
          <p>Welcome to The Shoppies! <br></br> Please select your top <b>5</b> movies to nominate for a Shoppie!</p>
        </div>
        <div className='notification hide'>
          <p>Thank you for selecting your top 5 movie nominees!</p>
        </div>
        <div className='notification-over hide'>
          <p>Only 5 movies can be nominated!<br></br>Please remove nominations until you have only 5.</p>
        </div>
        <MovieSearch userSearch={userSearch} setUserSearch={setUserSearch} />
      </div>
      <div className="row">
        <MovieList 
          moviesList={movies} 
          nominateComponent={NominateMovie}
          handleNominateClick={addNominee} 
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieHeader heading='My Nominees' />
      </div>
      <div className="row">
        <MovieList
          moviesList={userNominations} 
          nominateComponent={RemoveNominee}
          handleNominateClick={removeNomineeMovie} 
        />
      </div>
    </div>
  );
}


export default App;