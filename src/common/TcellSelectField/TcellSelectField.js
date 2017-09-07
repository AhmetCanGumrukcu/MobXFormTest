import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import IconButton from 'material-ui/IconButton';
import { observable, observe } from 'mobx';
import { observer } from "mobx-react";
import _ from 'lodash';

class ReadOnlyTextField extends Component{
  render(){
    return(
      <TextField { ...this.props }></TextField>
    )
  };
}

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

  handleClick(event) {
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
   componentDidMount(){
        let inputNode = ReactDOM.findDOMNode(this.textField);
        let inputs = inputNode.querySelectorAll('input');
        inputs.forEach( (f) => {          
            f.setAttribute('readonly', 'readonly')
        } )        
    }  

  render() {
    const { dataSource, onChange, value, classes, ...others } = this.props;

    this.handleChange = onChange;
    return (
      <div>
        <ReadOnlyTextField ref = { (r) => { this.textField = r} }
          aria-owns={this.compState.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          value={this.compState.display}
          { ...others }
        >
        </ReadOnlyTextField>
        <ArrowDropDownIcon />
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