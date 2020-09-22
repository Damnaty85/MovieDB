import React, {useState, useEffect} from 'react';
import "../style/Card.scss"
import Card from "./Card";
import axios from "./axios"
import Pagination from "./Pagination";
import FlipMove from "react-flip-move";

const Result = ({selectedOption, searchMovies, emptyField}) => {
    const [movies, setMovies] = useState([]);
    const [totalResults, setTotalResults] = useState('0');
    const [currentPage, setCurrentPage] = useState('1');

    useEffect((pageNumber) => {
        async function fetchData() {
            const request = await axios.get(`${selectedOption}&page=${pageNumber}`);
            setMovies(request.data.results);
            setTotalResults(request.data.total_results);
            setCurrentPage(pageNumber);
            return request;
        }

        fetchData();
    }, [selectedOption]);

    const nextPage = (pageNumber) => {

        async function fetchData() {
            const request = await axios.get(`${selectedOption}&page=${pageNumber}`);
            setMovies(request.data.results);
            setTotalResults(request.data.total_results);
            setCurrentPage(pageNumber);
            return request;
        }

        fetchData();
    };

    const numberPages = Math.floor(totalResults / 20);

    let data;
    const isSearching = emptyField.length === 0 ? data = movies : data = searchMovies;

    return (
        <div>
            <FlipMove className="films">
                {
                    isSearching &&
                        data.map((movie) => (
                            <Card movie={movie} key={movie.id}/>
                        ))
                }
            </FlipMove>
            {numberPages > 1 &&
                <Pagination pages={numberPages} currentPage={currentPage} nextPage={nextPage}/>
            }
        </div>
    );
};
export default Result;

// тоже самое что выше только на классе вместо функционального компонента
// const BASE_URL = `https://api.themoviedb.org/3`;
// class Results extends React.Component {
//     constructor (props){
//         super(props);
//         this.state = {
//             movies: [],
//             setMovies: '',
//             totalResults: 0,
//             currentPage: 1,
//         };
//     }
//
//     getMovie = () => {
//         const page = this.props.selectedOption;
//         fetch(`${BASE_URL}${page}&page=1`)
//             .then(response => response.json())
//             .then(request => this.setState({
//                 movies: request.results,
//                 setMovies: this.props.selectedOption,
//                 totalResults: request.total_results,
//             }))
//             .catch(e => console.log(e));
//     };
//
//     componentDidUpdate (nextProps) {
//         if (nextProps.selectedOption !== this.props.selectedOption) {
//             this.getMovie();
//         }
//     }
//
//     nextPage = (pageNumber) => {
//         const page = this.props.selectedOption;
//         fetch(`${BASE_URL}${page}&page=${pageNumber}`)
//             .then(response => response.json())
//             .then(request => this.setState({
//                 movies: request.results,
//                 currentPage: pageNumber,
//             }))
//             .catch(e => console.log(e));
//     };
//
//     render() {
//         let movies = this.state.movies;
//         if (!movies.length){
//             return null;
//         }
//         const numberPages = Math.floor(this.state.totalResults / 21);
//         return (
//             <div className="wrapper">
//                  {this.props.movies.length !== 0 &&
//                     (<FlipMove className="films">
//                             {
//                                 this.props.movies.map((movie) => (
//                                     <Card movie={movie} key={movie.id}/>
//                                 ))
//                             }
//                     </FlipMove>)
//                 }
//                 {  movies.length !==0 &&
//                     (<FlipMove className="films">
//                             {
//                                 movies.map((movie) => (
//                                     <Card movie={movie} key={movie.id}/>
//                                 ))
//                             }
//                     </FlipMove>)
//                 }
//                 {movies.length >= 20 &&
//                     <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/>
//                 }
//             </div>
//         );
//     }
//
//     componentDidMount() {
//         this.getMovie();
//     }
// }
//
// export default Results;
