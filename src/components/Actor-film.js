import React, { Component } from 'react';
import "../style/Actor-movie.scss"
import Image from 'material-ui-image';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import StarIcon from '@material-ui/icons/Star';
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';

const BASE_URL = `https://image.tmdb.org/t/p/w500/`;;
const API_KEY = "4a12fb9b58bf682b744ce39c610d9341";

class ActorFilm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cast: [],
        };
    }

    getData = async () => {
        const actorId = this.props.actorId;
        this.setState({...this.state});
        await fetch(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${API_KEY}&language=ru-Ru`)
            .then(response => response.json())
            .then(result => this.setState({
                cast: result.cast,
            }))
            .catch(e => console.log(e));
    };

    componentDidMount = () => {
        setTimeout(() => {
            this.getData();
        }, 200)
    };

    render() {
        return (
            <div className="actor-movie" style={{marginTop: '50px', marginBottom: '50px'}}>
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
                    {
                        this.state.cast.map(it => {
                            return (
                                <SwiperSlide key={it.credit_id} className="actor-movie__card">
                                    <Link to={{
                                        pathname: `/movie/${it.id}`,
                                        state: {
                                            movie: it.id,
                                            serial: it.name
                                        }
                                    }}>
                                        <picture className="actor-movie__image">
                                            {!it.poster_path ?
                                                <Image aspectRatio={(9 / 14)} src={`${BASE_URL}${it.backdrop_path}`} alt={it.original_title}/> :
                                                <Image src={`${BASE_URL}${it.poster_path}`} alt={it.original_title} aspectRatio={(9 / 14)}/>
                                            }
                                        </picture>
                                        <div className="actor-movie__information">
                                            <h2>{it.title || it.name || it.original_name || it.original_title}</h2>
                                            <p>Дата релиза: {it.release_date || it.first_air_date}</p>
                                            <p className="actor-movie__stats">
                                                {it.media_type && `${it.media_type} `}
                                                <StarIcon/>{it.vote_average} / <ThumbUpIcon/>{it.vote_count}
                                            </p>
                                            {it.overview ? <p>{it.overview.substring(0, 120)}...</p> : <p>К сожалению описание для фильма отсутсвует.</p>}
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        );
    }
}

export default ActorFilm;
