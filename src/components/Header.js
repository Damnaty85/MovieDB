import React, {Component} from 'react';
import "../style/Header.scss"

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="header__logo">MovieDB</div>
            </header>
        );
    }
}

export default Header;
