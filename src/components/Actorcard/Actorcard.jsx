import './Actorcard.css';
import { Link } from 'react-router-dom';


function Actorcard({actor}) {

  const image_path = 'https://image.tmdb.org/t/p/w500';

  return (
    <>
      <Link to={`/actor/${actor.id}` } className="card actor-card shadow-sm">
        <img className="img-fluid" src={ actor.profile_path ? `${image_path}${actor.profile_path}` : '/images/generic-actor.png' } />
        <div className="card-body">
          <h3 className="card-title">{ actor.name }</h3>
          <p className="card-subtitle">{ actor.character }</p>
        </div>
      </Link>
    </>
  )
}
export default Actorcard;