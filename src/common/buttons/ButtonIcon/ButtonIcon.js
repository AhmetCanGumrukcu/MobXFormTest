import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonIcon(props) {

    const { icon, onClick } = props;

    return (
        <button onClick={onClick} className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
            <i className="material-icons">{icon}</i>
        </button>
    );
}

ButtonIcon.propTypes = {
    icon: PropTypes.string,   
    onClick: PropTypes.func
}