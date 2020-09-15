import React from 'react';
import "../style/Pagination.scss"
import ListPage from '@material-ui/lab/Pagination';

const Pagination = (props) => {

    return(
        <ListPage count={props.pages} onChange={(event,val)=> props.nextPage(val)} variant="outlined" shape="rounded" />
    )
};

export default Pagination;

