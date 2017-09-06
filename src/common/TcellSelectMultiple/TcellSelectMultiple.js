import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Menu, { MenuItem } from 'material-ui/Menu';
import Checkbox from 'material-ui/Checkbox';
import { observable, computed, observe } from 'mobx';
import { observer } from "mobx-react";
import _ from 'lodash';

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
        if( actualDisplay.indexOf(',  ')  > -1 ){
            actualDisplay = actualDisplay.substr(0, actualDisplay.length-3);
        }
        this.compState.display = actualDisplay;
    }
    handleClick(event) {
        this.compState.open = true;
        this.compState.anchorEl = event.currentTarget;
    };
    handleRequestClose = () => {
        this.compState.open = false;
    };
    handleMenuItemClick = param => {    
        debugger
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
        if( _.isArray(ids)){
            idArray = ids;
        }else if(!_.isEmpty(ids)){
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
    getChecked =id =>{
        if(this.compState.checkedItems[id]){
            return true;
        }else{
            return false;
        }
    }
    render() {     
        const { dataSource, onChange, value, classes, ...others } = this.props;
        this.handleChange = onChange;
        return (
            <div>
                <TextField
                        multiline
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
                        <div style={{ display: 'flex' }}>
                            <Checkbox
                                onChange= {() => this.handleMenuItemClick({ index, option })}
                                checked={ this.getChecked([option.id]) }>
                            </Checkbox>
                            <MenuItem
                                key={index}
                                selected={this.selectedItem ? index === this.selectedItem.id : false}
                                onClick={() => this.handleMenuItemClick({ index, option })}>
                                {option.text}
                            </MenuItem>
                        </div>
                    )}
                </Menu>
            </div>
        );
    }
}

export default TcellSelectMultiple;