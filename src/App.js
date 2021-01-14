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


  const requestMovie = async(userSeach) => {
    const url = `http://www.omdbapi.com/?s=${userSeach}&type=movie&apikey=b2dc4cd3`;
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
  }


  const removeNomineeMovie = (movie) => {
    const newNomineeList = userNominations.filter(
      (nominee) => nominee.imdbID !== movie.imdbID
    );

    setUserNominations(newNomineeList);
  }


  return(
    <div className="container-fluid movieScroll">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieHeader heading='The Shoppies Nominees' />
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