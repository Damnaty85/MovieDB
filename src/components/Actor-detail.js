import React, {Component} from 'react';
import ActorMovie from "./Actor-movie";
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import '../style/Actor-detail.scss'
import {Link} from "react-router-dom";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

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
                        {actor.profile_path &&
                            <Image src={`${BASE_URL}${actor.profile_path}`} alt={actor.name} aspectRatio={(9 / 13)}/>
                        }
                    </picture>
                    <div className="actor-detail__info">
                        <h2>{actor.name}</h2>
                        {actor.birthday && <Typography>Дата рождения: {actor.birthday}</Typography>}
                        {actor.deathday && <Typography>Дата смерти: {actor.deathday}</Typography>}
                        {actor.place_of_birth && <Typography>Место рождения: {actor.place_of_birth}</Typography>}
                        <Typography>{actor.biography}</Typography>
                    </div>
                </div>

                <div className="buttons__wrap">
                    <Link to="#" onClick={this.clickingEffect}><ArrowBackIcon/>Назад</Link>
                    <Link to="/" onClick={this.clickingEffect}><KeyboardReturnIcon/>Нa главную</Link>
                </div>

                <div style={{padding: '0 20px'}}>
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
                            }
                        }}
                        >
                        {
                            actorImages.map(image => {
                                return (
                                    <SwiperSlide key={image.file_path}>
                                        <a href={`${BASE_URL_ORIGINAL}${image.file_path}`} onClick={this.getBigPicture}>
                                            <Image src={`${BASE_URL}${image.file_path}`} alt={actor.name} aspectRatio={(9 / 13)}/>
                                        </a>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
                <ActorMovie actorId={actor.id}/>
            </div>
        );
    }

    clickingEffect = (evt) => {
        evt.preventDefault();
        let linkTo = evt.currentTarget.getAttribute('href');
        let bounds = evt.currentTarget.getBoundingClientRect();
        let xAxis = evt.clientX - bounds.left;
        let yAxis = evt.clientY - bounds.top;

        evt.target.style.overflow = `hidden`;
        const hover = document.createElement('span');
        hover.style = `height:5px;width:5px;transition:0.3s;background:rgba(255, 255, 255, 0.2);position:absolute;top:${yAxis-2.5}px;left:${xAxis-2.5}px;transition:0.9s;border-radius:100%;`;
        evt.target.insertAdjacentElement('afterbegin', hover);
        setTimeout(() => {
            hover.style = `height:300px;width:300px;transition:0.3s;background:rgba(255, 255, 255, 0.2);position:absolute;top:${yAxis-150}px;left:${xAxis-150}px;transition:0.9s;border-radius:100%;`;
            setTimeout(() => {
                hover.style.opacity = '0';
                hover.style.pointerEvents = `none`;
                setTimeout(() => {
                    hover.remove();
                    linkTo === window.location.pathname ? window.history.back() : document.location.href = linkTo;
                }, 400);
            }, 200);
        }, 50);
    };

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

        const thisItem = evt.currentTarget;

        let src = thisItem.getAttribute('href');
        // let nextPicture = thisItem.parentElement.nextElementSibling.querySelector('a').getAttribute('href');

        const modalImage = document.createElement('div');
        modalImage.classList.add('actor-detail__overlay');
        let posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        let height = window.innerHeight;
        let width = window.innerWidth;
        modalImage.style = `width: ${width}px;height:${height}px;min-height:100vh;top:${posTop}px;opacity:0;`;
        document.querySelector('.actor-detail').insertAdjacentElement('afterend', modalImage);
        const imageWrap = document.createElement('div');
        imageWrap.classList.add('actor-detail__image-wrap');
        modalImage.insertAdjacentElement('afterbegin', imageWrap);
        imageWrap.style =`height: ${height}px;padding:20px;`;
        const image = document.createElement('img');
        image.setAttribute('src', src);
        imageWrap.insertAdjacentElement('afterbegin', image);
        image.style = `opacity:0;`;
        document.querySelector('body').style.overflow = 'hidden';
        modalImage.addEventListener('click', (evt) => {
            modalImage.remove();
            document.querySelector('body').style.overflow = 'unset';
        });
        setTimeout(() => {
            modalImage.style = `width: ${width}px;height:${height}px;top:${posTop}px;opacity:1;transition:0.4s;`;
            setTimeout(() => {
                image.style = `opacity:1;transition:0.4s;height:100%`
            }, 150)
        }, 100);


        let move = null;

        image.addEventListener("touchstart", function (evt) {
            move = evt;
        });
        image.addEventListener("touchmove", function (evt) {
            let y = evt.touches[0].pageY - move.touches[0].pageY;
            // let x = evt.touches[0].pageX - move.touches[0].pageX;
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

    // hoverCard = (evt) => {
    //     let emptyBox = document.createElement('div');
    //     emptyBox.classList.add('box-empty');
    //
    //     const height = evt.target.offsetHeight;
    //     const width = evt.target.offsetWidth;
    //
    //     emptyBox.style = `width:${width}px;height:${height}px;position:absolute;`;
    //
    //     evt.currentTarget.insertAdjacentElement('beforebegin', emptyBox);
    //
    //     const x = emptyBox.getBoundingClientRect().left;
    //     const y = emptyBox.getBoundingClientRect().top;
    //
    //     let posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    //
    //     evt.currentTarget.style = `position:fixed;top:${y + posTop}px;left:${x}px;height:auto;transition:0.3s;z-index:1;`;
    // };
    //
    // removeHover = (evt) => {
    //     document.querySelector('.box-empty').remove();
    //     evt.currentTarget.style = `position:relative;transition:0.3s`;
    // };
}

export default ActorDetail;
