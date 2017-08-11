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
    constructor(props) {
        super(props);
        this.currencySelect = this.currencySelect.bind(this);
        this.postModel = this.postModel.bind(this);
    }

    currencySelect(obj) {
        console.log(obj);
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
            <div>
                <h4>Contact Form</h4>
                <TcellForm ref={(r) => { this.contactForm = r; }} model={ContactModel}>
                    <HorizontalForm columnCount={3}>
                        <TcellInput label="Satıcı No" name="VENDOR_ID" value={ContactModel.$('VENDOR_ID').value} error={ContactModel.$('VENDOR_ID').error}
                            onChange={(event) => {
                                this.contactForm.onChange(event)
                            }} />
                        <TcellInput label="Satıcı Adı" name="VENDOR_NAME" value={ContactModel.$('VENDOR_NAME').value} error={ContactModel.$('VENDOR_NAME').error}
                            onChange={(event) => {
                                this.contactForm.onChange(event)
                            }} />
                        <TcellInput type="text" label="Ülke" name="COUNTRY" value={ContactModel.$('COUNTRY').value} error={ContactModel.$('COUNTRY').error}
                            onChange={(event) => {
                                this.contactForm.onChange(event)
                            }} />
                        <TcellCheckbox label="Karaliste" name="BLACKLIST" value={ContactModel.$('BLACKLIST').value} error={ContactModel.$('BLACKLIST').error}
                            onChange={(event) => {
                                this.contactForm.onChange(event)
                            }} />
                        <TcellInput label="Satıcı Tag" name="VENDOR_TAG"
                            onChange={(event) => {
                                this.contactForm.onChange(event)
                            }} />


                    </HorizontalForm>
                    <Button icon="delete" label="Clear" raised accent onClick={() => this.contactForm.clear()}></Button>
                    <Button icon='bookmark' label='Show Data' onClick={() => this.postModel(this.contactForm.props.model)} raised primary />
                </TcellForm>

                <h4>Payment Form</h4>
                <TcellForm ref={(r) => { this.paymentForm = r; }} model={PaymentModel}>
                    <HorizontalForm columnCount={2}>
                        <TcellInput label="Ödeme No" name="ID" value={PaymentModel.$('ID').value} error={PaymentModel.$('ID').error}
                            onChange={(event) => {
                                this.paymentForm.onChange(event)
                            }} />
                        <TcellInput label="Tutar" name="AMOUNT" value={PaymentModel.$('AMOUNT').value} error={PaymentModel.$('AMOUNT').error}
                            onChange={(event) => {
                                this.paymentForm.onChange(event)
                            }} />
                        <TcellDropdown
                            name="CURRENCY" value={PaymentModel.$('CURRENCY').value} error={PaymentModel.$('CURRENCY').error}
                            source={Currencies}
                            onSelect={this.currencySelect}
                            onChange={(event) => {
                                this.paymentForm.onChange(event)
                            }}

                        />
                        <TcellDatePicker label="Ödeme Tarihi" name="PAYMENT_DATE" value={PaymentModel.$('PAYMENT_DATE').value} error={PaymentModel.$('PAYMENT_DATE').error}
                            onChange={(event) => {
                                this.paymentForm.onChange(event)
                            }}
                        />
                    </HorizontalForm>

                    <Button icon="delete" label="Clear" raised accent onClick={() => this.paymentForm.clear()}></Button>
                    <Button icon='bookmark' label='Show Data' onClick={() => this.postModel(this.paymentForm.props.model)} raised primary />
                </TcellForm>
            </div>
        );
    }
}
export default observer(FormSample);

