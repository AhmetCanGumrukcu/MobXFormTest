import { observable } from "mobx";
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

const plugins = { dvr: validatorjs };

const fields = observable({
  VENDOR_ID: {
    value: ''    
  },
  VENDOR_NAME: {
    value: ''
  },
  EMAIL: {
    value: ''
  },
  COUNTRY: {
    value: ''
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
