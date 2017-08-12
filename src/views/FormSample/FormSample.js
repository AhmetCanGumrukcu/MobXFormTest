import React from 'react';
import { observer } from "mobx-react";
import Button from 'react-toolbox/lib/button';

import TcellForm from 'common/TcellForm';
import HorizontalForm from 'common/Layout/HorizontalForm';
import TcellInput from 'common/inputs/TcellInput';
import TcellCheckbox from 'common/TcellCheckbox';
import TcellDatePicker from 'common/TcellDatePicker';
import TcellDropdown from 'common/TcellDropdown';

import ContactModel from './ContactModel';
import PaymentModel from './PaymentModel';
import { Currencies } from './Lookup'

class FormSample extends React.Component {

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

    render() {
        return (
            <div>
                <h4>Contact Form</h4>
                <TcellForm ref={(r) => { this.contactForm = r; }} model={ContactModel}>
                    <HorizontalForm columnCount={3}>
                        <TcellInput label="Satıcı No" name="VENDOR_ID" value={ContactModel.$('VENDOR_ID').value} error={ContactModel.$('VENDOR_ID').error}
                            onChange={this.handleContactFormChange} />
                        <TcellInput label="Satıcı Adı" name="VENDOR_NAME" value={ContactModel.$('VENDOR_NAME').value} error={ContactModel.$('VENDOR_NAME').error}
                            onChange={this.handleContactFormChange} />
                        <TcellInput type="text" label="Ülke" name="COUNTRY" value={ContactModel.$('COUNTRY').value} error={ContactModel.$('COUNTRY').error}
                            onChange={this.handleContactFormChange} />
                        <TcellCheckbox label="Karaliste" name="BLACKLIST" value={ContactModel.$('BLACKLIST').value} error={ContactModel.$('BLACKLIST').error}
                            onChange={this.handleContactFormChange} />
                        <TcellInput label="Satıcı Tag" name="VENDOR_TAG"
                            onChange={this.handleContactFormChange} />
                    </HorizontalForm>
                    <Button icon="delete" label="Clear" raised accent onClick={this.handleContactFormClear}></Button>
                    <Button icon='bookmark' label='Show Data' onClick={this.handleContactPostModel} raised primary />
                </TcellForm>

                <h4>Payment Form</h4>
                <TcellForm ref={(r) => { this.paymentForm = r; }} model={PaymentModel}>
                    <HorizontalForm columnCount={2}>
                        <TcellInput label="Ödeme No" name="ID" value={PaymentModel.$('ID').value} error={PaymentModel.$('ID').error}
                            onChange={this.handlePaymentFormChange} />
                        <TcellInput label="Tutar" name="AMOUNT" value={PaymentModel.$('AMOUNT').value} error={PaymentModel.$('AMOUNT').error}
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
            </div>
        );
    }
}
export default observer(FormSample);

