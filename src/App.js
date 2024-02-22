import { useEffect, useState } from 'react';
import './App.css';
import Movies from './components/Movies';
import axios from 'axios';

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
function App() {
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState("");


  const getAllMovies = () => {
    axios.get(APIURL)
    .then(
      (response) => {
        console.log(response.data.results)
        setFilms(response.data.results)
      }
    ) 
    .catch (
      (error) => {
        console.log(error)
      }
    ) 
  }

  const getSearchedMovies = () => {
    axios.get(SEARCHAPI + search)
    .then((response) => {
      console.log(response.data.results)
      setFilms(response.data.results)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    setFilms([]);
    if(search === "") {
      getAllMovies();
    } else {
      getSearchedMovies();
    }
  }, [search])

  return (
    <div className="max-w-[1080px] h-[400px] mx-auto p-3 ">
      <h1 className='text-center text-4xl pb-3 text-teal-500'>Movies Counter</h1>
      <input
        type='text'
        defaultValue={search}
        onChange={(e)=>setSearch(e.target.value)}
        className='w-full border border-black text-slate-700 rounded-md p-3'
      />
      {films.length === 0 ?
      <div className='text-3xl text-center mt-2'>Loading...</div> :
      <Movies films={films}/>
  }
    </div>
  );
}

export default App;
