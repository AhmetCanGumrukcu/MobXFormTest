import MobxReactForm from 'mobx-react-form';
import { observable, action } from 'mobx';
import validatorjs from 'validatorjs';


class Contact extends MobxReactForm {
    onSuccess(form) {
        debugger
        alert('Form is valid! Send the request here.');
        // get field values
        console.log('Form Values!', form.values());
    }

    onError(form) {
        debugger
        // get all form errors
        console.log('All form errors', form.errors());
        // invalidate the form with a custom error message
        form.invalidate('This is a generic error message!');
    }

}

export default new Contact({
    fields: {
          VENDOR_ID: {
                value: 1234,
                rules: 'required'
            },
            VENDOR_NAME: {
                value: 'SONY',
                rules: 'required'
            },
            COUNTRY: {
                value: 'FRANCE',
                rules: 'required'
            },
            BLACKLIST: {
                value: false,
                rules: 'required'
            }
    },
    plugins: { 
        dvr: validatorjs 
    }
});


