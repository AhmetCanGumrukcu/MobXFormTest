import { observable } from "mobx";

export default observable({
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