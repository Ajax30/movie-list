import './Moviedetails.css';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Genre from '../Genre/Genre';
import TrailerCarousel from '../Trailercarousel/Trailercarousel';
import ActorCard from '../Actorcard/Actorcard';

function Moviedetails() {

  const API_URL = 'https://api.themoviedb.org/3';
  const image_path = 'https://image.tmdb.org/t/p/w500';
  const location = useLocation();
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [actors, setActors] = useState([]);

  const getMovie = async () => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY
      }
    });

    setMovie(data);
  }

  const getMovieTrailers = async () => {
    const { data: { results } } = await axios.get(`${API_URL}/movie/${id}/videos`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY
      }
    });

    setTrailers(results);
  }

  const getMovieActors = async () => {
    const { data: { cast } } = await axios.get(`${API_URL}/movie/${id}/credits`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY
      }
    });

    setActors(cast);
  }

  const movieGenres = () => {
    return (
      <p>
        <strong className="pe-1">Genres:</strong>
        {
          movie.genres.map(genre => (
            <Genre
              key={genre.id}
              genre={genre}
            />
          ))
        }
      </p>
    );
  }

  const movieQuality = () => {
    if (Number(movie.vote_average) >= 7) {
      return 'good';
    } else if (Number(movie.vote_average) < 7 && Number(movie.vote_average) > 5.5) {
      return 'average';
    } else {
      return 'bad';
    }
  }

  useEffect(() => {
    getMovie();
    getMovieTrailers();
    getMovieActors();
  }, [location])

  return (
    <div className="row">
      <div className="col-sm-4 col-md-3">
        <div className="poster-container text-center text-sm-start my-3">
          <img
            src={movie.poster_path ? `${image_path}${movie.poster_path}` : '/images/generic-poster.png'}
            alt={movie.title}
            className="img-fluid shadow-sm"
          />
        </div>
      </div>

      <div className="col-sm-8 col-md-9">
        <h1 className="movie-title mt-4">{movie.original_title}</h1>

        { movie.genres && movie.genres.length ?
          movieGenres() : <></>
        }

        { movie.vote_average ?
          <p className="user-score">
            <strong>User Score:</strong>
            <span className={`score ${movieQuality()}`}>
              {Number(movie.vote_average).toFixed(2)}
            </span>
          </p> : <></>
        }

        {movie.overview ?
          <>
            <h2 className="section-title">Overview</h2>
            <p>{movie.overview}</p>
          </> : <></>
        }

        {trailers.length ?
          <>
            <div className="mb-3">
              <h2 className="section-title">Trailers</h2>
              <TrailerCarousel trailers={trailers} />
            </div>
          </> : <></>
        }

        { actors.length ?
          <div className="cast-container">
            <h2 className="section-title">Cast</h2>
            <div className="row">
              {actors.map(actor => (
                <div className="col-sm-4 col-md-3">
                  <ActorCard actor={actor} />
                </div>
              ))}
            </div>
          </div> : <></>
        }

      </div>
    </div>
  );
}

export default Moviedetails;