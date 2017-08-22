import React from 'react';
import { observer, inject } from "mobx-react";
import Button from 'react-toolbox/lib/button';

import TextField from 'material-ui/TextField';

import TcellForm from 'common/TcellForm';
import HorizontalForm from 'common/Layout/HorizontalForm';
import TcellInput from 'common/inputs/TcellInput';
import TcellCheckbox from 'common/TcellCheckbox';
import TcellDatePicker from 'common/TcellDatePicker';
import TcellDropdown from 'common/TcellDropdown';
import TcellCard from 'common/TcellCard';
import TcellSelectField from 'common/TcellSelectField';
import TcellDataFieldButton from 'common/TcellDataFieldButton';

import ModelHelper from 'helpers/ModelHelper';

import { Currencies } from './Lookup'
import { Countries } from './Lookup'
import { Cities } from './Lookup'

import Rules1 from './Rules1';
import Rules2 from './Rules2';

import ContactFields from './ContactFields';
import PaymentFields from './PaymentFields';
import ValidationFields from './ValidationFields';

let ContactModel = ModelHelper.generateModel(ContactFields);
let PaymentModel = ModelHelper.generateModel(PaymentFields);
let ValidationModel = ModelHelper.generateModel(ValidationFields);

@inject('viewStore') @observer
class FormSample extends React.Component {
    constructor(props) {
        super(props);
        console.log("Every time FormSample constructor...");
    }

    handleContactFormChange = (event) => {
        this.contactForm.onChange(event);
    }
    handlePaymentFormChange = (event) => {
        this.paymentForm.onChange(event);
    }
    handleCurrencySelect = (obj) => {
        console.log(obj);
    }
    handleContactPostModel = () => {
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
    handlePaymentPostModel = () => {
        let mymodel = this.paymentForm.props.model;
        mymodel.validate({ showErrors: true })
            .then(({ isValid }) => {
                if (!isValid) {
                    console.log("Invalidated!!!")
                } else {
                    console.log(mymodel.values());
                }
            });
    }
    handleContactFormClear = () => {
        this.contactForm.clear();
    }
    handlePaymentFormClear = () => {
        this.paymentForm.clear();
    }
    handleValidationFormChange = (event) => {
        this.validationForm.onChange(event);
    }
    handleCountrySelect = (data) => {
        console.log(data);
    }
    handleValidationPostModel = (model) => {
        let mymodel = this.validationForm.props.model;
        mymodel.validate({ showErrors: true })
            .then(({ isValid }) => {
                if (!isValid) {
                    console.log("Invalidated!!!")
                } else {
                    console.log(mymodel.values());
                }
            });
    }
    handleValidationFormClear = () => {
        this.validationForm.clear();
    }
    handleVendorIdRequiredToogle = (isRequired) => {
        if (isRequired) {
            ValidationModel = ModelHelper.setModelRules(ValidationModel, Rules1);
        } else {
            ValidationModel = ModelHelper.setModelRules(ValidationModel, Rules2);
        }
    }

    handleSetValidationCity = () => {
        ValidationModel.$('CITY').set('value', 35);
    }

    render() {
        const { viewStore } = this.props;
        return (
            <div>

                <TcellCard name='validationCard' title='Validation Form' viewStore={viewStore}>
                    <TcellForm ref={(r) => { this.validationForm = r; }} model={ValidationModel} >
                        <HorizontalForm columnCount={3}>
                            <TextField label="Satıcı No" name="VENDOR_ID" value={ValidationModel.$('VENDOR_ID').value} error={ValidationModel.$('VENDOR_ID').error} helperText={ValidationModel.$('VENDOR_ID').error}
                                onChange={this.handleValidationFormChange} />

                            <TextField label="Satıcı Adı" name="VENDOR_NAME" value={ValidationModel.$('VENDOR_NAME').value} error={ValidationModel.$('VENDOR_NAME').error} helperText={ValidationModel.$('VENDOR_NAME').error}
                                onChange={this.handleValidationFormChange} />

                            <TcellDataFieldButton name="CITY" label="Şehir" dataSource={Cities} value={ValidationModel.$('CITY').value} error={ValidationModel.$('CITY').error} helperText={ValidationModel.$('CITY').error}
                                onChange={this.handleValidationFormChange} />

                            <TcellDropdown
                                name="COUNTRY" label="Ülke" value={ValidationModel.$('COUNTRY').value} error={ValidationModel.$('COUNTRY').error}
                                source={Countries}
                                onSelect={this.countrySelect}
                                onChange={this.handleValidationFormChange} />

                            <TextField label="E Posta" name="EMAIL" value={ValidationModel.$('EMAIL').value} error={ValidationModel.$('EMAIL').error} helperText={ValidationModel.$('EMAIL').error}
                                onChange={this.handleValidationFormChange} />

                            <TcellCheckbox label="Satıcı No zorunlu" name="VENDOR_ID_REQUIRED" value={ValidationModel.$('VENDOR_ID_REQUIRED').value} error={ValidationModel.$('VENDOR_ID_REQUIRED').error}
                                onToggle={this.handleVendorIdRequiredToogle}
                                onChange={this.handleValidationFormChange} />
                        </HorizontalForm>

                        <Button icon="delete" label="Clear" raised accent onClick={this.handleValidationFormClear}></Button>
                        <Button icon='bookmark' label='Show Data' onClick={this.handleValidationPostModel} raised primary />
                        <Button label='Set Data' onClick={this.handleSetValidationCity} raised primary />
                    </TcellForm>
                </TcellCard>

                <TcellCard name='contactCard' title='Contact Form' viewStore={viewStore}>
                    <TcellForm ref={(r) => { this.contactForm = r; }} model={ContactModel}>
                        <HorizontalForm columnCount={3}>
                            <TextField label="Satıcı No" name="VENDOR_ID" value={ContactModel.$('VENDOR_ID').value} error={ContactModel.$('VENDOR_ID').error} helperText={ContactModel.$('VENDOR_ID').error}
                                onChange={this.handleContactFormChange} />
                            <TextField label="Satıcı Adı" name="VENDOR_NAME" value={ContactModel.$('VENDOR_NAME').value} error={ContactModel.$('VENDOR_NAME').error} helperText={ContactModel.$('VENDOR_NAME').error}
                                onChange={this.handleContactFormChange} />
                            <TextField type="text" label="Ülke" name="COUNTRY" value={ContactModel.$('COUNTRY').value} error={ContactModel.$('COUNTRY').error} helperText={ContactModel.$('COUNTRY').error}
                                onChange={this.handleContactFormChange} />
                            <TcellCheckbox label="Karaliste" name="BLACKLIST" value={ContactModel.$('BLACKLIST').value} error={ContactModel.$('BLACKLIST').error}
                                onChange={this.handleContactFormChange} />
                            <TextField label="Satıcı Tag" name="VENDOR_TAG"
                                onChange={this.handleContactFormChange} />
                            {/* <TcellSelectField name="CITY" label="Şehir" options={ Cities } value={ContactModel.$('CITY').value} error={ContactModel.$('CITY').error}
                                onChange={this.handleContactFormChange} /> */}



                        </HorizontalForm>
                        <Button icon="delete" label="Clear" raised accent onClick={this.handleContactFormClear}></Button>
                        <Button icon='bookmark' label='Show Data' onClick={this.handleContactPostModel} raised primary />
                    </TcellForm>
                </TcellCard>

                <TcellCard name='paymentCard' title='Payment Form' subtitle='Everything abount a contact is here...' viewStore={viewStore}>
                    <TcellForm ref={(r) => { this.paymentForm = r; }} model={PaymentModel}>
                        <HorizontalForm columnCount={2}>
                            <TextField label="Ödeme No" name="ID" value={PaymentModel.$('ID').value} error={PaymentModel.$('ID').error} helperText={PaymentModel.$('ID').error}
                                onChange={this.handlePaymentFormChange} />
                            <TextField label="Tutar" name="AMOUNT" value={PaymentModel.$('AMOUNT').value} error={PaymentModel.$('AMOUNT').error} helperText={PaymentModel.$('AMOUNT').error}
                                onChange={this.handlePaymentFormChange} />
                            <TcellDropdown
                                name="CURRENCY" value={PaymentModel.$('CURRENCY').value} error={PaymentModel.$('CURRENCY').error}
                                source={Currencies}
                                onSelect={this.handleCurrencySelect}
                                onChange={this.handlePaymentFormChange}
                            />
                            <TcellDatePicker label="Ödeme Tarihi" name="PAYMENT_DATE" value={PaymentModel.$('PAYMENT_DATE').value} error={PaymentModel.$('PAYMENT_DATE').error}
                                onChange={this.handlePaymentFormChange} />
                        </HorizontalForm>
                        <Button icon="delete" label="Clear" raised accent onClick={this.handlePaymentFormClear}></Button>
                        <Button icon='bookmark' label='Show Data' onClick={this.handlePaymentPostModel} raised primary />
                    </TcellForm>
                </TcellCard>


            </div>
        );
    }
}
export default FormSample;


