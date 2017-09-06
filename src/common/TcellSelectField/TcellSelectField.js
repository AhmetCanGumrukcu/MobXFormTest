import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Menu, { MenuItem } from 'material-ui/Menu';
import { observable, observe } from 'mobx';
import { observer } from "mobx-react";
import _ from 'lodash';

@observer
class TcellSelectField extends Component {
  constructor(props) {
    super(props);   
    this.handleClick = this.handleClick.bind(this);
  }

  compState = observable({
    anchorEl: undefined,
    open: false,
    display: undefined
  });

  handleClick(event){
    this.compState.open = true;
    this.compState.anchorEl = event.currentTarget;
  };

  handleRequestClose = () => {
    this.compState.open = false;
  };

  handleMenuItemClick = param => {   
    let myEvent = {
      target: {
        name: this.props.name,
        value: param.option.id
      }
    }
    this.compState.open = false;
    this.compState.display = param.option.text;
    this.props.onChange(myEvent);
  }

  setDisplayFromDatasource(dataSource, id) {
    if (dataSource && dataSource.length > 0) {
      let found = _.filter(dataSource, (item) => item.id === id);
      this.compState.display = found && found.length > 0 ? found[0].text : undefined;
    } else {
      this.compState.display = id;
    }
    //todo
    setTimeout(() => {
      let oldVal = this.compState.display;
      this.compState.display = "";
      this.compState.display = oldVal;
    }, 50)
  }

  componentWillReceiveProps(nextProps) { 
    if (this.props.value != nextProps.value) {
      const { dataSource } = this.props;
      const { value } = nextProps;
      this.compState.value = value;
      this.setDisplayFromDatasource(dataSource, value)
    }
  }

  render() {
    const { dataSource, onChange, value, classes, ...others } = this.props;
   
    this.handleChange = onChange;
    return (
      <div>
        <TextField 
          aria-owns={this.compState.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}        
          value={this.compState.display}        
          { ...others }
           >        
        </TextField>
        <Menu
          id="simple-menu"
          anchorEl={this.compState.anchorEl}
          open={this.compState.open}
          onRequestClose={this.handleRequestClose}
        >
          {dataSource.map((option, index) =>
            <MenuItem
              key={index}
              selected={this.selectedItem ? index === this.selectedItem.id : false}
              onClick={() => this.handleMenuItemClick({ index, option })}>
              {option.text}
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  }
}

export default TcellSelectField;