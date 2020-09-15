import React from 'react';
import "../style/Navigation.scss"
import requests from "../model/requests";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        maxWidth: 300,
        width: '100%',
        marginLeft: 15,
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
    const [genre, setGenre] = React.useState('');
    const handleChange = (event) => {
        setGenre(event.target.value);
    };
    return (
        <FormControl className={classes.formControl}>
            <InputLabel className={classes.inputLabel}>Жанры</InputLabel>
            <Select
                className={classes.select}
                value={genre}
                onChange={handleChange}
                autoWidth
            >
                <MenuItem value={1} onClick={() => setSelectedOption(requests.fetchActionMovie)}>Боевики</MenuItem>
                <MenuItem value={2} onClick={() => setSelectedOption(requests.fetchCrimeMovie)}>Криминал</MenuItem>
                <MenuItem value={3} onClick={() => setSelectedOption(requests.fetchComedyMovie)}>Комедии</MenuItem>
                <MenuItem value={4} onClick={() => setSelectedOption(requests.fetchHorrorMovie)}>Ужасы</MenuItem>
                <MenuItem value={5} onClick={() => setSelectedOption(requests.fetchMysteryMovie)}>Мистика</MenuItem>
                <MenuItem value={6} onClick={() => setSelectedOption(requests.fetchThrillerMovie)}>Триллеры</MenuItem>
                <MenuItem value={7} onClick={() => setSelectedOption(requests.fetchRomanceMovie)}>Драмы</MenuItem>
                <MenuItem value={8} onClick={() => setSelectedOption(requests.fetchSciFiMovie)}>Научная фантастика</MenuItem>
                <MenuItem value={9} onClick={() => setSelectedOption(requests.fetchFantasyMovie)}>Фэнтази</MenuItem>
                <MenuItem value={10} onClick={() => setSelectedOption(requests.fetchWesternMovie)}>Вестерны</MenuItem>
                <MenuItem value={11} onClick={() => setSelectedOption(requests.fetchHistoryMovie)}>Исторические</MenuItem>
                <MenuItem value={12} onClick={() => setSelectedOption(requests.fetchWarMovie)}>Военные</MenuItem>
                <MenuItem value={13 } onClick={() => setSelectedOption(requests.fetchAnimation)}>Мультфильмы</MenuItem>
            </Select>
            <FormHelperText className={classes.helperText}>Выберете жанр фильмов, который вам интересен</FormHelperText>
        </FormControl>
    );
};

export default Navigation;
