import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import App from "../App";
import ActorDetail from "./Actor-detail";
import CardDetail from "./Card-detail";

const Router = () => (
    <BrowserRouter>
        <Route path="/" component={App} exact/>
        <Route path="/actor/:id" component={props => <ActorDetail {...props} />}/>
        <Route path="/movie/:id" component={props => <CardDetail {...props} />}/>
    </BrowserRouter>
);

export default Router;
