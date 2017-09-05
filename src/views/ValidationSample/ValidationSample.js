import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';

import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

import TcellDialog from 'common/TcellDialog';
import cityDialog from 'views/CityDialog';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  dialog: {
    width: '80%',
    maxHeight: 435,
  },
});

class ValidationSample extends Component {
  state = {
    anchorEl: undefined,
    open: false,
    value: 'Dione',
  };

  button = undefined;

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = value => {
    this.setState({ value, open: false });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <List>
          <ListItem button divider disabled>
            <ListItemText primary="Interruptions" />
          </ListItem>
          <ListItem
            button
            divider
            aria-haspopup="true"
            aria-controls="ringtone-menu"
            aria-label="Phone ringtone"
            onClick={this.handleClickListItem}
          >
            <ListItemText primary="Phone ringtone" secondary={this.state.value} />
          </ListItem>
          <ListItem button divider disabled>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
           <TcellDialog
              classes={{
                paper: classes.dialog,
              }}
              open={this.state.open}
              onRequestClose={this.handleRequestClose}
              value={this.state.value}
            >
              {cityDialog}
            </TcellDialog> 
        </List>
      </div>
    );
  }
}

ValidationSample.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ValidationSample);