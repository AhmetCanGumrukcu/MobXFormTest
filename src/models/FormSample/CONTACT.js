import { observable } from "mobx";

const CONTACT = observable({
            VENDOR_ID: 1234,
            VENDOR_NAME: 'VESTEL',
            COUNTRY: 'FRANCE',
            BLACKLIST: false
        });

export default CONTACT;        