import { observable } from "mobx";

function isEmail({ field, form }) {
    let isValid = true;
    let message = '';
    if (form.$('COUNTRY').value === 1) {
        const patt = new RegExp(/^.+[@].+[.]com$/);
        isValid = patt.test(field.value);
        message = `The ${field.label} not like an American email address.`
    } else if (form.$('COUNTRY').value === 2) {
        const patt = new RegExp(/^.+[@].+[.]com.de$/);
        isValid = patt.test(field.value);
        message = `The ${field.label} not like an German email address.`
    } else if (form.$('COUNTRY').value === 3) {
        const patt = new RegExp(/^.+[@].+[.]com.tr$/);
        isValid = patt.test(field.value);
        message = `The ${field.label} not like an Turkish email address.`
    } else {
        const patt = new RegExp(/^.+[@].+[.].+$/);
        isValid = patt.test(field.value);
        message = `The ${field.label} should not be empty!`;
    }
    return [isValid, message];
}
export default observable({
    VENDOR_ID: {
        value: undefined,
        rules: 'required|numeric',
        //['required', 'regex:/^(19|20)[\\d]{2,2}$/']
    },
    VENDOR_NAME: {
        value: undefined,
        rules: 'required|string',
    },
    EMAIL: {
        value: undefined,
        validators: [isEmail]
        //rules: 'required|email|string|between:5,25',
    },
    COUNTRY: {
        value: undefined,
        rules: 'required',
    },
    COUNTRY_MULTI: {
        value: undefined,
        rules: 'required',        
    },
  
    CITY: {
        value: undefined,
        rules: 'required',
    },
    VENDOR_ID_REQUIRED: {
        //value: false
    },
    GENDER: {
        value: undefined,
        rules: 'required'
    },
    PAYMENT_DATE: {
       value: undefined,
       rules: 'required',
    }
});

