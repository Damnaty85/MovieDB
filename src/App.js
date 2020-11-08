import React, {useEffect, useState} from 'react';
import './App.scss';
import Navigation from "./components/Navigation";
import Result from "./components/Results";
import requests from "./model/requests";
import Search from "./components/Search";
import Header from "./components/Header";
import axios from "./components/axios";
import Pagination from "./components/Pagination";

const API_KEY = `4a12fb9b58bf682b744ce39c610d9341`;
const BASE_SEARCH_URL = `https://api.themoviedb.org/3/search/multi`;

function App() {
    const [selectedOption, setSelectedOption] = useState(requests.movie.fetchUpComing);
    const [searchResult, setFindMovies] = useState([]);
    const [search, setSearchMovies] = useState('');
    const [movies, setMovies] = useState([]);
    const [totalResults, setTotalResults] = useState('0');
    const [currentPage, setCurrentPage] = useState('1');

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`${selectedOption}`);
            setMovies([...request.data.results]);
            setTotalResults(request.data.total_results);
            return request;
        }
        fetchData();
    }, [selectedOption]);

    const handleSearchSubmit = async (evt, pageNumber) => {
        evt.preventDefault();
        await fetch(`${BASE_SEARCH_URL}?api_key=${API_KEY}&language=ru-RU&query=${search}&page=${pageNumber}`)
            .then(data => data.json())
            .then(data => {
                setFindMovies([...data.results]);
                setTotalResults(data.total_results);
                setCurrentPage(pageNumber);
            })
            .catch(err => console.log(err))
    };

    const nextPage = (pageNumber) => {
        async function fetchData() {
            const request = await axios.get(`${selectedOption}&page=${pageNumber}`);
            setMovies([...request.data.results]);
            setTotalResults(request.data.total_results);
            setCurrentPage(pageNumber);
            return request;
        }

        fetchData();
    };

    const handleChange = (evt) => {
        setSearchMovies(evt.target.value)
    };

    const totalPages = Math.floor(totalResults / 20);

    return (
        <main className="App">
            <div className="App__top">
                <Search handleSubmit={handleSearchSubmit} handleChange={handleChange}/>
                <Header/>
            </div>
            <Navigation setSelectedOption={setSelectedOption}/>
            <Result movies={movies} searchResult={searchResult} emptyField={search}/>
            {
                totalPages > 1 &&
                <Pagination totalPages={totalPages} currentPage={currentPage} nextPage={nextPage}/>
            }
        </main>
    );
}

export default App;
