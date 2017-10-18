import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import { ListItem } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import Checkbox from 'material-ui/Checkbox'
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown'
import IconButton from 'material-ui/IconButton'
import { TcellComponent } from 'common/tcellcomponent'
import style from './style.css'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'

const styles = theme => ({
    root: {
        paddingTop: 0,
        paddingLeft:0
    }
});

class ReadOnlyTextField extends Component {
    render() {
        const { value, ...others } = this.props;
        return (
            <TextField value={ value ? value : '' } { ...others }></TextField>
        )
    };
}

class TcellSelectMultiple extends TcellComponent {
    constructor(props) {
        super(props);        
        this.state = {
            anchorEl: null,
            open: false,
            checkedItems: null,
            display: null
        };
    }   

    shapeDisplay(checkedItems) { 
        if(!checkedItems) {
            return null;
        }     
        let actualDisplay = "";
        for (let key in checkedItems) {
            actualDisplay += checkedItems[key].text;
            actualDisplay += ',';
            actualDisplay += '  ';
        }
        if (actualDisplay.indexOf(',  ') > -1) {
            actualDisplay = actualDisplay.substr(0, actualDisplay.length - 3);
        }
        return actualDisplay == "" ? null : actualDisplay;
    }

    handleClick = (event) => {
        this.setState({
            open: true
        });
        this.setState({
            anchorEl: event.currentTarget
        });
    };
    handleRequestClose = () => {
        this.setState({ open: false});        
    };
    handleMenuItemClick = param => {
        let checkedItems = this.state.checkedItems ? this.state.checkedItems : {};
        if (checkedItems[param.option.id]) {
            delete checkedItems[param.option.id];
        } else {
            checkedItems[param.option.id] = param.option;
        }
        let display = this.shapeDisplay(checkedItems);
        this.setState({checkedItems, display});
        let myEvent = {
            target: {
                name: this.props.name,
                value: Object.keys(checkedItems).map((k) => checkedItems[k].id)
            }
        }
        this.props.onChange(myEvent);
    }
    setCheckedItems(dataSource, ids) {
        let checkedItems = null;
        let display = null;
        if (isArray(ids) && !isEmpty(ids)) {
            checkedItems = {};
            ids.forEach(id => {
                let found = find(dataSource, (option) => option.id === id);
                checkedItems[id] = found
            });
            display = this.shapeDisplay(checkedItems);
        }
        this.setState({ checkedItems , display });
    }

    componentWillReceiveProps(nextProps) {            
        if (this.props.value != nextProps.value) {
            const { dataSource } = this.props;
            const { value } = nextProps;
            this.setCheckedItems(dataSource, value)
        }
    }

    getChecked = id => {
        if (this.state.checkedItems && this.state.checkedItems[id]) {
            return true;
        } else {
            return false;
        }
    }

    componentDidMount() {     
        const { dataSource, value } = this.props;
        const inputNode = ReactDOM.findDOMNode(this.textField);
        const inputs = inputNode.querySelectorAll('textarea');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute('readonly', 'readonly')
        }
        if (this.device.desktop) {        
            inputNode.querySelector('div').style.paddingRight = "14px";
        }else if (this.device.android) {
            inputNode.querySelector('div').style.paddingRight = "28px";
         }

         this.setCheckedItems(dataSource, value)
    }
    render() {
        const { dataSource, onChange, value, classes, ...others } = this.props;
        this.handleChange = onChange;
        return (
            <div>
                <ListItem classes={{ root: classes.root }}>
                    <ReadOnlyTextField
                        ref={(r) => { this.textField = r; }}
                        multiline
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
                            <Checkbox
                                checked={this.getChecked([option.id])}>
                            </Checkbox>
                            {option.text}
                        </MenuItem>
                    )}
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(TcellSelectMultiple);