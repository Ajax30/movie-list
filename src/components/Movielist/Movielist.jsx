import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Movielist.css';
import Moviecard from '../Moviecard/Moviecard';
import { withTransition } from "../../transition";

function Movielist({ page_title, listMovies }) {

	const API_URL = 'https://api.themoviedb.org/3';
	const location = useLocation();
	const [movies, setMovies] = useState([]);

	const getMovies = async () => {
		const { data: { results } } = await axios.get(`${API_URL}/movie/${listMovies}`, {
			params: {
				api_key: process.env.REACT_APP_API_KEY
			}
		});

		setMovies(results);
	}

	const displayMovies = () => {
		return movies.map(movie => (
			<Moviecard
				key={movie.id}
				movie={movie}
			/>
		))
	}

	useEffect(() => {
		getMovies();
	}, [location])

	return (
		<>
			<h1 className="page-title">{ page_title }</h1>
			<div className="row movie-list">
				{ displayMovies() }
			</div>
		</>
	);
}

export default withTransition(Movielist);