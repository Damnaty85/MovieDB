import React from 'react';
import "../style/Credit.scss"
import Image from 'material-ui-image';
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';

const API_KEY = "4a12fb9b58bf682b744ce39c610d9341";
const BASE_URL = `https://image.tmdb.org/t/p/w500/`;

export default class Cast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            credits: [],
        };

    }

    render() {
        const movie = this.state.credits;
        if (!movie.cast) {
            return null;
        }

        return (
            <section className="cast" style={{padding: '0 20px'}}>
                <h2>В фильме снимались:</h2>
                <Swiper
                    spaceBetween={10}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                        },
                        480: {
                            slidesPerView: 3,
                        },
                        640: {
                            slidesPerView: 4,
                        },
                        768: {
                            slidesPerView: 5,
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                        1200: {
                            slidesPerView: 7,
                        },
                        1400: {
                            slidesPerView: 8,
                        },
                    }}
                >
                    {
                        movie.cast.map(actor => {
                            return (
                                <SwiperSlide key={actor.id}>
                                    <Link to={{
                                        pathname: `/actor/${actor.id}`,
                                        state: {
                                            credits: actor.id
                                        }
                                    }} className="cast__item" key={actor.id}>
                                        <picture className="cast__photo"
                                                 style={{width: '100%', float: 'left', marginRight: '20px'}}>
                                            {actor.profile_path === null ?
                                                <Image src="/src/image/nofoto.png" alt={actor.name}
                                                       aspectRatio={(9 / 13)}/> :
                                                <Image src={`${BASE_URL}${actor.profile_path}`} alt={actor.name}
                                                       aspectRatio={(9 / 13)}/>
                                            }
                                        </picture>
                                        <div className="cast__info">
                                            <h3>{actor.name}</h3>
                                            {actor.character && <p><b>Персонаж: </b><span>{actor.character}</span></p>}
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
    getData() {
        setTimeout(() => {
            const movieId = this.props.movie;
            const url = this.props.serial.seasons ? `tv` : `movie`;
            fetch(`https://api.themoviedb.org/3/${url}/${movieId}/credits?api_key=${API_KEY}&language=ru-RU`)
                .then(response => response.json())
                .then(result => this.setState({
                    credits: result,
                }))
                .catch(e => console.log(e));
        }, 100)
    }

    componentDidMount = () => {
        this.getData();
    };
}


