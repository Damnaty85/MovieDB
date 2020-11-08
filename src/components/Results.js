import React from 'react';
// import React, {useState, useEffect} from 'react';
import "../style/Card.scss"
import Card from "./Card";
// import axios from "./axios"
// import Pagination from "./Pagination";
import FlipMove from "react-flip-move";
import Person from "./Person";

const Result = ({movies, searchResult, emptyField}) => {
    let data;
    const isSearching = emptyField.length === 0 ? data = movies : data = searchResult;

    if (searchResult === 0) {
        return false;
    }

    const searchTarget = (target) => {
        if (isSearching && target.media_type === 'person') {
            return <Person person={target} key={target.id}/>;
        } else {
            return <Card movie={target} key={target.id}/>;
        }
    };

    return (
        <FlipMove className="films">
            {
                data.map((target) => (
                    searchTarget(target)
                ))
            }
        </FlipMove>
    );
};
export default Result;
