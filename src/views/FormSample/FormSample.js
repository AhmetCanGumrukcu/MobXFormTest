import React from 'react';
import { observer, inject } from "mobx-react";
import Button from 'react-toolbox/lib/button';
import { observable } from "mobx";

import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import { FormControlLabel } from 'material-ui/Form';
import Radio from 'material-ui/Radio';
import { CardActions } from 'material-ui/Card';

import TcellForm from 'common/TcellForm';
import HorizontalForm from 'common/Layout/HorizontalForm';
import TcellInput from 'common/inputs/TcellInput';
import TcellCheckbox from 'common/TcellCheckbox';
import TcellRadioGroup from 'common/TcellRadioGroup';
import TcellDatePicker from 'common/TcellDatePicker';
import TcellDropdown from 'common/TcellDropdown';
import TcellCard from 'common/TcellCard';
import TcellSelectField from 'common/TcellSelectField';
import TcellSelectMultiple from 'common/TcellSelectMultiple';
import TcellDataFieldButton from 'common/TcellDataFieldButton';
import TcellDialog from 'common/TcellDialog';

import ModelHelper from 'helpers/ModelHelper';

import cityDialog from 'views/CityDialog';

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
                debugger
                ValidationModel.$('VENDOR_ID_REQUIRED').set('value', !ValidationModel.$('VENDOR_ID_REQUIRED').value);
                this.viewState.vendorIdDialog.open = false
            },
            ok: (value) => {
                this.handleVendorIdRequiredToogle(value);
                this.viewState.vendorIdDialog.open = false
            }
        }
    })

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
        ValidationModel.$('COUNTRY').set('value', 4);
        ValidationModel.$('COUNTRY_MULTI').set('value', [1, 4]);
        ValidationModel.$('GENDER').set('value', 'male');
        ValidationModel.$('VENDOR_ID').set('value', 23);
        ValidationModel.$('VENDOR_NAME').set('value', 'SONY');
        ValidationModel.$('EMAIL').set('value', 'sony@yahoo.com');
        ValidationModel.$('PAYMENT_DATE').set('value', new Date());
    }
    handleCityButtonClick = () => {
        this.viewState.cityDialog.open = true;
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

                            <TcellDataFieldButton name="CITY" label="Şehir" dataSource={Cities} value={ValidationModel.$('CITY').value} error={ValidationModel.$('CITY').error} helperText={ValidationModel.$('CITY').error}
                                onChange={this.handleValidationFormChange}
                                onClick={this.handleCityButtonClick}
                            />

                            <TextField label="Satıcı Adı" name="VENDOR_NAME" value={ValidationModel.$('VENDOR_NAME').value} error={ValidationModel.$('VENDOR_NAME').error} helperText={ValidationModel.$('VENDOR_NAME').error}
                                onChange={this.handleValidationFormChange} />

                            <TcellSelectField label="Ülke" name="COUNTRY" value={ValidationModel.$('COUNTRY').value} error={ValidationModel.$('COUNTRY').error} helperText={ValidationModel.$('COUNTRY').error}
                                dataSource={Countries}
                                onSelect={this.countrySelect}
                                onChange={this.handleValidationFormChange} />

                            <TcellSelectMultiple label="Ülke2" name="COUNTRY_MULTI" value={ValidationModel.$('COUNTRY_MULTI').value} error={ValidationModel.$('COUNTRY_MULTI').error} helperText={ValidationModel.$('COUNTRY_MULTI').error}
                                dataSource={Countries}
                                onSelect={this.countrySelect}
                                onChange={this.handleValidationFormChange} />


                            <TextField label="E Posta" name="EMAIL" value={ValidationModel.$('EMAIL').value} error={ValidationModel.$('EMAIL').error} helperText={ValidationModel.$('EMAIL').error}
                                onChange={this.handleValidationFormChange} />

                            <TcellCheckbox label="Satıcı No zorunlu" name="VENDOR_ID_REQUIRED" value={ValidationModel.$('VENDOR_ID_REQUIRED').value} helperText={ValidationModel.$('VENDOR_ID_REQUIRED').error}
                                //onToggle={this.handleVendorIdRequiredToogle}
                                onToggle={() => this.viewState.vendorIdDialog.open = true}
                                onChange={this.handleValidationFormChange} />
                            <TcellRadioGroup label="Satıcı Cinsiyeti" name="GENDER" value={ValidationModel.$('GENDER').value} error={ValidationModel.$('GENDER').error} helperText={ValidationModel.$('GENDER').error}
                                onChange={this.handleValidationFormChange} >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" disabled />
                            </TcellRadioGroup>
                            <TcellDatePicker label="Ödeme Tarihi" name="PAYMENT_DATE" value={ValidationModel.$('PAYMENT_DATE').value} error={ValidationModel.$('PAYMENT_DATE').error}
                                onChange={this.handleValidationFormChange} />
                        </HorizontalForm>                       
                            <CardActions style={{ display: ' flex', flexWrap: 'wrap' }}>
                                <Button icon="delete" label="Clear" raised accent onClick={this.handleValidationFormClear}></Button>
                                <Button icon='bookmark' label='Show Data' onClick={this.handleValidationPostModel} raised primary />
                                <Button label='Set Data' onClick={this.handleSetValidationCity} raised primary />
                            </CardActions>   
                    </TcellForm>
                </TcellCard >

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

                <TcellDialog name="cityDialog" title=" Şehir Seçiniz "
                    open={this.viewState.cityDialog.open}>
                    <DialogContent>
                        {cityDialog}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.viewState.cityDialog.cancel} color="primary">Cancel</Button>
                        <Button onClick={this.viewState.cityDialog.ok.bind(this, cityDialog.prototype.dialogValue())} color="primary">Ok</Button>
                    </DialogActions>
                </TcellDialog>

                <TcellDialog name="vendorIdDialog" title="Dikkat!"
                    open={this.viewState.vendorIdDialog.open}>
                    <DialogContent>
                        <span>"Satıcı No gerekliliği değişsin mi?"</span>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.viewState.vendorIdDialog.cancel.bind(this, ValidationModel.$('VENDOR_ID_REQUIRED').value)} color="primary">Cancel</Button>
                        <Button onClick={this.viewState.vendorIdDialog.ok.bind(this, ValidationModel.$('VENDOR_ID_REQUIRED').value)} color="primary">Ok</Button>
                    </DialogActions>
                </TcellDialog>
            </div >
        );
    }
}
export default FormSample;


