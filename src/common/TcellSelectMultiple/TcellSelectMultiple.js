import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';

import Menu, { MenuItem } from 'material-ui/Menu';
import Checkbox from 'material-ui/Checkbox';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import IconButton from 'material-ui/IconButton';
import { observable, computed, observe } from 'mobx';
import { observer } from "mobx-react";
import _ from 'lodash';
import style from './style.css';

class ReadOnlyTextField extends Component {
    render() {
        return (
            <TextField { ...this.props }></TextField>
        )
    };
}

@observer
class TcellSelectMultiple extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    compState = observable({
        anchorEl: undefined,
        open: false,
        checkedItems: {},
        display: ''
    });

    shapeDisplay() {
        let actualDisplay = "";
        for (let key in this.compState.checkedItems) {
            actualDisplay += this.compState.checkedItems[key].text;
            actualDisplay += ',';
            actualDisplay += '  ';
        }
        if (actualDisplay.indexOf(',  ') > -1) {
            actualDisplay = actualDisplay.substr(0, actualDisplay.length - 3);
        }
        this.compState.display = actualDisplay;
    }
    handleClick(event) {
        this.compState.open = true;
        this.compState.anchorEl = event.currentTarget;

        setTimeout(() => {
            let oldVal = this.compState.display;
            this.compState.display = "";
            this.compState.display = oldVal;
        }, 50)


    };
    handleRequestClose = () => {
        this.compState.open = false;
    };
    handleMenuItemClick = param => {      
        if (this.compState.checkedItems[param.option.id]) {
            delete this.compState.checkedItems[param.option.id]
        } else {
            this.compState.checkedItems[param.option.id] = param.option;
        }
        this.shapeDisplay();
        let myEvent = {
            target: {
                name: this.props.name,
                value: Object.keys(this.compState.checkedItems).map((k) => this.compState.checkedItems[k].id)
            }
        }
        this.props.onChange(myEvent);
    }
    setCheckedItems(dataSource, ids) {
        let idArray = [];
        if (_.isArray(ids)) {
            idArray = ids;
        } else if (!_.isEmpty(ids)) {
            idArray.push(ids);
        }
        this.compState.checkedItems = {};
        idArray.forEach(id => {
            let found = _.find(dataSource, (option) => option.id === id);
            this.compState.checkedItems[id] = found
        });
        this.shapeDisplay();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.value != nextProps.value) {
            const { dataSource } = this.props;
            const { value } = nextProps;
            this.setCheckedItems(dataSource, value)
        }
    }
    getChecked = id => {
        if (this.compState.checkedItems[id]) {
            return true;
        } else {
            return false;
        }
    }
    componentDidMount() {
        let inputNode = ReactDOM.findDOMNode(this.textField);
        let inputs = inputNode.querySelectorAll('textarea');
        inputs.forEach((f) => {
            f.setAttribute('readonly', 'readonly')
        })
    }
    render() {
        const { dataSource, onChange, value, classes, ...others } = this.props;
        this.handleChange = onChange;
        return (
            <div>
                <ReadOnlyTextField
                    ref={(r) => { this.textField = r; }}
                    multiline
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

export default TcellSelectMultiple;