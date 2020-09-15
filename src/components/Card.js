import React, {forwardRef} from 'react';
import {Link} from "react-router-dom";
import "../style/Card.scss";
import Image from 'material-ui-image';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import StarIcon from '@material-ui/icons/Star';

const BASE_URL = `https://image.tmdb.org/t/p/original/`;

const Card = forwardRef( ({movie}, ref) => {
    return (
        <article ref={ref} className="films__card">
            <Link to={{
                pathname: `/movie/${movie.id}`,
                state: {
                    movie: movie.id
                }
            }}>
                <picture className="films__image">
                    {!movie.poster_path ?
                        <Image aspectRatio={(9/14)} src="./image/nofoto.png" alt={movie.original_title}/> :
                        <Image src={`${BASE_URL}${movie.poster_path}`} alt={movie.original_title} aspectRatio={(9/14)}/>
                    }
                </picture>
                <div className="films__information">
                    <h2>{movie.title || movie.original_name || movie.original_title}</h2>
                    <p>Дата релиза: {movie.release_date}</p>
                    <p className="films__stats">
                        {movie.media_type && `${movie.media_type} `}
                        <StarIcon/>{movie.vote_average} / <ThumbUpIcon/>{movie.vote_count}
                    </p>
                    <p>`{movie.overview.substring(0, 120)}...`</p>
                </div>
            </Link>
        </article>

    );
});

export default Card;
