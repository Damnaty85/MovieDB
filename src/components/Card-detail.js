import React from 'react';
import {Link} from "react-router-dom";
import Credits from "./Credits";
import Similar from "./Similar";
// import MovieTrailer from "./Movie-trailer";
import "../style/Card-detail.scss";
import StarIcon from '@material-ui/icons/Star';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import Image from "material-ui-image/lib/components/Image/Image";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';

const API_KEY = "4a12fb9b58bf682b744ce39c610d9341";
const BASE_IMG_URL = `https://image.tmdb.org/t/p/original/`;

const MOVIE_BASE_URL = `https://api.themoviedb.org/3/movie/`;
const TV_BASE_URL = `https://api.themoviedb.org/3/tv/`;

class CardDetail extends React.Component {
    state = {
        movieDetail: [],
        isFetching: false,
    };

    componentDidMount = async () => {
        const movieId = this.props.location.state.movie;
        const serialName = this.props.location.state.serial;
        const url = !serialName ? MOVIE_BASE_URL : TV_BASE_URL;
        this.setState({...this.state, isFetching: true});
        await fetch(`${url}${movieId}?api_key=${API_KEY}&language=ru-RU`)
            .then(response => response.json())
            .then(result => this.setState({
                movieDetail: result,
                isFetching: false
            }))
            .catch(e => console.log(e));
    };

    render() {
        const movie = this.state.movieDetail;
        if (!movie.poster_path) {
            return null;
        }
        return (
            <div className="container">
                <section className="card-detail" style={{backgroundImage: `url(${BASE_IMG_URL}${movie.backdrop_path})`}}>
                    <span className="card-detail__gradient">
                        <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px">
                            <defs>
                               <linearGradient id="lgrad" x1="62%" y1="0%" x2="38%" y2="100%">
                                    <stop offset="0%" style={{stopColor: 'rgb(18,18,18)', stopOpacity: '0'}}/>
                                    <stop offset="42%" style={{stopColor: 'rgb(18,18,18)', stopOpacity: '0.57'}}/>
                                    <stop offset="73%" style={{stopColor: 'rgb(5,5,5)', stopOpacity: '1'}}/>
                                    <stop offset="87%" style={{stopColor: 'rgb(0,0,0)', stopOpacity: '1'}}/>
                               </linearGradient>
                            </defs>
                            <rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)"/>
                        </svg>
                    </span>
                    <div className="card-detail__wrapper">
                       <div className="card-detail__top">
                           <img src={`${BASE_IMG_URL}${movie.poster_path}`} alt=""/>
                           <div className="card-detail__information">
                               <h1>{ movie.title ? movie.title : movie.name }</h1>
                               <h4>{movie.original_title || movie.original_name}</h4>
                               <p><b>Дата релиза:</b> {movie.release_date || movie.first_air_date}</p>
                               {
                                   movie.production_countries ? (
                                       <p className="card-detail__countries">{movie.production_countries.length > 1 ? <b>Страны: </b> : <b>Страна: </b>}
                                       {
                                           movie.production_countries.map(contry => {
                                               return contry.name
                                           }).join(`, `)
                                       }
                                       </p>
                                   ) : ('')
                               }
                               { movie.vote_average || movie.vote_count
                                   ? <p className="card-detail__stats"><StarIcon/>{movie.vote_average} из 10 / <ThumbUpIcon/>{movie.vote_count}</p>
                                   : ''}
                               {movie.tagline && <p><b>Слоган:</b> {movie.tagline}</p>}
                               {movie.budget ? <p><b>Бюджет:</b> {movie.budget}$</p> : ""}
                               {movie.revenue ? <p><b>Доход:</b> {movie.revenue}$</p> : ""}
                               {movie.runtime ? <p className="card-detail__stats"><AvTimerIcon/> {movie.runtime} мин.</p> : ''}
                               {movie.episode_run_time &&
                                   <p>
                                       <b>Длина эпизода: </b>
                                       {
                                           movie.episode_run_time.map(episod => {
                                               return `${episod} мин.`
                                           }).join(`, `)
                                       }
                                   </p>
                               }
                               {movie.created_by &&
                               <p><b>{movie.created_by.length > 1 ? `Авторы ` : `Автор `}идеи: </b>
                                   {
                                       movie.created_by.map(author => {
                                           return `${author.name}`
                                       }).join(`, `)
                                   }
                               </p>
                               }
                               {movie.last_episode_to_air &&
                               <p>{`Последний ${movie.last_episode_to_air.episode_number} эпизод ${movie.last_episode_to_air.season_number} сезона вышел ${movie.last_episode_to_air.air_date}`}</p>}
                               {movie.next_episode_to_air &&
                               <p>{`Следующий ${movie.next_episode_to_air.episode_number} эпизод ${movie.next_episode_to_air.season_number} сезона выйдет ${movie.next_episode_to_air.air_date}`}</p>}
                               <p>{movie.in_production ? `` : `Сериал завершился`}</p>
                               <div className="card-detail__genre">
                                   {
                                       movie.genres.map(genre => {
                                           return (
                                               <span key={genre.id}>{genre.name}</span>
                                           )
                                       })
                                   }
                               </div>
                               <div className="card-detail__production">
                                   <b>Производство компаний: </b>
                                   {
                                       movie.production_companies.map(company => {
                                           return company.name
                                       }).join(`, `)
                                   }
                               </div>
                               {movie.homepage && <p><b>Посетить страницу фильма:</b><a href={movie.homepage} target="_blank">{movie.title || movie.name}</a>
                               </p>}
                           </div>
                       </div>
                        <div className="card-detail__bottom">
                            <p>
                                <b>Описание:</b> {!movie.overview ? `Описание для этого фильма отсутсвует` : movie.overview}
                            </p>
                            {movie.seasons &&
                            <Swiper
                                spaceBetween={10}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 2,
                                    },
                                    640: {
                                        slidesPerView: 3,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                    },
                                    1024: {
                                        slidesPerView: 5,
                                    },
                                    1200: {
                                        slidesPerView: 6,
                                    },
                                }}
                            style={{marginTop: '30px'}}>
                                {
                                    movie.seasons.map(season => {
                                        if (!season.poster_path){
                                            return null;
                                        }
                                        return (
                                            <SwiperSlide key={season.id}>
                                                <div className="card-detail__season">
                                                    <Image src={`${BASE_IMG_URL}${season.poster_path}`} alt={season.original_name} aspectRatio={(9 / 14)}/>
                                                    <h4>{season.name || season.original_name}</h4>
                                                    {season.air_date && <p><b>Дата выхода:</b> {season.air_date}</p>}
                                                    {season.episode_count && <p><b>Количество эпизодов:</b> {season.episode_count}</p>}
                                                    {/*{season.overview && <p><b>Описание сезона:</b> {season.overview}</p>}*/}
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                            }
                        </div>
                    </div>
                    {/*<div className="card-detail__back">*/}
                    {/*    <Link to="/" rel="noopener noreferrer"><KeyboardReturnIcon/></Link>*/}
                    {/*</div>*/}
                </section>
                {/*<MovieTrailer movie={this.state.movieDetail.id}/>*/}
                {/*<Posters movie={this.state.movieDetail.id}/>*/}
                <Credits movie={this.state.movieDetail.id} serial={this.state.movieDetail}/>
                {!this.state.movieDetail.seasons &&
                    <Similar movie={this.state.movieDetail.id}/>
                }
            </div>
        );
    }
}


export default CardDetail;

