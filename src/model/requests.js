const API_KEY = "4a12fb9b58bf682b744ce39c610d9341";

export default {
    movie: {
        fetchUpComing: `/movie/upcoming?api_key=${API_KEY}&language=ru-RU`,
        fetchActionMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=28`,
        fetchAdventureMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=12`,
        fetchCrimeMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=80`,
        fetchComedyMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=35`,
        fetchHorrorMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=27`,
        fetchThrillerMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=53`,
        fetchRomanceMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=10749`,
        fetchMusicMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=10402`,
        fetchMysteryMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=9648`,
        fetchSciFiMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=878`,
        fetchFantasyMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=14`,
        fetchHistoryMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=36`,
        fetchWesternMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=37`,
        fetchWarMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=10752`,
        fetchAnimation: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=16`,
        fetchTVMovie: `/discover/movie?api_key=${API_KEY}&language=ru-RU&with_genres=10770`,
    },
    tv : {
        fetchActionTv: `/discover/tv?api_key=${API_KEY}&language=ru-RU&with_genres=10759`,
        fetchCartoonTv: `/discover/tv?api_key=${API_KEY}&language=ru-RU&with_genres=16`,
        fetchComedyTv: `/discover/tv?api_key=${API_KEY}&language=ru-RU&with_genres=35`,
        fetchCrimeTv: `/discover/tv?api_key=${API_KEY}&language=ru-RU&with_genres=80`,
        fetchDocumentaryTv: `/discover/tv?api_key=${API_KEY}&language=ru-RU&with_genres=99`,
        fetchRomanceTv: `/discover/tv?api_key=${API_KEY}&language=ru-RU&with_genres=18`,
        fetchFamilyTv: `/discover/tv?api_key=${API_KEY}&language=ru-RU&with_genres=10751`,
        fetchKidsTv: `/discover/tv?api_key=${API_KEY}&language=ru-RU&with_genres=10762`,
        fetchDetectiveTv: `/discover/tv?api_key=${API_KEY}&language=ru-RU&with_genres=9648`,
        fetchFantasyTv: `/discover/tv?api_key=${API_KEY}&language=ru-RU&with_genres=10765`,
        fetchOperaTv: `/discover/tv?api_key=${API_KEY}&language=ru-RU&with_genres=10766`,
        fetchWarPoliticTv: `/discover/tv?api_key=${API_KEY}&language=ru-RU&with_genres=10768`,
        fetchWarWesternTv: `/discover/tv?api_key=${API_KEY}&language=ru-RU&with_genres=37`,
    }
}
