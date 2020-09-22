import React, {useState} from 'react';
import './App.scss';
import Navigation from "./components/Navigation";
import Result from "./components/Results";
import requests from "./model/requests";
import Search from "./components/Search";
import Header from "./components/Header";

const API_KEY = `4a12fb9b58bf682b744ce39c610d9341`;

function App() {
    const [selectedOption, setSelectedOption] = useState(requests.fetchUpComing);
    const [movies, setFindMovies] = useState([]);
    const [searchMovies, setSearchMovies] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ru-RU&query=${searchMovies}`)
            .then(data => data.json())
            .then(data => {
                setFindMovies([...data.results])
            })
    };

    const handleChange = (evt) => {
        setSearchMovies(evt.target.value)
    };

    return (
        <main className="App">
            <div className="App__top">
                <Search handleSubmit={handleSubmit} handleChange={handleChange}/>
                <Header/>
            </div>
            <Navigation setSelectedOption={setSelectedOption}/>
            <Result selectedOption={selectedOption} searchMovies={movies} emptyField={searchMovies}/>
        </main>
    );
}

export default App;
