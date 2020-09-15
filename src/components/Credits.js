import React from 'react';
import "../style/Credit.scss"
import Image from 'material-ui-image';
import {Link} from "react-router-dom";

const API_KEY = "4a12fb9b58bf682b744ce39c610d9341";
const BASE_URL = `https://image.tmdb.org/t/p/original/`;

export default class Credits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            credits: [],
        };

    }

    getData(){
        setTimeout(() => {
            const movieId = this.props.movie;
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=ru-RU`)
                .then(response => response.json())
                .then(result => this.setState({
                    credits: result,
                }))
                .catch(e => console.log(e));
        }, 1500)
    }

    componentDidMount = () => {
        this.getData();
    };

    render() {
        const movie = this.state.credits;
        return (
            <section className="actors">
                <h2>Актерский состав</h2>
                {movie.length !== 0 && (
                    <div className="actors__container">
                        <div className="actors__wrap">
                            {
                                movie.cast.map(actor => {
                                    return(
                                        <Link to={{
                                            pathname: `/actor/${actor.id}`,
                                            state: {
                                                credits: actor.id
                                            }
                                        }} className="actors__item" key={actor.id}>
                                            <picture className="actors__photo" style={{width:'240px', float: 'left', marginRight: '20px'}}>
                                                {actor.profile_path === null ?
                                                    <Image src="/src/image/nofoto.png" alt={actor.name} aspectRatio={(9/13)}/> :
                                                    <Image src={`${BASE_URL}${actor.profile_path}`} alt={actor.name} aspectRatio={(9/13)}/>
                                                }
                                            </picture>
                                            <div className="actors__info">
                                                <h3>{actor.name}</h3>
                                                <p><b>Персонаж: </b><span>{actor.character}</span></p>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                )}
            </section>
        );
    }
}


