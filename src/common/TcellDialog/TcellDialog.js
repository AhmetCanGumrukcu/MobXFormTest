import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import cityDialog from 'views/cityDialog';

class TcellDialog extends Component {
  state = {
    value: undefined,
  };

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      // eslint-disable-next-line react/no-will-update-set-state
      this.setState({ value: nextProps.value });
    }
  }

  handleCancel = () => {
    this.props.onRequestClose(this.props.value);
  };

  handleOk = () => {
    this.props.onRequestClose(this.state.value);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() { 
    const { value, children, ...other } = this.props;    
    const dialogNode = React.createElement(children);   

    return (
      <Dialog
        ignoreBackdropClick
        ignoreEscapeKeyUp
        maxWidth="xs"
        {...other}
      >
        <DialogTitle>Phone Ringtone</DialogTitle>
        <DialogContent>
          { 
            dialogNode
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

TcellDialog.propTypes = {
  onRequestClose: PropTypes.func,
  value: PropTypes.string,
};

export default TcellDialog;
