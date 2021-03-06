import MobxReactForm from 'mobx-react-form';
import { observable, action } from 'mobx';
import validatorjs from 'validatorjs';

const plugins = { dvr: validatorjs };

class LoginForm extends MobxReactForm {

  onSuccess(form) {
    alert('Form is valid! Send the request here.');
    // get field values
    console.log('Form Values!', form.values());
  }

  onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('This is a generic error message!');
  }
}

const fields = {
  email: {
    label: 'Email',
    placeholder: 'Insert Email',
    rules: 'required|email|string|between:5,25',
  },
  password: {
    label: 'Password',
    placeholder: 'Insert Password',
    rules: 'required|string|between:5,25',
  },
};

export default new LoginForm({ fields }, { plugins });