import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import isArray from 'lodash/isArray';

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

function TcellGrid(props) {
    //const gridClasses = classNames('mdl-grid');
    const { classes, columnCount, children } = props;
    const cells = [];

    if (children) {
        if (isArray(children)) {
            children.forEach((child, i) => {
                cells.push(
                    <Grid item md={`${12/columnCount}`}>
                        {child}
                    </Grid>
                );
            });
        } else {
            cells.push(
                <Grid item md={`${12/columnCount}`}>
                    {children}
                </Grid>
            );
        }
    }


    return (
        <div className={classes.root}>
            <Grid container>
                {cells}
            </Grid>
        </div>
    );
}
TcellGrid.propTypes = {
    columnCount: PropTypes.number
};
export default withStyles(styles)(TcellGrid);
