export default {
    VENDOR_ID: {     
        rules: ''
    },
    VENDOR_NAME: {      
        rules: 'required|string',
    },
    EMAIL: {      
        rules: 'required|email|string|between:5,25',
    },
    COUNTRY: {      
        rules: 'required',
    }
};