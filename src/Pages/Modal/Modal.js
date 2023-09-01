// import react from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../../Components/Carousel/Carousel";
import StarIcon from "@mui/icons-material/Star";
import { unavailable, unavailableLandscape } from "../../config/config";
import { useWatchList } from "../../WatchListProvider";
import axios from "axios";
import "./modal.css";
const Modal = () => {
  const [content, setContentData] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [video, setVideo] = useState();
  const { media_type, id } = useParams();
  const contentData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContentData(data);
    SetLoading(false);
  };

  useEffect(() => {
    contentData();
    // eslint-disable-next-line
  }, [media_type, id]);
  useEffect(() => {
    setSeasons(content.seasons);
  }, [content]);
  useEffect(() => {
    fetchTrailer();
    //eslint-disable-next-line
  }, [id, media_type]);

  const fetchTrailer = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data);
  };
  // console.log(video.results.length);

  const youtube = () => {
    if (video && video.results[0].key) {
      const url = `https://www.youtube.com/watch?v=${video.results[0].key}`;
      window.open(url, "_blank");
    }
  };

  let runtime = content.runtime;
  let hour = Math.floor(runtime / 60);
  let min = runtime % 60;
  let time = hour + " hour " + min + " min ";
  const { watchListItems, toggleWatchList } = useWatchList();
  const isAddedToWatchList = watchListItems[content.id] || false;

  return (
    <>
      {loading ? (
        <div className="loading_modal_container">
          <div className="loading_img_section">
            <div className="loading_img"></div>
            <div className="loading_button"></div>
          </div>
          <div className="loading_modal">
            <div className="loading_detail"></div>
            <div className="loading_cast"></div>
          </div>
        </div>
      ) : (
        <div className="modal_section">
          <div className="modal_img_detail">
            <div className="img">
              <img
                src={
                  content.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${content.poster_path}`
                    : unavailableLandscape
                }
                alt="content_image"
              />
              {video && video.results && video.results.length > 0 && (
                <button className="trailer_button" onClick={youtube}>
                  Play Trailer
                </button>
              )}
            </div>
            <div className="modal_details">
              <h1 className="modal_title">{content.title || content.name}</h1>
              <p className="modal_tagline">{content.tagline}</p>
              <p className="modal_overview">{content.overview}</p>
              <div className="modal_genres">
                Genres:
                {content &&
                  content.genres?.map((c) => {
                    return (
                      <p className="modal_genres_name" key={c.id}>
                        {c.name}
                      </p>
                    );
                  })}
              </div>
              {content.runtime ? (
                <div className="modal_runtime_section">
                  Time:
                  <p className="modal_runtime"> {time}</p>
                </div>
              ) : (
                content.created_by && (
                  <div className="modal_created_by">
                    Created By:
                    {content.created_by && content.created_by.length > 0 ? (
                      content.created_by.map((c) => (
                        <p className="modal_created_by_name" key={c.id}>
                          {c.name}
                        </p>
                      ))
                    ) : (
                      <p className="modal_created_by_name">Unknown</p>
                    )}
                  </div>
                )
              )}
              <div className="modal_status_section">
                Status:
                <p className="modal_status"> {content.status}</p>
              </div>
              {isAddedToWatchList ? (
                <div
                  className="Watchlist"
                  onClick={() => toggleWatchList({ content, media_type })}
                >
                  <button>Added to Watchlist</button>
                </div>
              ) : (
                <div
                  className="Watchlist"
                  onClick={() => toggleWatchList({ content, media_type })}
                >
                  <button>Add to WatchList</button>
                </div>
              )}
              <Carousel id={id} media_type={media_type} />
            </div>
          </div>
          {content.number_of_seasons && (
            <p className="season_heading">Last Season</p>
          )}
          {content.number_of_seasons && (
            <div className="season_section">
              <div className="poster_image">
                <img
                  src={
                    content.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${content.poster_path}`
                      : unavailable
                  }
                  alt="poster"
                />
              </div>
              <div className="season_details">
                <p className="season">Season {content.number_of_seasons}</p>
                <div className="season_rating">
                  <StarIcon /> {content.vote_average.toFixed(1)}
                </div>
                {seasons && (
                  <div className="season_date">
                    <p>
                      {content.first_air_date.split("-")[0] ||
                        seasons[seasons.length - 1].air_date.split("-")[0]}
                      .
                    </p>
                    <p>{seasons[seasons.length - 1].episode_count} Episodes</p>
                  </div>
                )}
                {seasons && (
                  <div className="seasons_overview">
                    <p>
                      {seasons[seasons.length - 1].overview || content.overview}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Modal;
