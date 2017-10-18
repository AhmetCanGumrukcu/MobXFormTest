import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu';
import  { ListItem } from 'material-ui/List';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import IconButton from 'material-ui/IconButton';
import { TcellComponent } from 'common/tcellcomponent'
import filter from 'lodash/filter';

const styles = theme => ({
    root: {
        padding: 0
    }
});

class ReadOnlyTextField extends TcellComponent {
  render() {
    const { value, ...others } = this.props;
    return (
      <TextField value={ value ? value : '' } { ...others }></TextField>
    )
  };
}

class TcellSelectField extends TcellComponent {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      anchorEl: null,
      open: false,
      display: null
    };
  }  

  handleClick = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });    
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  };

  handleMenuItemClick = (param) => {
    let myEvent = {
      target: {
        name: this.props.name,
        value: param.option.id
      }
    }
    this.setState({
      open: false,
      display: param.option.text
    });
    this.props.onChange(myEvent);
  }

  setDisplayFromDatasource(dataSource, id) {
    if(!id){
      this.setState({
        display: null 
      });
    } else if (dataSource && dataSource.length > 0) {
      let found = filter(dataSource, (item) => item.id === id);
      this.setState({
        display: found && found.length > 0 ? found[0].text : null 
      });
    } else {
      this.setState({
        display: id        
      });      
    }
  }

  componentWillReceiveProps(nextProps) {   
    if (this.props.value != nextProps.value) {
      const { dataSource } = this.props;
      const { value } = nextProps;
      this.setState({
        value: value
      });
      this.setDisplayFromDatasource(dataSource, value)
    }
  }
  componentDidMount() {
    const { dataSource, value } = this.props;
    let inputNode = ReactDOM.findDOMNode(this.textField);
    let inputs = inputNode.querySelectorAll('input');   
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute('readonly', 'readonly')
    }

    const firstDiv = this.getClosestUp(inputNode, 'div');
    const secondDiv = this.getClosestUp(firstDiv, 'div'); 
    if(secondDiv) secondDiv.style.paddingTop = "3px";   

    this.setDisplayFromDatasource(dataSource, value)

  }
  getClosestUp = function(elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) { }
                return i > -1;
            };
    }

    // Get closest match
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }

    return null;
}
  render() {
    const { dataSource, onChange, value, classes, ...others } = this.props;

    this.handleChange = onChange;
    return (
      <div>
        <ListItem classes={{ root: classes.root }}>
          <ReadOnlyTextField ref={(r) => { this.textField = r }}
            aria-owns={this.state.open ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            value={this.state.display}
            { ...others }
          >
          </ReadOnlyTextField>
          <ArrowDropDownIcon />
        </ListItem>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
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

export default withStyles(styles)(TcellSelectField);