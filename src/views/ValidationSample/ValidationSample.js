import React from 'react';
import { observer } from 'mobx-react';
import Button from 'react-toolbox/lib/button';
import TcellForm from 'common/TcellForm';
import HorizontalForm from 'common/Layout/HorizontalForm';
import TcellInput from 'common/inputs/TcellInput';
import TcellCheckbox from 'common/TcellCheckbox';
import TcellDropdown from 'common/TcellDropdown';

import { Countries } from './Lookup'

import Model from './Model';

class ValidationSample extends React.Component {
  constructor(props) {
    super(props);
    this.postModel = this.postModel.bind(this);   
    this.countrySelect = this.countrySelect.bind(this);
  }

  countrySelect(data) {
    console.log(data);
  }

  postModel(model) {
    model.validate({ showErrors: true })
      .then(({ isValid }) => {
        if (!isValid) {
          console.log("Invalidated!!!")
        } else {
          console.log(model.values());
        }
      });
  }
  render() {
    return (
      <TcellForm ref={(r) => { this.contactForm = r; }} model={Model} >
        <HorizontalForm columnCount={3}>
          <TcellInput label="Satıcı No" name="VENDOR_ID" value={Model.$('VENDOR_ID').value} error={Model.$('VENDOR_ID').error}
            onChange={(event) => {
              this.contactForm.onChange(event)
            }} />

          <TcellInput label="Satıcı Adı" name="VENDOR_NAME" value={Model.$('VENDOR_NAME').value} error={Model.$('VENDOR_NAME').error}
            onChange={(event) => {
              this.contactForm.onChange(event)
            }} />

          <TcellInput label="E Posta" name="EMAIL" value={Model.$('EMAIL').value} error={Model.$('EMAIL').error}
            onChange={(event) => {
              this.contactForm.onChange(event)
            }} />

          <TcellDropdown
            name="COUNTRY" label="Ülke" value={Model.$('COUNTRY').value} error={Model.$('COUNTRY').error}
            source={Countries}
            onSelect={this.countrySelect}
            onChange={(event) => {
              this.contactForm.onChange(event)
            }}
          />
          <TcellCheckbox label="Karaliste" name="BLACKLIST" value={Model.$('BLACKLIST').value} error={Model.$('BLACKLIST').error}
            onChange={(event) => {
              this.contactForm.onChange(event)
            }} />
        </HorizontalForm>

        <Button icon="delete" label="Clear" raised accent onClick={() => this.contactForm.clear()}></Button>
        <Button icon='bookmark' label='Show Data' onClick={() => this.postModel(this.contactForm.props.model)} raised primary />
      </TcellForm>
    );
  }
}

export default observer(ValidationSample);


