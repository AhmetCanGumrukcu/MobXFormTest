import { observable } from "mobx";

export default observable({
  VENDOR_ID: {
    value: '',
    rules: 'required|numeric',
    //['required', 'regex:/^(19|20)[\\d]{2,2}$/']
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
  VENDOR_ID_REQUIRED: {
    value: true
  }
});

