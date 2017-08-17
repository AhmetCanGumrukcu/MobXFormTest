import { observable } from "mobx";
import { action } from "mobx";

export  default observable({
    contactCard: {
        expanded: false
    },
    paymentCard: {
        expanded: true
    },
    validationCard: {
        expanded: true
    },
   getItem:  action( function(value){       
       return this[value];
    })
})