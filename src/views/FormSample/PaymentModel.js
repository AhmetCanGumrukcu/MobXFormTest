import { observable } from "mobx";
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

const plugins = { dvr: validatorjs };

const fields = observable({
  ID: {
    value: 4568    
  },
  AMOUNT: {
    value: 98670
  },
  CURRENCY: {
    value: null
  },  
  PAYMENT_DATE: {
    value: null
  }
});

class ContactValidation extends MobxReactForm {
  clear() {
    this.init(fields);
  }
}

export default new ContactValidation({ fields }, { plugins });
