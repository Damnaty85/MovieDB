import React, {forwardRef} from 'react';
import Image from "material-ui-image/lib/components/Image/Image";
import '../style/Person.scss'
import {Link} from "react-router-dom";

const BASE_URL = `https://image.tmdb.org/t/p/original/`;

const Person = forwardRef (({person}, ref) => {
    if (!person.profile_path){
        return null;
    }
    return (
        <div ref={ref} className="person__card">
            <Link to={{
                pathname: `/actor/${person.id}`,
                state: {
                    credits: person.id
                }
            }} key={person.id}>
            <picture className="person__image">
                {person.profile_path &&
                    <Image src={`${BASE_URL}${person.profile_path}`} alt={person.name}
                           aspectRatio={(9 / 14)}/>
                }
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="50px" >
                    <defs>
                        <linearGradient id="lgrad" x1="50%" y1="0%" x2="50%" y2="100%" >
                            <stop offset="0%" style={{stopColor:'rgb(0,0,0)',stopOpacity:'0'}}/>
                            <stop offset="25%" style={{stopColor:'rgba(0,0,0,0)',stopOpacity:'1'}}/>
                            <stop offset="50%" style={{stopColor:'rgba(0,0,0,0.5)',stopOpacity:'1'}}/>
                            <stop offset="75%" style={{stopColor:'rgb(0,0,0)',stopOpacity:'1'}}/>
                            <stop offset="100%" style={{stopColor:'rgb(0,0,0)',stopOpacity:'1'}}/>
                        </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)"/>
                </svg>
            </picture>
            <div className="person__information">
                <span className="person__name">{person.name}</span>
                <span>{person.known_for_department}</span>
                <span>{person.gender === 2 ? `Известен по:`: `Известна по:`}</span>
                    {
                        person.known_for.map(it => (
                                (() => {
                                    if (!it.title) {
                                        return it.name
                                    } else if (!it.name) {
                                        return it.title
                                    } else {
                                        return it.original_title
                                    }
                                })()
                        )).join(', ')
                    }
            </div>
            </Link>
        </div>
    );
});

export default Person;
