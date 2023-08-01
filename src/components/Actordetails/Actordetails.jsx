import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dateTimeFormatter from "../../utils/datetime-formatter";
import './Actordetails.css';
import Moviecard from '../Moviecard/Moviecard';
import { withTransition } from "../../transition";

function Actordetails() {

  const API_URL = 'https://api.themoviedb.org/3';
  const image_path = 'https://image.tmdb.org/t/p/w500';
  const { id } = useParams();
  const [actor, setActor] = useState([]);
  const [knownFor, setKnownFor] = useState([]);

  const getActor = async () => {
    const { data } = await axios.get(`${API_URL}/person/${id}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY
      }
    });

    setActor(data);
  }

  const getActorMovies = async () => {
    const { data: { cast } } = await axios.get(`${API_URL}/person/${id}/combined_credits`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY
      }
    });

    setKnownFor(cast);
  }

  useEffect(() => {
    getActor();
    getActorMovies();
  }, [])

  return (
    <div className="row">
      <div className="col-sm-4 col-md-3">
        <div className="poster-container text-center text-sm-start my-3">
          <img
            src={actor.profile_path ? `${image_path}${actor.profile_path}` : '/images/generic-actor.png'}
            alt={actor.name}
            className="img-fluid shadow-sm"
          />
        </div>
      </div>

      <div className="col-sm-8 col-md-9">
        <h1 className="actor-name mt-4">{actor.name}</h1>

        {actor.birthday && actor.place_of_birth ?
          <p className="birth-info small">
            Born in <strong>{actor.place_of_birth}</strong>, on <strong>{dateTimeFormatter.formatDateLong(actor.birthday)}</strong> {actor.deathday ? '' : `(${dateTimeFormatter.yearsAgo(actor.birthday)} old)`}
          </p> : <></>
        }

        {actor.biography ?
          <>
            <h2 className="section-title">Biography</h2>
            <p>{actor.biography}</p>
          </> : <></>
        }

        {knownFor.length ?
          <div className="known-for">
            <h2 class="section-title">Known For</h2>
            <div className="row">
              {knownFor.slice(0, 12).map(movie => (
                <Moviecard movie={movie} />
              ))}
            </div>
          </div> : <></>
        }
      </div>
    </div>
  );
}

export default withTransition(Actordetails);

