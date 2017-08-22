import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Menu, { MenuItem } from 'material-ui/Menu';

class TcellSelectField extends Component {

  constructor(props){
    super(props);
    this.name = props.name;
  }

  state = {
    anchorEl: undefined,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleMenuItemClick = param => {   
    let myEvent = {
      target: {
        name: this.name,
        value: param.option.id
      }
    }
    this.setState({ open: false });    
    this.handleChange(myEvent);
  }

  handleChange =() =>{}

  render() {
    const { options, onChange, ...others } = this.props;
    this.handleChange = onChange;
    return (
      <div>
        <TextField { ...others }
          aria-owns={ this.state.open ? 'simple-menu' : null }
          aria-haspopup="true"
          onClick={ this.handleClick }
        >
          Open Menu
        </TextField>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {options.map((option, index) =>
            <MenuItem
              key={ index }              
              selected={ this.selectedItem ? index === this.selectedItem.data : false }
              onClick={ () => this.handleMenuItemClick({index, option}) }
            >
              { option.text }
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  }
}

export default TcellSelectField;