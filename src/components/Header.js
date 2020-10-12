import React, {Component} from 'react';
import "../style/Header.scss"

class Header extends Component {
    render() {
        return (
            <header className="header">
                <a className="header__logo" href="/">MovieDB <span>clone</span></a>
            </header>
        );
    }
}

export default Header;
