import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isArray from 'lodash/isArray';

function TcellMdlGrid({ columnCount, children, ...props }) {
    const gridClasses = classNames('mdl-grid');
    const cells = [];

    if (children) {
        if (isArray(children)) {
            children.forEach((child, i) => {
                cells.push(<div key={i} className={`mdl-cell mdl-cell--${12 / columnCount}-col`}>{child}</div>);
            });
        }else{
            cells.push(<div key={ 0 } className={`mdl-cell mdl-cell--${12 / columnCount}-col`}>{ children }</div>);
        }
    }


    return (
        <div className={gridClasses}>
            {cells}
        </div>
    );
}
TcellMdlGrid.propTypes = {
    columnCount: PropTypes.number
};
export default TcellMdlGrid;