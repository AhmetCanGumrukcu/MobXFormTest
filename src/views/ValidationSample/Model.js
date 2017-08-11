import { observable } from "mobx";
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

const plugins = { dvr: validatorjs };

const fields = observable({
  VENDOR_ID: {
    value: '',
    rules: 'required',
  },
  VENDOR_NAME: {
    value: '',
    rules: 'required|string',
  },
  EMAIL: {
    value: '',
    rules: 'required|email|string|between:5,25',
  },
  COUNTRY: {
    value: '',
    rules: 'required',
  },
  BLACKLIST: {
    value: false
  }
});

class ContactValidation extends MobxReactForm {
  clear() {
    this.init(fields);
  }
}

export default new ContactValidation({ fields }, { plugins });
