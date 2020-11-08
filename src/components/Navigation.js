import React from 'react';
import "../style/Navigation.scss"
import requests from "../model/requests";
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        display: 'flex',
        alignItems: 'center',
        margin: '20px 0'
    },
    formControl: {
        maxWidth: 300,
        width: '100%',
        marginRight: '20px'
    },
    inputLabel: {
        color: 'white',
    },
    select: {
        color: 'white',
    },
    helperText: {
        color: 'white'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Navigation = ({setSelectedOption}) => {
    const classes = useStyles();
    const [genreMovie, setGenreMovie] = React.useState('');
    const [genreTv, setGenreTv] = React.useState('');
    const handleChangeMovie = (event) => {
        setGenreMovie(event.target.value);
    };
    const handleChangeTv = (event) => {
        setGenreTv(event.target.value);
    };

    return (
        <div className={classes.formWrapper}>
            <FormControl className={classes.formControl}>
                <InputLabel className={classes.inputLabel}>Фильмы</InputLabel>
                <Select className={classes.select} value={genreMovie} onChange={handleChangeMovie} autoWidth>
                    <MenuItem value={1} onClick={() => setSelectedOption(requests.movie.fetchUpComing)}>Новинки</MenuItem>
                    <MenuItem value={2} onClick={() => setSelectedOption(requests.movie.fetchActionMovie)}>Боевики</MenuItem>
                    <MenuItem value={2} onClick={() => setSelectedOption(requests.movie.fetchAdventureMovie)}>Приключения</MenuItem>
                    <MenuItem value={3} onClick={() => setSelectedOption(requests.movie.fetchCrimeMovie)}>Криминал</MenuItem>
                    <MenuItem value={4} onClick={() => setSelectedOption(requests.movie.fetchComedyMovie)}>Комедии</MenuItem>
                    <MenuItem value={5} onClick={() => setSelectedOption(requests.movie.fetchHorrorMovie)}>Ужасы</MenuItem>
                    <MenuItem value={6} onClick={() => setSelectedOption(requests.movie.fetchMysteryMovie)}>Мистика</MenuItem>
                    <MenuItem value={7} onClick={() => setSelectedOption(requests.movie.fetchThrillerMovie)}>Триллеры</MenuItem>
                    <MenuItem value={8} onClick={() => setSelectedOption(requests.movie.fetchRomanceMovie)}>Драмы</MenuItem>
                    <MenuItem value={8} onClick={() => setSelectedOption(requests.movie.fetchMusicMovie)}>Музыкальные</MenuItem>
                    <MenuItem value={9} onClick={() => setSelectedOption(requests.movie.fetchSciFiMovie)}>Научная фантастика</MenuItem>
                    <MenuItem value={10} onClick={() => setSelectedOption(requests.movie.fetchFantasyMovie)}>Фэнтази</MenuItem>
                    <MenuItem value={11} onClick={() => setSelectedOption(requests.movie.fetchWesternMovie)}>Вестерны</MenuItem>
                    <MenuItem value={12} onClick={() => setSelectedOption(requests.movie.fetchHistoryMovie)}>Исторические</MenuItem>
                    <MenuItem value={13} onClick={() => setSelectedOption(requests.movie.fetchWarMovie)}>Военные</MenuItem>
                    <MenuItem value={14} onClick={() => setSelectedOption(requests.movie.fetchAnimation)}>Мультфильмы</MenuItem>
                    <MenuItem value={14} onClick={() => setSelectedOption(requests.movie.fetchTVMovie)}>Телевизионный фильм</MenuItem>
                </Select>
                <FormHelperText className={classes.helperText}>Выберете жанр фильмов, который вам интересен</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel className={classes.inputLabel}>Сериалы</InputLabel>
                <Select
                    className={classes.select}
                    value={genreTv}
                    onChange={handleChangeTv}
                    autoWidth
                >
                    <MenuItem value={15} onClick={() => setSelectedOption(requests.tv.fetchActionTv)}>Боевик и Приключения</MenuItem>
                    <MenuItem value={16} onClick={() => setSelectedOption(requests.tv.fetchCartoonTv)}>Мультфильм</MenuItem>
                    <MenuItem value={17} onClick={() => setSelectedOption(requests.tv.fetchComedyTv)}>Комедия</MenuItem>
                    <MenuItem value={18} onClick={() => setSelectedOption(requests.tv.fetchCrimeTv)}>Криминал</MenuItem>
                    <MenuItem value={19} onClick={() => setSelectedOption(requests.tv.fetchDocumentaryTv)}>Документальный</MenuItem>
                    <MenuItem value={20} onClick={() => setSelectedOption(requests.tv.fetchRomanceTv)}>Драма</MenuItem>
                    <MenuItem value={21} onClick={() => setSelectedOption(requests.tv.fetchFamilyTv)}>Семейный</MenuItem>
                    <MenuItem value={22} onClick={() => setSelectedOption(requests.tv.fetchKidsTv)}>Детский</MenuItem>
                    <MenuItem value={23} onClick={() => setSelectedOption(requests.tv.fetchDetectiveTv)}>Детектив</MenuItem>
                    <MenuItem value={26} onClick={() => setSelectedOption(requests.tv.fetchFantasyTv)}>НФ и Фэнтези</MenuItem>
                    <MenuItem value={27} onClick={() => setSelectedOption(requests.tv.fetchOperaTv)}>Мыльная опера</MenuItem>
                    <MenuItem value={29} onClick={() => setSelectedOption(requests.tv.fetchWarPoliticTv)}>Война и Политика</MenuItem>
                    <MenuItem value={30} onClick={() => setSelectedOption(requests.tv.fetchWarWesternTv)}>Вестерн</MenuItem>
                </Select>
                <FormHelperText className={classes.helperText}>Выберете жанр сериалов, который вам интересен</FormHelperText>
            </FormControl>
        </div>
    );
};

export default Navigation;
