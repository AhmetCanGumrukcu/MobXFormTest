import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react";

import Radio from 'material-ui/Radio';
import TcellRadioGroup from 'common/TcellRadioGroup';
import { FormControlLabel } from 'material-ui/Form';
import TcellForm from 'common/TcellForm';
import HorizontalForm from 'common/Layout/HorizontalForm';
import TcellDataFieldButton from 'common/TcellDataFieldButton';

import ModelHelper from 'helpers/ModelHelper';

import { Cities } from './Lookup'
import CityFields from './CityFields';
let CityModel = ModelHelper.generateModel(CityFields);



@observer
class CityDialog extends Component {

    constructor(props) {
        super(props);
        this.dialogValue = this.dialogValue.bind(this);
    }

    dialogValue() {
        return CityModel.$('CITY').value;
    }

    handleCityFormChange = (event) => {
        this.cityForm.onChange(event);
    }

    createCityOptions(cities) {
        const cityOptions = cities.map((option) => {
            return <FormControlLabel value={option.id} key={option.id} control={<Radio />} label={option.text} />
        })
        return cityOptions;
    }

    componentWillMount(){      
        CityModel.$('CITY').set('value', undefined);
    }

    render() {
        const { value, ...other } = this.props;
        return (
            <TcellForm ref={(r) => { this.cityForm = r; }} model={CityModel} >
                <HorizontalForm columnCount={1}>
                    <TcellRadioGroup name="CITY" value={CityModel.$('CITY').value} helperText={CityModel.$('CITY').error}
                        onChange={this.handleCityFormChange} >
                        {this.createCityOptions(Cities)}
                    </TcellRadioGroup>
                </HorizontalForm>
            </TcellForm>
        );
    }
}

export default CityDialog;
