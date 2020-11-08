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

    const coloringVote = () => {
        if (movie.vote_average <= 5) {
            return(
                <span style={{color:'#b30015'}}>{movie.vote_average}</span>
            )
        }  else if (movie.vote_average >= 7) {
            return(
                <span style={{color:'#00c228'}}>{movie.vote_average}</span>
            )
        } else {
            return(
                <span>{movie.vote_average}</span>
            )
        }
    };

    return (
        <Link to={{
            pathname: `/movie/${movie.id}`,
            state: {
                movie: movie.id,
                serial: movie.name
            }
        }} className="films__card" ref={ref}>
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
                    <StarIcon/>{coloringVote()} из 10 / <ThumbUpIcon/>{movie.vote_count}
                </p>
                {movie.overview ? <p>{movie.overview.substring(0, 120)}...</p> : <p>К сожалению описание для фильма отсутсвует.</p>}
            </div>
        </Link>
    );
});

// const hoverCard = (evt) => {
//     let emptyBox = document.createElement('div');
//     emptyBox.classList.add('box-empty');
//
//     const height = evt.currentTarget.offsetHeight;
//     const width = evt.currentTarget.offsetWidth;
//
//     emptyBox.style = `width:${width}px;height:${height}px;`;
//
//     evt.currentTarget.insertAdjacentElement('beforebegin', emptyBox);
//
//     const x = emptyBox.getBoundingClientRect().left;
//     const y = emptyBox.getBoundingClientRect().top;
//
//     let posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
//
//     evt.currentTarget.style = `position:fixed;top:${y + posTop}px;left:${x}px;height:auto;transition:0.3s;z-index:1;transform: scale(1.1);`;
//
//
// };
//
// const removeHover = (evt) => {
//     document.querySelector('.box-empty').remove();
//     evt.currentTarget.style = `position:relative;transition:0.3s`;
// };

export default Card;
