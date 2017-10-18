import React from 'react';
import { observer, inject } from "mobx-react";
import { observable } from "mobx";

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import { FormControlLabel } from 'material-ui/Form';
import Radio from 'material-ui/Radio';
import { CardActions } from 'material-ui/Card';

import TcellCheckbox from 'tcellcheckbox';
import TcellInput from 'tcellinput';
import TcellButton from 'tcellbutton'
import TcellRadioGroup from 'tcellradiogroup';
import TcellSelectField from 'tcellselectfield';
import TcellSelectMultiple from 'tcellselectmultiple';
import TcellDateTimePicker from 'tcelldatetimepicker'
import TcellDataFieldButton from 'tcelldatafieldbutton';
import TcellCard from 'tcellcard';
import TcellDialog from 'tcelldialog';
import TcellForm from 'tcellform';
import TcellMdlGrid from 'tcellmdlgrid'

//import HorizontalForm from 'common/Layout/HorizontalForm';

import ModelHelper from 'helpers/ModelHelper';
import cityDialog from 'views/CityDialog';
import { Currencies, Countries, Cities } from './Lookup'

import Rules1 from './Rules1';
import Rules2 from './Rules2';

import ContactFields from './ContactFields';
import PaymentFields from './PaymentFields';
import ValidationFields from './ValidationFields';

let ContactModel = ModelHelper.generateModel(ContactFields);
let PaymentModel = ModelHelper.generateModel(PaymentFields);
let ValidationModel = ModelHelper.generateModel(ValidationFields);

ValidationModel.$('VENDOR_ID_REQUIRED').set('value', true);

@inject('viewStore') @observer
class FormSample extends React.Component {
    viewState = observable({
        cityDialog: {
            open: false,
            cancel: () => {
                this.viewState.cityDialog.open = false
            },
            ok: (value) => {
                ValidationModel.$('CITY').set('value', value);
                ValidationModel.$('CITY').validate();
                this.viewState.cityDialog.open = false
            }
        },
        vendorIdDialog: {
            open: false,
            cancel: (value) => {              
                ValidationModel.$('VENDOR_ID_REQUIRED').set('value', !ValidationModel.$('VENDOR_ID_REQUIRED').value);
                this.viewState.vendorIdDialog.open = false
            },
            ok: (value) => {
                this.handleVendorIdRequiredToogle(value);
                this.viewState.vendorIdDialog.open = false
            }
        }
    })
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
        ValidationModel.$('COUNTRY').set('value', 4);
        ValidationModel.$('COUNTRY_MULTI').set('value', [1, 4]);
        ValidationModel.$('GENDER').set('value', 'male');
        ValidationModel.$('VENDOR_ID').set('value', 23);
        ValidationModel.$('VENDOR_NAME').set('value', 'SONY');
        ValidationModel.$('EMAIL').set('value', 'sony@yahoo.com');
        ValidationModel.$('PAYMENT_DATE').set('value', "1972-02-07");
    }
    handleCityButtonClick = () => {
        this.viewState.cityDialog.open = true;
    }
    render() {        
        const { viewStore } = this.props;        
        return (
            <div>
                <TcellCard title='Validation Form' expandable={ true }   viewStoreObject={ viewStore.validationCard }
                    //expanded={ true } 
                    >
                    <TcellForm ref={(r) => { this.validationForm = r; }} model={ValidationModel} >
                        <TcellMdlGrid columnCount={3}>
                            <TcellInput label="Satıcı No" name="VENDOR_ID" />
                            <TcellDataFieldButton name="CITY" label="Şehir" dataSource={Cities} onClick={this.handleCityButtonClick} />
                            <TcellInput label="Satıcı Adı" name="VENDOR_NAME" />
                            <TcellCheckbox label="Satıcı No zorunlu" name="VENDOR_ID_REQUIRED"
                                onToggle={() => this.viewState.vendorIdDialog.open = true} />
                            <TcellDateTimePicker
                                label="Order Date"
                                name="PAYMENT_DATE"
                                showCalendar={true}
                                showClock={false} />
                            <TcellSelectMultiple label="Ülke2" name="COUNTRY_MULTI"
                                dataSource={Countries}
                                onSelect={this.countrySelect} />
                            <TcellInput label="E Posta" name="EMAIL" />
                            <TcellSelectField label="Ülke" name="COUNTRY"
                                dataSource={Countries}
                                onSelect={this.countrySelect} />

                            <TcellRadioGroup label="Satıcı Cinsiyeti" name="GENDER" >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" disabled />
                            </TcellRadioGroup>
                        </TcellMdlGrid>
                        <CardActions style={{ display: ' flex', flexWrap: 'wrap' }}>
                            <TcellButton type="raised" color="primary" onClick={this.handleValidationFormClear}>
                                Clear
                    </TcellButton>
                            <TcellButton type="raised" color="primary" onClick={this.handleValidationPostModel}>
                                Show data
                    </TcellButton>
                            <TcellButton type="raised" color="primary" onClick={this.handleSetValidationCity} >
                                Set data
                    </TcellButton>
                        </CardActions>
                    </TcellForm>
                </TcellCard >
                <TcellCard name='contactCard' title='Contact Form' expandable={ true } expanded={ false } >
                    <TcellForm ref={(r) => { this.contactForm = r; }} model={ContactModel}>
                        <TcellMdlGrid columnCount={3}>
                            <TcellInput label="Satıcı No" name="VENDOR_ID" />
                            <TcellInput label="Satıcı Adı" name="VENDOR_NAME" />
                            <TcellInput type="text" label="Ülke" name="COUNTRY" />
                            <TcellCheckbox label="Karaliste" name="BLACKLIST" />
                            <TcellInput label="Satıcı Tag" />
                        </TcellMdlGrid>
                        <TcellButton type="raised" color="primary" onClick={this.handleContactFormClear}>
                            Clear
                        </TcellButton>
                        <TcellButton type="raised" color="primary" onClick={this.handleContactPostModel}>
                            Show data
                        </TcellButton>
                    </TcellForm>
                </TcellCard>

                <TcellCard title='Payment Form' subtitle='Everything abount a contact is here...' expandable={ true } expanded={ false } >
                    <TcellForm ref={(r) => { this.paymentForm = r; }} model={PaymentModel}>
                        <TcellMdlGrid columnCount={2}>
                            <TcellInput label="Ödeme No" name="ID" />
                            <TcellInput label="Tutar" name="AMOUNT" />
                            <TcellSelectField
                                label="Para birimi"
                                name="CURRENCY"
                                dataSource={Currencies}
                                onSelect={this.handleCurrencySelect} />
                            {/* <TcellDatePicker label="Ödeme Tarihi" name="PAYMENT_DATE" /> */}
                        </TcellMdlGrid>
                        <TcellButton type="raised" color="primary" raised accent onClick={this.handlePaymentFormClear}>
                            Clear
                        </TcellButton>
                        <TcellButton type="raised" color="primary" onClick={this.handlePaymentPostModel}>
                            Show data
                        </TcellButton>
                    </TcellForm>
                </TcellCard>
             
                <TcellDialog name="cityDialog" title=" Şehir Seçiniz "
                    open={this.viewState.cityDialog.open}>
                    <DialogContent>
                        {cityDialog}
                    </DialogContent>
                    <DialogActions>
                        <TcellButton type="flat" color="primary" onClick={this.viewState.cityDialog.cancel}>
                            Cancel
                        </TcellButton>
                        <TcellButton type="flat" color="primary" onClick={this.viewState.cityDialog.ok.bind(this, cityDialog.prototype.dialogValue())}>
                            Ok
                        </TcellButton>
                    </DialogActions>
                </TcellDialog>

                <TcellDialog name="vendorIdDialog" title="Dikkat!"
                    open={this.viewState.vendorIdDialog.open}>
                    <DialogContent>
                        <span>"Satıcı No gerekliliği değişsin mi?"</span>
                    </DialogContent>
                    <DialogActions>
                        <TcellButton type="flat" color="primary" onClick={this.viewState.vendorIdDialog.cancel.bind(this, ValidationModel.$('VENDOR_ID_REQUIRED').value)}>
                            Cancel
                        </TcellButton>
                        <TcellButton type="flat" color="primary" onClick={this.viewState.vendorIdDialog.ok.bind(this, ValidationModel.$('VENDOR_ID_REQUIRED').value)}>
                            OK
                        </TcellButton>
                    </DialogActions>
                </TcellDialog>
            </div >
        );
    }
}
export default FormSample;


