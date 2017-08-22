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
  STATUS: {
    value: 3
  },
  BLACKLIST: {
    value: false
  }
});