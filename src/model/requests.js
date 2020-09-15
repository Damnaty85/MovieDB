const API_KEY = "4a12fb9b58bf682b744ce39c610d9341";

export default {
    fetchUpComing: `/movie/upcoming?api_key=${API_KEY}&language=ru-RU`,
    fetchActionMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=28`,
    fetchCrimeMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=80`,
    fetchComedyMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=35`,
    fetchHorrorMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=27`,
    fetchThrillerMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=53`,
    fetchRomanceMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=10749`,
    fetchMysteryMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=9648`,
    fetchSciFiMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=878`,
    fetchFantasyMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=14`,
    fetchHistoryMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=36`,
    fetchWesternMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=37`,
    fetchWarMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=10752`,
    fetchAnimation: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=16`,
}
