import React from 'react';
import { Link } from 'react-router-dom';

const header = () => {
    return (
        <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
                <span className="mdl-layout-title">MobX Test</span>
                <div className="mdl-layout-spacer"></div>
                <nav className="mdl-navigation mdl-layout--large-screen-only">
                    <Link className="mdl-navigation__link" to="/">Home</Link>                    
                    <Link className="mdl-navigation__link" to="/formsample">formsample</Link>                 
                </nav>
            </div>
        </header>
    )
}

export default header