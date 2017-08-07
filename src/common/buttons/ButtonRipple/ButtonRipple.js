import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonRipple(props) {

    const { text, color, onClick } = props;

    return (
        <button onClick={onClick} className={`mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--${color}`}>
            {text}
        </button>
    );
}

ButtonRipple.propTypes = {
    text: PropTypes.string,
    color: PropTypes.oneOf(['accent', 'primary']),
    onClick: PropTypes.func
}
