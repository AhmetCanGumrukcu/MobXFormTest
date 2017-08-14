export default {
    VENDOR_ID: {     
        rules: 'required|numeric',
        //['required', 'regex:/^(19|20)[\\d]{2,2}$/']
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