import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { TcellComponent } from 'common/tcellcomponent'

export class TcellInput extends TcellComponent {    

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        debugger
        if(this.props.onChange){
            this.props.onChange({
                target:{
                    name: event.target.name,
                    value: event.target.value
                }
            });
        }
    }

    render() { 
        const { onChange, ...others } = this.props;
        return (
            <TextField onChange={ this.handleChange } { ...others } />
        );
    }
}

TcellInput.propTypes = {    
    type: PropTypes.string,
    id: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    multiline: PropTypes.bool,
    maxlength: PropTypes.number,
    error: PropTypes.bool,
    label: PropTypes.string,   
    helperText: PropTypes.string, 
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func
}

export default TcellInput;