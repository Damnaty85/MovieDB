import React from 'react';
import {Link} from "react-router-dom";
import Credits from "./Credits";
import Similar from "./Similar";
import "../style/Card-detail.scss";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import StarIcon from '@material-ui/icons/Star';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import Button from '@material-ui/core/Button';

const API_KEY = "4a12fb9b58bf682b744ce39c610d9341";
const BASE_URL = `https://image.tmdb.org/t/p/original/`;

class CardDetail extends React.Component {
    state = {
        movieDetail: [],
        isFetching: false,
    };

    componentDidMount = async () => {
        const movieId = this.props.location.state.movie;
        this.setState({...this.state, isFetching: true});
        await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ru-RU`)
            .then(response => response.json())
            .then(result => this.setState({
                movieDetail: result,
                isFetching: false
            }))
            .catch(e => console.log(e));
    };

    render() {
        const movie = this.state.movieDetail;
        if (!movie.poster_path){
            return null;
        }
        return (
            <div className="container">
                <section className="card-detail" style={{backgroundImage: `url(${BASE_URL}${movie.backdrop_path})`}}>
                    <span className="card-detail__gradient">
                        <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" >
                            <defs>
                               <linearGradient id="lgrad" x1="62%" y1="0%" x2="38%" y2="100%" >
                                    <stop offset="0%" style={{stopColor:'rgb(18,18,18)',stopOpacity:'0'}} />
                                    <stop offset="42%" style={{stopColor:'rgb(18,18,18)',stopOpacity:'0.57'}} />
                                    <stop offset="73%" style={{stopColor:'rgb(5,5,5)',stopOpacity:'1'}} />
                                    <stop offset="87%" style={{stopColor:'rgb(0,0,0)',stopOpacity:'1'}} />
                               </linearGradient>
                            </defs>
                            <rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)"/>
                        </svg>
                    </span>
                    <div className="card-detail__wrapper">
                        <img src={`${BASE_URL}${movie.poster_path}`} alt=""/>
                        <div className="card-detail__information">
                            <h1>{movie.title}</h1>
                            <h4>{movie.original_title}</h4>
                            <p className="card-detail__stats"><StarIcon/>{movie.vote_average} из 10 / <ThumbUpIcon/>{movie.vote_count}</p>
                            {movie.tagline && <p><b>Слоган:</b> {movie.tagline}</p>}
                            {movie.budget  ? <p><b>Бюджет:</b> {movie.budget}$</p> : ""}
                            {movie.revenue ? <p><b>Доход:</b> {movie.revenue}$</p> : ""}
                            {movie.runtime && <p className="card-detail__stats"><AvTimerIcon/> {movie.runtime} мин.</p>}
                            <div className="card-detail__genre">
                                {
                                    movie.genres.map(genre => {
                                        return (
                                            <span key={genre.id}>{genre.name} </span>
                                        )
                                    })
                                }
                            </div>
                            <p><b>Описание:</b> {!movie.overview ? `Описание для этого фильма отсутсвует` : movie.overview}</p>
                            {movie.homepage && <p><b>Посетить страницу фильма:</b><a href={movie.homepage} target="_blank">{movie.original_title}</a></p>}
                            <p><b>Дата релиза:</b> {movie.release_date}</p>
                            <div className="card-detail__production">
                                <b>Производство компаний: </b>
                                {
                                    movie.production_companies.map(company => {
                                        return (
                                            <span key={company.id}>
                                                {company.name}
                                                {/*{!company.logo_path ? '' : <img src={`${BASE_URL}${company.logo_path}`} alt={company.name}/>}*/}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <Button variant="contained" color="primary">
                        <Link to="/" rel="noopener noreferrer"><KeyboardReturnIcon/>вернуться к списку фильмов</Link>
                    </Button>
                </section>
                <Credits movie={this.state.movieDetail.id}/>
                <Similar movie={this.state.movieDetail.id}/>
            </div>
        );
    }
}


export default CardDetail;

