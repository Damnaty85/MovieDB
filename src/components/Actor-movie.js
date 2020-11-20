import React, { Component } from 'react';
import Image from 'material-ui-image';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import StarIcon from '@material-ui/icons/Star';
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

const BASE_URL = `https://image.tmdb.org/t/p/w500/`;
const API_KEY = "4a12fb9b58bf682b744ce39c610d9341";

class ActorMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cast: [],
        };
    }

    render() {
        return (
            <section className="actor-movie" style={{marginTop: '50px', padding: '0 20px'}}>
                <h2 style={{color:'white'}}>Фильмы с этим актером:</h2>
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
                style={{padding: '30px 0 40px'}}>
                    {
                        this.state.cast.map(it => {
                            if (!it.poster_path) {
                                return null;
                            }
                            return (
                                <SwiperSlide key={it.credit_id}>
                                    <Link to={{
                                        pathname: `/movie/${it.id}`,
                                        state: {
                                            movie: it.id,
                                            serial: it.name
                                        }
                                    }} className="films__card _inner-card">
                                        <picture className="films__image">
                                            {it.poster_path &&
                                                <Image src={`${BASE_URL}${it.poster_path}`} alt={it.original_title} aspectRatio={(9 / 14)}/>
                                            }
                                        </picture>
                                        <div className="films__information">
                                            <h2 className="_inner-card">{it.title || it.name || it.original_name || it.original_title}</h2>
                                            <p>Дата релиза: {it.release_date || it.first_air_date}</p>
                                            <p className="films__stats">
                                                {/*{it.media_type && `${it.media_type} `}*/}
                                                <StarIcon/>{this.coloringVote(it.vote_average)} из 10 / <ThumbUpIcon/>{it.vote_count}
                                            </p>
                                            {it.overview ? <p>{it.overview.substring(0, 120)}...</p> : <p>К сожалению описание для фильма отсутсвует.</p>}
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </section>
        );
    }

    coloringVote = (vote) => {
        if (vote <= 5) {
            return(
                <span style={{color:'#b30015'}}>{vote}</span>
            )
        }  else if (vote >= 7) {
            return(
                <span style={{color:'#00c228'}}>{vote}</span>
            )
        } else {
            return(
                <span>{vote}</span>
            )
        }
    };

    getData = async () => {
        const actorId = this.props.actorId;
        this.setState({...this.state});
        await fetch(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${API_KEY}&language=ru-RU&sort_by=release_date.desc`)
            .then(response => response.json())
            .then(result => this.setState({
                cast: result.cast,
            }))
            .catch(evt => console.log(evt));
    };

    componentDidMount = () => {
        setTimeout(() => {
            this.getData();
        }, 100)
    };

}

export default ActorMovie;
