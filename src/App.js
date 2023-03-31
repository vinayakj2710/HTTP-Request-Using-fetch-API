import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import AddMovies from './components/AddMovies';
import './App.css';

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // const response = await fetch("https://swapi.dev/api/films");
      const response = await fetch(
        "https://react-http-requests-4811b-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!")
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          key: data.key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }


        // const transformedData = data.map(movieData => {
        //   return {
        //     id: movieData.episode_id,
        //     title: movieData.title,
        //     releaseDate: movieData.release_date,
        //     openingText: movieData.opening_crawl,
        //   };
        // });
      
      setMovies(loadedMovies);
      
    } catch(error) {
      setError(error.message)
    }
    setIsLoading(false);
  },[])

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler])
  
  const onAddMovieHandler = async (movie) => {
    setError(null);
    try {
      const response = await fetch("https://react-http-requests-4811b-default-rtdb.firebaseio.com/movies.json", {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'content-Type': 'application/json'
      }
      });
      if (!response.ok) {
        throw new Error("Post request failed!!")
      }
    const data = await response.json();
    console.log(data);
    } catch (error) {
      setError(error);
  }
    }
    

  let content = <p>No Movies Found!!</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovies onAddMovie={onAddMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isLoading ? <MoviesList movies={movies} /> : <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && movies.length === 0 && !error && <p>No Movies Found!!</p>} */}
        
      </section>
    </React.Fragment>
  );
}

export default App;
