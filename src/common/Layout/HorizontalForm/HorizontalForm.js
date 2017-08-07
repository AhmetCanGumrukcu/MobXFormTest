import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function HorizontalForm({ columnCount, children, ...props }) {
    const gridClasses = classNames('mdl-grid');
    const cells = [];
    
     if (children) {
        children.forEach((child, i) => {           
            cells.push(<div key={i} className={`mdl-cell mdl-cell--${12 / columnCount}-col`}>{child}</div>);
        });
    }  


    return (
        <div className={gridClasses}>
            {cells}
        </div>
    );
}
HorizontalForm.propTypes = {
    columnCount: PropTypes.number    
};
export default HorizontalForm;