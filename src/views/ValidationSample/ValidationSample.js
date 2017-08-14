import React from 'react';
import { observable } from "mobx";
import { observer } from 'mobx-react';
import Button from 'react-toolbox/lib/button';
import TcellForm from 'common/TcellForm';
import HorizontalForm from 'common/Layout/HorizontalForm';
import TcellInput from 'common/inputs/TcellInput';
import TcellCheckbox from 'common/TcellCheckbox';
import TcellDropdown from 'common/TcellDropdown';
import ModelHelper from 'helpers/ModelHelper';

import { Countries } from './Lookup'
import Fields from './Fields';
import Rules1 from './Rules1';
import Rules2 from './Rules2';

let Model = ModelHelper.generateModel(Fields);

class ValidationSample extends React.Component {

  handleContactFormChange = (event) => {
    this.contactForm.onChange(event);
  }
  handleCountrySelect = (data) => {
    console.log(data);
  }
  handlePostModel = (model) => {
    let mymodel = this.contactForm.props.model;
    mymodel.validate({ showErrors: true })
      .then(({ isValid }) => {
        if (!isValid) {
          console.log("Invalidated!!!")
        } else {
          console.log(mymodel.values());
        }
      });
  }
  handleFormClear = () => {
    this.contactForm.clear();
  }

  handleVendorIdRequiredToogle = (isRequired) => {
    if (isRequired) {
      Model = ModelHelper.setModelRules(Model, Rules1);
    } else {
       Model = ModelHelper.setModelRules(Model, Rules2);
    }
  }

  render() {
    return (
      <TcellForm ref={(r) => { this.contactForm = r; }} model={Model} >
        <HorizontalForm columnCount={3}>
          <TcellInput label="Satıcı No" name="VENDOR_ID" value={Model.$('VENDOR_ID').value} error={Model.$('VENDOR_ID').error}
            onChange={this.handleContactFormChange} />

          <TcellInput label="Satıcı Adı" name="VENDOR_NAME" value={Model.$('VENDOR_NAME').value} error={Model.$('VENDOR_NAME').error}
            onChange={this.handleContactFormChange} />

          <TcellInput label="E Posta" name="EMAIL" value={Model.$('EMAIL').value} error={Model.$('EMAIL').error}
            onChange={this.handleContactFormChange} />

          <TcellDropdown
            name="COUNTRY" label="Ülke" value={Model.$('COUNTRY').value} error={Model.$('COUNTRY').error}
            source={Countries}
            onSelect={this.countrySelect}
            onChange={this.handleContactFormChange} />
          <TcellCheckbox label="Satıcı No zorunlu" name="VENDOR_ID_REQUIRED" value={Model.$('VENDOR_ID_REQUIRED').value} error={Model.$('VENDOR_ID_REQUIRED').error}
            onToggle={this.handleVendorIdRequiredToogle}
            onChange={this.handleContactFormChange} />
        </HorizontalForm>

        <Button icon="delete" label="Clear" raised accent onClick={this.handleFormClear}></Button>
        <Button icon='bookmark' label='Show Data' onClick={this.handlePostModel} raised primary />
      </TcellForm>
    );
  }
}

export default observer(ValidationSample);


