import { Link } from 'react-router-dom';

function Searchitem({movie, hideSearchResults }) {
  const image_path = 'https://image.tmdb.org/t/p/w500';

  return (
    <Link to={`/movie/${movie.id}`} onClick={() => hideSearchResults()}>
      <span className="movie-poster">
        <img src={movie.poster_path ? `${image_path}${movie.poster_path}` : '/images/generic-poster.png'} alt={movie.title} />
      </span>
      <span className="movie-title">{movie.title}</span>
    </Link>
  );
}

export default Searchitem;