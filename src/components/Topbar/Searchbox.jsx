import './Searchbox.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ReactComponent as Magnifier } from '../../icons/magnifier.svg';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Searchitem from './Searchitem';

function Searchbox() {

  const API_URL = 'https://api.themoviedb.org/3';
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  let [isSearch, setIsSearch] = useState(Boolean);
  const timeOutInterval = 500;
  const searchResultsContainer = useRef(null);

  const doMovieSearch = async (e) => {
    setSearchInput(e.target.value);

    if (e.target.value.length >= 3) {
      setIsSearch(true);

      const { data: { results } } = await axios.get(`${API_URL}/search/movie`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          query: e.target.value
        }
      });

      setResults(results);
    } else {
      setIsSearch(false);
    }
  }

  const debounceMovieSearch = (e) => {
    setTimeout(() => doMovieSearch(e), timeOutInterval);
  }

  const hideSearchResults = () => {
    setIsSearch(false);
  }

  const handleOutsideClick = (e) => {
    if (!searchResultsContainer.current.contains(e.target)) {
      setIsSearch(false);
    }
  }

  useEffect(() => {
		document.addEventListener('click', handleOutsideClick, true);
	}, [])

  return (
    <form ref={searchResultsContainer} className="search_form w-100 mx-auto mt-2 mt-md-0">
      <div className="input-group">
        <input className="form-control search-box" type="search" defaultValue={searchInput} onChange={debounceMovieSearch} placeholder="Search movies..." />
        <div className="input-group-append">
          <button className="btn" type="button">
            <Magnifier />
          </button>
        </div>
      </div>

      {isSearch ?
        <PerfectScrollbar className={"search-results shadow-sm" + (results.length ? ' with-results' : null)}>
          {results.length ?
            <>
              {results.map(movie => (
                <Searchitem key={movie.id} movie={movie} hideSearchResults={hideSearchResults} />
              ))}
            </> : <></>
          }

          {!results.length ?
            <>
              <p className="no-results">No movies found for this search</p>
            </> : <></>
          }
        </PerfectScrollbar> : <></>
      }
    </form>
  );
}

export default Searchbox;