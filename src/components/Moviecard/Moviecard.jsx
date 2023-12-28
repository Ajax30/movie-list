import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dateTimeFormatter from "../../utils/datetime-formatter";
import './Moviecard.css';
import Genre from '../Genre/Genre';

function Moviecard({movie}) {

	const API_URL = 'https://api.themoviedb.org/3';
	const image_path = 'https://image.tmdb.org/t/p/w500';
	const [genres, setGenres] = useState([]);

	const getGenres = async () => {
		const { data: { genres } } = await axios.get(`${API_URL}/genre/movie/list`, {
			params: {
				api_key: process.env.REACT_APP_API_KEY
			}
		});

		setGenres(genres);
	}

	const displayMovieGenres = () => {
	
		// Get genres for the current movie
		let movieGenres = genres.filter(genre => movie.genre_ids.includes(genre.id));

		// Display current movie genres in as component
		return movieGenres.map(genre => (
			<Genre
				key={genre.id}
				genre={genre}
			/>
		));
	}

	useEffect(() => {
		getGenres();
	}, [])

	return (
		<div className="col-xs-12 col-sm-6 col-lg-4 col-xl-3">
			<Link className="movie card" to={`/movie/${movie.id}`}>
				<div className="thumbnail">
					<img
						src={ movie.backdrop_path ? `${image_path}${movie.backdrop_path}` : '/images/generic-card-image.png' }
						alt={ movie.title }
						className="img-fluid"
					/>
				</div>

				<div className="card-content">
					<h2 className="card-title">{ movie.title }</h2>
					<p className="card-desc">{ movie.overview }</p>
					<span className="score">{ movie.vote_average.toFixed(2) }</span>

				</div>

				<div className="card-footer">
					<p className="m-0 release">
						Release date: { dateTimeFormatter.formatDateShort(movie.release_date) }
					</p>

					<p className="m-0 pt-1">{ displayMovieGenres() }</p>
					
				</div>
			</Link>
		</div>
	);
}

export default Moviecard;