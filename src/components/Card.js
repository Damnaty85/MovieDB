import React, {forwardRef, useState} from 'react';
// import {Link} from "react-router-dom";
import "../style/Card.scss";
import Image from 'material-ui-image';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import StarIcon from '@material-ui/icons/Star';
import Modal from "react-modal";
import CardDetail from "./Card-detail";
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const BASE_URL = `https://image.tmdb.org/t/p/original/`;


const Card = forwardRef(({movie}, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    if (!movie.poster_path){
        return false;
    }
    return (

            <article ref={ref} className="films__card" onClick={toggleModal}>

                {/*<Link to={{*/}
                {/*    pathname: `/movie/${movie.id}`,*/}
                {/*    state: {*/}
                {/*        movie: movie.id*/}
                {/*    }*/}
                {/*}}>*/}
                    <picture className="films__image">
                        {!movie.poster_path ?
                            <Image aspectRatio={(9 / 14)} src={`${BASE_URL}${movie.backdrop_path}`}
                                   alt={movie.original_title} loading={true}/> :
                            <Image src={`${BASE_URL}${movie.poster_path}`} alt={movie.original_title}
                                   aspectRatio={(9 / 14)}/>
                        }
                    </picture>
                    <div className="films__information">
                        <h2>{movie.title || movie.original_name || movie.original_title}</h2>
                        <p>Дата релиза: {movie.release_date}</p>
                        <p className="films__stats">
                            {movie.media_type && `${movie.media_type} `}
                            <StarIcon/>{movie.vote_average} / <ThumbUpIcon/>{movie.vote_count}
                        </p>
                        <p>{movie.overview.substring(0, 120)}...</p>
                    </div>
                {/*</Link>*/}
                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    ariaHideApp={false}
                    className="modal__wrapper"
                    overlayClassName="modal"
                    contentLabel="Детальная информация"
                >
                    <CardDetail movie={movie.id}/>
                    <Button variant="outlined" color="primary" size="small" onClick={toggleModal}><CloseIcon/>Закрыть детальную</Button>
                </Modal>
            </article>
    );
});

export default Card;
