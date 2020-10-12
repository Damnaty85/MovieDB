import React, {forwardRef} from 'react';
import "../style/Card.scss";
import Image from 'material-ui-image';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import StarIcon from '@material-ui/icons/Star';
import {Link} from "react-router-dom";

const BASE_URL = `https://image.tmdb.org/t/p/w500/`;


const Card = forwardRef(({movie}, ref) => {
    if (!movie.poster_path) {
        return false;
    }
    return (
        <article ref={ref} className="films__card">
            <Link to={{
                pathname: `/movie/${movie.id}`,
                state: {
                    movie: movie.id,
                    serial: movie.name
                }
            }}>
                <picture className="films__image">
                    {!movie.poster_path ?
                        <Image aspectRatio={(9 / 14)} src={`${BASE_URL}${movie.backdrop_path}`} alt={movie.original_title}/> :
                        <Image src={`${BASE_URL}${movie.poster_path}`} alt={movie.original_title} aspectRatio={(9 / 14)}/>
                    }
                </picture>
                <div className="films__information">
                    <h2>{movie.title || movie.name || movie.original_name || movie.original_title}</h2>
                    <p>Дата релиза: {movie.release_date || movie.first_air_date}</p>
                    <p className="films__stats">
                        {movie.media_type && `${movie.media_type} `}
                        <StarIcon/>{movie.vote_average} / <ThumbUpIcon/>{movie.vote_count}
                    </p>
                    {movie.overview ? <p>{movie.overview.substring(0, 120)}...</p> : <p>К сожалению описание для фильма отсутсвует.</p>}
                </div>
            </Link>
        </article>

    );
});

export default Card;
