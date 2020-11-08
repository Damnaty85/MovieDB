import React, {useEffect, useState} from 'react';
import YouTube from 'react-youtube';
import '../App.scss'

const API_KEY = "4a12fb9b58bf682b744ce39c610d9341";
const BASE_URL = `https://api.themoviedb.org/3/movie/`;

const MovieTrailer = (movie) => {
    const [trailer, setTrailer] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const movieId = movie.movie;
            const request = await fetch(`${BASE_URL}${movieId}/videos?api_key=${API_KEY}`)
                .then(data => data.json())
                .then(data => {
                    setTrailer(data.results);
                })
                .catch(err => console.log(err));
            return request;
        }
        fetchData();
    }, []);

    const onReady = (evt) => {
        // access to player in all event handlers via event.target
        evt.target.pauseVideo();
    };
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };
    if (!trailer) {
        return null;
    }
    return (
        <div className="movie-trailer__wrap">
            { trailer &&
                trailer.map(it => {
                    return (
                        <div className="movie-trailer" key={it.id}>
                            <YouTube videoId={it.key} opts={opts} onReady={onReady}/>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default MovieTrailer;
