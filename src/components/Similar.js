import React from 'react';
import "../style/Similar.scss"
import StarIcon from '@material-ui/icons/Star';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Image from 'material-ui-image';
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';

const API_KEY = "4a12fb9b58bf682b744ce39c610d9341";
const BASE_URL = `https://image.tmdb.org/t/p/w500/`;

export default class Credits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: [],
        };

    }

    getData() {
        setTimeout(() => {
            const movieId = this.props.movie;
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=ru-RU`)
                .then(response => response.json())
                .then(result => this.setState({
                    movie: result,
                }))
                .catch(e => console.log(e));
        }, 2000)
    }

    componentDidMount = () => {
        this.getData();
    };

    refreshPage = () => {
      setTimeout(() => {
          window.location.reload();
      }, 50)
    };

    render() {
        const movie = this.state.movie;
        if (!movie.results) {
            return null;
        }

        return (
            <section className="similar-movie">
                <Swiper
                    spaceBetween={10}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                        },
                        420: {
                            slidesPerView: 2,
                        },
                        640: {
                            slidesPerView: 4,
                        },
                        900: {
                            slidesPerView: 5,
                        },
                        1200: {
                            slidesPerView: 6,
                        },
                        1400: {
                            slidesPerView: 7,
                        },
                    }}
                >
                    {movie.results.map(movie => {
                        return (
                            <SwiperSlide key={movie.id} className="similar-movie__item">
                                <Link to={{
                                    pathname: `/movie/${movie.id}`,
                                    state: {
                                        movie: movie.id
                                    }
                                }} key={movie.id} onClick={this.refreshPage}>
                                    <picture className="similar-movie__image">
                                        {!movie.poster_path ?
                                            <Image src="./image/nofoto.png" alt={movie.title}
                                                   aspectRatio={(9 / 14)}/> :
                                            <Image src={`${BASE_URL}${movie.poster_path}`} alt={movie.title}
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
                                        {movie.overview ? <p>{movie.overview.substring(0, 120)}...</p> :
                                            <p>К сожалению описание для фильма отсутсвует.</p>}
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </section>
        );
    }
}


