import React, {Component} from 'react';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import TextTruncate from 'react-text-truncate';

const API_KEY = "4a12fb9b58bf682b744ce39c610d9341";
const BASE_URL = `https://image.tmdb.org/t/p/original/`;

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

    render() {
        const actor = this.state.actorData;
        const actorImages = this.state.images.profiles;

        if (!actorImages){
            return null;
        }
        return (
            <div style={{color: 'white', padding: "20px", width: '100%', margin: '0 auto'}}>
                <div className="actor-detail__information" style={{minHeight: '380px'}}>
                    <picture className="actors__photo" style={{width:'240px', float: 'left', marginRight: '20px', height: 'auto', marginBottom: '20px'}}>
                        {actor.profile_path === null ?
                            <Image src="/src/image/nofoto.png" alt={actor.name} aspectRatio={(9/13)}/> :
                            <Image src={`${BASE_URL}${actor.profile_path}`} alt={actor.name} aspectRatio={(9/13)}/>
                        }
                    </picture>
                    <h2>{actor.name}</h2>
                    <Typography style={{margin: '10px 0'}}>Дата рождения: {actor.birthday}</Typography>
                    <Typography style={{margin: '10px 0'}}>Место рождения: {actor.place_of_birth}</Typography>
                    <Typography style={{margin: '10px 0'}}>{actor.biography}</Typography>
                </div>
                <Button variant="outlined" color="default" style={{margin: '20px 0'}}>
                    <Link
                        to="/"
                        rel="noopener noreferrer"
                        style={{
                            display: 'grid',
                            placeItems: 'center',
                            gridTemplateColumns: '40px 1fr',
                            color: 'white',
                            textDecoration: 'none'
                        }}><KeyboardReturnIcon/>вернуться к списку фильмов</Link>
                </Button>
                <div className="actor-detail__gallery" style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))"}}>
                    {
                        actorImages.map(image => {
                            return(
                                <Image key={image.file_path} src={`${BASE_URL}${image.file_path}`} alt={actor.name} aspectRatio={(9/13)}/>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default ActorDetail;
