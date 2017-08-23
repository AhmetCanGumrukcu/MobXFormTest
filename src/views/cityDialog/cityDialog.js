import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

import { Cities } from './Lookup'

class cityDialog extends Component {
    radioGroup = null;
    handleEntering = () => {
        this.radioGroup.focus();
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { value, ...other } = this.props;
        return (
            <RadioGroup
                innerRef={node => {
                    this.radioGroup = node;
                }}
                aria-label="ringtone"
                name="ringtone"
                value={value}
                onChange={this.handleChange}
            >
                {
                    Cities.map((option) => {
                        return <FormControlLabel value={option.id} key={option.id} control={<Radio />} label={option.text} />
                    })}
            </RadioGroup>
        );
    }
}

export default cityDialog;
