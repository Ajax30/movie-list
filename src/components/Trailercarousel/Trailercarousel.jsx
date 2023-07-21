import './Trailercarousel.css';

function Trailercarousel({ trailers }) {

  const maxCarouselItems = 3;

  return (
    <div id="trailersCarousel" className="carousel slide" data-bs-interval="false">
      {trailers.length > 1 ?
        <>
          <ol className="carousel-indicators">
            {trailers.slice(0, maxCarouselItems).map((video, index) => (
              <li
                key="video.id"
                data-bs-target="#trailersCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
              >
                {index + 1}
              </li>
            ))}
          </ol>
        </> : <></>
      }

      <div className="carousel-inner">
        {trailers.slice(0, 5).map((video, index) => (
          <div
            key="video.id"
            className={"carousel-item" + (index === 0 ? ' active' : '')}
          >
            <iframe
              className="embed-responsive-item"
              src={`https://www.youtube.com/embed/${video.key}`}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trailercarousel;