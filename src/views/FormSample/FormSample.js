import React from 'react';
import { observable } from "mobx";
import { observer } from "mobx-react";
import Button from 'react-toolbox/lib/button';

import TcellForm from 'common/TcellForm';
import HorizontalForm from 'common/Layout/HorizontalForm';
import TcellInput from 'common/inputs/TcellInput';
import TcellCheckbox from 'common/TcellCheckbox';
import TcellDatePicker from 'common/TcellDatePicker';
import TcellDropdown from 'common/TcellDropdown';

import CONTACT from 'models/FormSample/CONTACT';
import PAYMENT from 'models/FormSample/PAYMENT';
import { Currencies } from './Lookup'


/** Two forms bind to MobX*/
@observer
class FormSample extends React.Component {
    constructor(props) {
        super(props);
        this.currencySelect = this.currencySelect.bind(this);
        this.showData = this.showData.bind(this);       
    }

    currencySelect(obj){       
        console.log(obj);
    }

    showData(vm){
        console.log(vm); 
    }

    render() {
        return (
            <div>
                <h4>Contact Form</h4>
                <TcellForm ref={(r) => { this.contactForm = r; }} model={CONTACT}>
                    <HorizontalForm columnCount={3}>
                        <TcellInput label="Satıcı No" name="VENDOR_ID" value={CONTACT.VENDOR_ID} onChange={(event) => {
                            this.contactForm.onChange(event)
                        }} />
                        <TcellInput label="Satıcı Adı" name="VENDOR_NAME" value={CONTACT.VENDOR_NAME} onChange={(event) => {
                            this.contactForm.onChange(event)
                        }} />
                        <TcellInput type="text" label="Ülke" name="COUNTRY" value={CONTACT.COUNTRY} onChange={(event) => {
                            this.contactForm.onChange(event)
                        }} />
                        <TcellCheckbox label="Karaliste" name="BLACKLIST" value={CONTACT.BLACKLIST} onChange={(event) => {
                            this.contactForm.onChange(event)
                        }} />
                    </HorizontalForm>
                    <Button icon="delete" label="Clear" raised accent onClick={() => this.contactForm.clear()}></Button>
                    <Button icon='bookmark' label='Show Data' onClick={() => this.showData(CONTACT)} raised primary />
                </TcellForm>

                <h4>Payment Form</h4>
                <TcellForm ref={(r) => { this.paymentForm = r; }} model={PAYMENT}>
                    <HorizontalForm columnCount={2}>
                        <TcellInput label="Ödeme No" name="ID" value={PAYMENT.ID} onChange={(event) => this.paymentForm.onChange(event)} />
                        <TcellInput label="Tutar" name="AMOUNT" value={PAYMENT.AMOUNT} onChange={(event) => this.paymentForm.onChange(event)} />  
                        <TcellDropdown
                            name="CURRENCY"
                            source={Currencies}                           
                            onSelect={this.currencySelect}
                            onChange={(event) => { this.paymentForm.onChange(event) }}
                            value={PAYMENT.CURRENCY}
                        />
                        <TcellDatePicker label="Ödeme Tarihi" name="PAYMENT_DATE" value={PAYMENT.PAYMENT_DATE} onChange={(event) => { this.paymentForm.onChange(event) }} />
                    </HorizontalForm>

                    <Button icon="delete" label="Clear" raised accent onClick={() => this.paymentForm.clear()}></Button>
                    <Button icon='bookmark' label='Show Data' onClick={() => this.showData(PAYMENT)} raised primary />
                </TcellForm>
            </div>
        );
    }
}
export default FormSample;

