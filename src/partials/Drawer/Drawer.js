import React from 'react';
import { Link } from 'react-router-dom';

const drawer = (props) => {
    return (
        <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">Sub Menu</span>
            <nav className="mdl-navigation">
                <Link className="mdl-navigation__link" to="/">Home</Link>               
                <Link className="mdl-navigation__link" to="/formsample">formsample</Link>                
            </nav>
        </div>
    );
}

export default drawer;