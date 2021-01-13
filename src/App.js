import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieHeader from './components/MovieHeader';
import MovieSearch from './components/MovieSearch';
import NominateMovie from './components/NominateMovie';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [userNominations, setUserNominations] = useState([]);

  const requestMovie = async(userSeach) => {
    const url = `http://www.omdbapi.com/?s=${userSeach}&apikey=b2dc4cd3`;
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
    const newNomineeList = [...userNominations, movie];
    setUserNominations(newNomineeList);
  }


  return(
    <div className="container-fluid movieScroll">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieHeader heading='Movies' />
        <MovieSearch userSearch={userSearch} setUserSearch={setUserSearch} />
      </div>
      <div className="row">
        <MovieList 
          moviesList={movies} 
          nominateComponent={NominateMovie}
          handleNominateClick={addNominee} 
        />
      </div>
    </div>
  );
}

export default App;
