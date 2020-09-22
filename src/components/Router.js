import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {AnimatedSwitch, spring} from 'react-router-transition';

import App from "../App";
import ActorDetail from "./Actor-detail";
import CardDetail from "./Card-detail";

function mapStyles(styles) {
    return {
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`,
    };
}

function bounce(val) {
    return spring(val, {
        stiffness: 330,
        damping: 22,
    });
}

const bounceTransition = {
    atEnter: {
        opacity: 0,
        scale: 1.2,
    },
    atLeave: {
        opacity: bounce(0),
        scale: bounce(0.8),
    },
    atActive: {
        opacity: bounce(1),
        scale: bounce(1),
    },
};

const Router = () => (
    <BrowserRouter>
        <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className="route-wrapper"
        >
            <Route path="/" component={App} exact/>
            <Route path="/actor/:id" component={props => <ActorDetail {...props} />}/>
            <Route path="/movie/:id" component={props => <CardDetail {...props} />}/>
        </AnimatedSwitch>
    </BrowserRouter>
);

export default Router;
