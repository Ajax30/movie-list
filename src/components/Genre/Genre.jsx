import './Genre.css';

function Genre({ genre }) {
	return (
		<>
			<span className="genre">{ genre.name }</span>
		</>
	);

}

export default Genre;