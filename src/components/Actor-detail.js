import React, {Component} from 'react';
import ActorFilm from "./Actor-film";
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import '../style/Actor-detail.scss'
import {Link} from "react-router-dom";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';

const API_KEY = "4a12fb9b58bf682b744ce39c610d9341";
const BASE_URL = `https://image.tmdb.org/t/p/w500/`;
const BASE_URL_ORIGINAL = `https://image.tmdb.org/t/p/original/`;

class ActorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actorData: [],
            images: [],
        };
    }

    getData = async () => {
        const actorId = this.props.match.params.id;
        this.setState({...this.state});
        await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=ru-RU`)
            .then(response => response.json())
            .then(result => this.setState({
                actorData: result,
            }))
            .catch(e => console.log(e));
    };

    getImage = async () => {
        const actorId = this.props.match.params.id;
        this.setState({...this.state});
        await fetch(`https://api.themoviedb.org/3/person/${actorId}/images?api_key=${API_KEY}&language=ru-RU`)
            .then(response => response.json())
            .then(result => this.setState({
                images: result,
            }))
            .catch(e => console.log(e));
    };

    componentDidMount = async () => {
        this.getData();
        this.getImage();
    };

    getBigPicture = (evt) => {
        evt.preventDefault();

        let src = evt.target.parentElement.parentElement.getAttribute('href');
        const modalImage = document.createElement('div');
        modalImage.classList.add('actor-detail__overlay');
        let posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        let height = window.screen.availHeight;
        let width = window.screen.availWidth;
        modalImage.style = `width: ${width}px;height:${height}px;top:${posTop}px;opacity:0;`;
        document.querySelector('.actor-detail').insertAdjacentElement('afterend', modalImage);
        const imageWrap = document.createElement('div');
        imageWrap.classList.add('actor-detail__image-wrap');
        modalImage.insertAdjacentElement('afterbegin', imageWrap);
        imageWrap.style = `height: ${height}px;`;
        const image = document.createElement('img');
        image.setAttribute('src', src);
        imageWrap.insertAdjacentElement('afterbegin', image);
        document.querySelector('body').style.overflow = 'hidden';
        modalImage.addEventListener('click', (evt) => {
            modalImage.remove();
            document.querySelector('body').style.overflow = 'unset';
        });
        setTimeout(() => {
            modalImage.style = `width: ${width}px;height:${height}px;top:${posTop}px;opacity:1;transition:0.4s;`
        }, 100);

        let move = null;

        image.addEventListener("touchstart", function (evt) {
            move = evt;
        });
        image.addEventListener("touchmove", function (evt) {
                let y = evt.touches[0].pageY - move.touches[0].pageY;
                let x = evt.touches[0].pageX - move.touches[0].pageX;
                image.style.top = `${y}px`;
                if (y < -124) {
                    modalImage.style.opacity = '0';
                    setTimeout(() => {
                        modalImage.remove();
                        document.querySelector('body').style.overflow = 'unset';
                    }, 200);
                } else if (y > 115) {
                    modalImage.style.opacity = '0';
                    setTimeout(() => {
                        modalImage.remove();
                        document.querySelector('body').style.overflow = 'unset';
                    }, 200);
                }
                // image.style.left = `${x}px`;
        });
        image.addEventListener("touched", function (evt) {
            move = null;
        });
    };

    render() {
        const actor = this.state.actorData;
        const actorImages = this.state.images.profiles;

        if (!actorImages) {
            return null;
        }
        return (
            <div className="actor-detail">
                <div className="actor-detail__wrap">
                    <picture className="actor-detail__photo">
                        {actor.profile_path === null ?
                            <Image src="/src/image/nofoto.png" alt={actor.name} aspectRatio={(9 / 13)}/> :
                            <Image src={`${BASE_URL}${actor.profile_path}`} alt={actor.name} aspectRatio={(9 / 13)}/>
                        }
                    </picture>
                    <div className="actor-detail__info">
                        <h2>{actor.name}</h2>
                        <Typography>Дата рождения: {actor.birthday}</Typography>
                        <Typography>Место рождения: {actor.place_of_birth}</Typography>
                        <Typography>{actor.biography}</Typography>
                    </div>
                </div>
                <div className="actor-detail__back">
                    <Link to="/" rel="noopener noreferrer"><KeyboardReturnIcon/></Link>
                </div>
                <Swiper
                    spaceBetween={10}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                        },
                        540: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 5,
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
                        actorImages.map(image => {
                            return (
                                <SwiperSlide key={image.file_path}>
                                    <a href={`${BASE_URL_ORIGINAL}${image.file_path}`} onClick={this.getBigPicture}>
                                        <Image src={`${BASE_URL}${image.file_path}`} alt={actor.name}
                                               aspectRatio={(9 / 13)}/>
                                    </a>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                <ActorFilm actorId={actor.id}/>
            </div>
        );
    }
}

export default ActorDetail;
